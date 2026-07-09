// useONNXModel 훅
// - ONNX 모델 로딩 및 추론 실행
// - 입력: HTMLImageElement
// - 전처리: 640x640 letterbox → float32 tensor 생성
// - 출력: boxes/scores/labels를 가공해 Detection[] 반환
// - 라벨: 모델(1‑based 가정) → 내부 표준(0‑based)로 정규화
// - 가구 외 클래스는 훅 단계에서 즉시 제외
import { useState, useEffect, useCallback, useRef } from 'react';

import { MODEL_MIN_CONFIDENCE } from '@shared/detection/constants';
import type { Detection, ProcessedDetections } from '@shared/detection/types';
import { preprocessImage } from '@shared/detection/utils/imageProcessing'; // 입력 이미지를 640x640 텐서로 변환
import { OBJ365_ALL_CLASSES } from '@shared/detection/utils/obj365AllClasses';
import {
  isFurnitureIndex,
  normalizeObj365Label,
} from '@shared/detection/utils/obj365Furniture';
import { isIOSLikeDevice } from '@shared/utils/platform';

type OnnxModule = typeof import('onnxruntime-web/wasm');
type InferenceSession = import('onnxruntime-web/wasm').InferenceSession;

type ModelLoadResult = {
  session: InferenceSession;
  ort: OnnxModule;
};

type ModelCacheEntry = {
  promise?: Promise<ModelLoadResult>;
  session?: InferenceSession;
  ort?: OnnxModule;
  error?: string | null;
  inferenceQueue?: Promise<void>;
};

type ProgressCallback = (value: number) => void;

const WASM_ASSET_BASE = '/onnxruntime/ort-wasm-simd-threaded.wasm';
const modelCache = new Map<string, ModelCacheEntry>();

const ensureModelBufferIsBinary = (arrayBuffer: ArrayBuffer) => {
  const head = new Uint8Array(arrayBuffer.slice(0, 256));
  const headText = new TextDecoder('utf-8', { fatal: false }).decode(head);
  if (/<!doctype|<html|Not Found|Error/i.test(headText)) {
    throw new Error('모델 파일 대신 HTML/오류 페이지가 로드되었습니다');
  }
};

const fetchModelBinary = async (modelPath: string): Promise<ArrayBuffer> => {
  const response = await fetch(modelPath, { cache: 'force-cache' });
  if (!response.ok) {
    throw new Error(`모델 로드 실패: ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('text/html') || contentType.includes('text/plain')) {
    throw new Error('모델 경로가 잘못되었거나 HTML/텍스트가 반환되었습니다');
  }

  const arrayBuffer = await response.arrayBuffer();
  ensureModelBufferIsBinary(arrayBuffer);
  return arrayBuffer;
};

const getCacheEntry = (modelPath: string): ModelCacheEntry => {
  const existing = modelCache.get(modelPath);
  if (existing) return existing;
  const created: ModelCacheEntry = {};
  modelCache.set(modelPath, created);
  return created;
};

const loadOnnxModel = async (
  modelPath: string,
  onProgress?: ProgressCallback
): Promise<ModelLoadResult> => {
  const isIOS = isIOSLikeDevice();

  onProgress?.(10);
  const ort = await import('onnxruntime-web/wasm');
  onProgress?.(20);
  ort.env.wasm.wasmPaths = { wasm: WASM_ASSET_BASE };
  if (isIOS) {
    ort.env.wasm.numThreads = 1;
  }
  // onnxruntime 경고 숨길 때 배포 직전에 주석 해제하고 사용
  // ort.env.logLevel = 'error';

  onProgress?.(40);
  const arrayBuffer = await fetchModelBinary(modelPath);

  onProgress?.(70);
  const session = await ort.InferenceSession.create(arrayBuffer, {
    executionProviders: ['wasm'],
    graphOptimizationLevel: isIOS ? 'disabled' : 'all',
    ...(isIOS
      ? {
          executionMode: 'sequential',
          enableCpuMemArena: false,
          enableMemPattern: false,
        }
      : {}),
  });
  onProgress?.(95);

  return {
    session,
    ort,
  };
};

const ensureModelLoad = (
  modelPath: string,
  onProgress?: ProgressCallback
): Promise<ModelLoadResult> => {
  const entry = getCacheEntry(modelPath);

  if (entry.session && entry.ort) {
    onProgress?.(100);
    return Promise.resolve({
      session: entry.session,
      ort: entry.ort,
    });
  }

  if (entry.promise) {
    if (onProgress) {
      entry.promise.then(() => onProgress(100)).catch(() => undefined);
    }
    return entry.promise;
  }

  entry.promise = loadOnnxModel(modelPath, onProgress)
    .then((result) => {
      entry.session = result.session;
      entry.ort = result.ort;
      entry.error = null;
      return result;
    })
    .catch((err) => {
      entry.error =
        err instanceof Error ? err.message : '모델 로드 중 오류 발생';
      entry.promise = undefined;
      throw err;
    });

  return entry.promise;
};

export const preloadONNXModel = async (
  modelPath: string
): Promise<InferenceSession | null> => {
  if (typeof window === 'undefined') return null;
  const result = await ensureModelLoad(modelPath);
  return result.session;
};

/**
 * Obj365 ONNX 모델을 로드하고 추론 세션을 관리하는 React 훅
 * - 브라우저(onnxruntime-web)에서 동작하도록 동적 임포트를 사용
 * - 640×640 렌더링 텐서를 입력으로 받아 감지 결과를 반환
 * - 추론 결과는 후속 파이프라인(`useFurnitureHotspots`)에서 원본 좌표로 보정
 */
interface UseONNXModelOptions {
  enabled?: boolean;
}

export function useONNXModel(modelPath: string, options?: UseONNXModelOptions) {
  const enabled = options?.enabled ?? true;
  const [session, setSession] = useState<InferenceSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const ortRef = useRef<OnnxModule | null>(null); // onnxruntime-web 모듈 보관

  useEffect(() => {
    if (!enabled) {
      setSession(null);
      ortRef.current = null;
      setIsLoading(false);
      setError(null);
      setProgress(0);
      return;
    }

    if (typeof window === 'undefined') {
      setIsLoading(false);
      setError('브라우저 환경이 아닙니다');
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setError(null);
    setProgress(0);

    ensureModelLoad(modelPath, (value) => {
      if (isMounted) setProgress(value);
    })
      .then((result) => {
        if (!isMounted) return;
        ortRef.current = result.ort;
        setSession(result.session);
        setIsLoading(false);
        setProgress(100);
      })
      .catch((loadError) => {
        if (!isMounted) return;
        const message =
          loadError instanceof Error
            ? loadError.message
            : '모델 로드 중 오류 발생';
        setError(message);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [enabled, modelPath]);

  const runInference = useCallback(
    async (imageElement: HTMLImageElement): Promise<ProcessedDetections> => {
      const entry = getCacheEntry(modelPath);
      const resolveRuntime = async () => {
        const cachedSession = session ?? entry.session;
        const cachedOrt = ortRef.current ?? entry.ort;
        if (cachedSession && cachedOrt) {
          return {
            session: cachedSession,
            ort: cachedOrt,
          };
        }
        const loaded = await ensureModelLoad(modelPath);
        entry.session = loaded.session;
        entry.ort = loaded.ort;
        return loaded;
      };

      const task = async (): Promise<ProcessedDetections> => {
        const runtime = await resolveRuntime();
        const startTime = performance.now();

        // 1) 전처리: 640x640 letterbox 후 CHW(float32) 텐서 생성
        const { tensor } = await preprocessImage(imageElement, 640, 640);

        const inputTensor = new runtime.ort.Tensor(
          'float32',
          tensor,
          [1, 3, 640, 640]
        ); // 입력 이미지 텐서
        // orig_target_sizes는 int64 타입이어야 함
        const sizeTensor = new runtime.ort.Tensor(
          'int64',
          new BigInt64Array([BigInt(640), BigInt(640)]),
          [1, 2]
        );

        const feeds = {
          images: inputTensor,
          orig_target_sizes: sizeTensor,
        };

        // 2) 추론 실행: labels/boxes/scores 출력 기대
        const results = await runtime.session.run(feeds);

        // 3) 출력 텐서 파싱
        // - labels는 BigInt64Array로 반환될 수 있음
        const labelsData = results.labels.data;
        const boxes = results.boxes.data as Float32Array;
        const scores = results.scores.data as Float32Array;

        const detections: Detection[] = [];
        const numDetections = scores.length;

        for (let i = 0; i < numDetections; i += 1) {
          // 4) 점수 임계값 필터(실험값 0.5)
          if (scores[i] > MODEL_MIN_CONFIDENCE) {
            const rawX0 = boxes[i * 4];
            const rawY0 = boxes[i * 4 + 1];
            const rawX1 = boxes[i * 4 + 2];
            const rawY1 = boxes[i * 4 + 3];

            // 5) 라벨 정규화: 모델 1‑based → 내부 0‑based
            // - DETR/DFINE 계열은 0: 배경, 1부터 실제 클래스인 구성이 흔함
            // - 내부 로직(JS/TS)은 0‑based가 자연스러우므로 경계에서 변환
            let label1: number; // 다양한 정수/실수 TypedArray에 안전하게 대응
            if (labelsData instanceof BigInt64Array) {
              label1 = Number(labelsData[i]);
            } else if (
              labelsData instanceof Int32Array ||
              labelsData instanceof Uint32Array
            ) {
              label1 = Number(labelsData[i]);
            } else if (labelsData instanceof Float32Array) {
              label1 = labelsData[i];
            } else {
              throw new Error('지원되지 않는 labels 텐서 타입');
            }

            const classIndex0 = normalizeObj365Label(label1);
            // 6) 가구 외 클래스 드롭: 이후 파이프라인 단순화 목적
            if (!isFurnitureIndex(classIndex0)) continue;

            const xMin = Math.min(rawX0, rawX1);
            const yMin = Math.min(rawY0, rawY1);
            const widthVal = Math.max(1e-3, Math.abs(rawX1 - rawX0));
            const heightVal = Math.max(1e-3, Math.abs(rawY1 - rawY0));

            detections.push({
              bbox: [xMin, yMin, widthVal, heightVal],
              score: scores[i],
              label: classIndex0, // 내부 표준: 0‑based index 저장
              className: OBJ365_ALL_CLASSES[classIndex0] ?? undefined,
            });
          }
        }

        const inferenceTime = performance.now() - startTime;

        // 7) 실행 시간과 함께 결과 반환
        return {
          detections,
          inferenceTime,
        };
      };

      const prevQueue = entry.inferenceQueue ?? Promise.resolve();
      const next = prevQueue.then(() => task());
      entry.inferenceQueue = next.then(() => undefined).catch(() => undefined);
      return next;
    },
    [session, modelPath]
  );

  return {
    runInference,
    isLoading,
    error,
    progress,
  };
}
