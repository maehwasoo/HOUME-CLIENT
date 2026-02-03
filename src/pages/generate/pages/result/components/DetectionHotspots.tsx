// DetectionHotspots
// - 역할: 훅(useFurnitureHotspots) 기반으로 객체 인식을 수행하고, 결과를 스토어에 반영
// - 비고: 스팟 UI는 임시 제거(성능/UX)
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useDetectionCache } from '@pages/generate/hooks/useDetectionCache';
import { useFurnitureHotspots } from '@pages/generate/hooks/useFurnitureHotspots';
import { useCurationStore } from '@pages/generate/stores/useCurationStore';
import {
  filterAllowedDetectedObjects,
  mapHotspotsToDetectedObjects,
} from '@pages/generate/utils/detectedObjectMapper';
import { logFurniturePipelineEvent } from '@pages/generate/utils/furniturePipelineMonitor';

import * as styles from './DetectionHotspots.css.ts';

import type { FurnitureHotspot } from '@pages/generate/hooks/useFurnitureHotspots';
import type { DetectionCacheEntry } from '@pages/generate/stores/useDetectionCacheStore';
import type { ProcessedDetections } from '@pages/generate/types/detection';

const isSameHotspotArray = (
  prev: FurnitureHotspot[] | null,
  next: FurnitureHotspot[]
) => {
  if (!prev) return false;
  if (prev === next) return true;
  if (prev.length !== next.length) return false;
  for (let i = 0; i < prev.length; i += 1) {
    const a = prev[i];
    const b = next[i];
    if (
      a.id !== b.id ||
      a.cx !== b.cx ||
      a.cy !== b.cy ||
      a.score !== b.score ||
      a.confidence !== b.confidence ||
      a.label !== b.label ||
      a.className !== b.className ||
      a.finalLabel !== b.finalLabel ||
      a.refinedLabel !== b.refinedLabel
    ) {
      return false;
    }
  }
  return true;
};

interface DetectionHotspotsProps {
  imageId: number | null;
  imageUrl: string;
  mirrored?: boolean;
  shouldInferHotspots?: boolean;
  cachedDetection?: DetectionCacheEntry | null;
}

const DetectionHotspots = ({
  imageId,
  imageUrl,
  mirrored = false,
  shouldInferHotspots = true,
  cachedDetection,
}: DetectionHotspotsProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const setImageDetection = useCurationStore(
    (state) => state.setImageDetection
  );
  const resetImageState = useCurationStore((state) => state.resetImageState);
  const lastSyncedHotspotsRef = useRef<FurnitureHotspot[] | null>(null);
  const lastDetectionsRef = useRef<ProcessedDetections | null>(null);
  const { prefetchedDetections, saveEntry } = useDetectionCache(
    imageId,
    imageUrl,
    { initialEntry: cachedDetection ?? null }
  );
  const logDetectionEvent = (
    event: string,
    payload?: Record<string, unknown>,
    level: 'info' | 'warn' = 'info'
  ) => {
    logFurniturePipelineEvent(
      event,
      {
        imageId,
        imageUrl,
        ...payload,
      },
      { level }
    );
  };

  // 훅으로 로직 이동: refs/hotspots/error 제공
  // 페이지 시나리오별로 추론 사용 여부 제어
  const handleInferenceComplete = useCallback((result: ProcessedDetections) => {
    lastDetectionsRef.current = result;
  }, []);

  useEffect(() => {
    if (!prefetchedDetections) return;
    lastDetectionsRef.current = prefetchedDetections;
  }, [prefetchedDetections]);

  useEffect(() => {
    lastDetectionsRef.current = null;
  }, [imageUrl]);

  // 훅 옵션 객체를 메모이제이션해 불필요한 재실행 차단
  const hotspotOptions = useMemo(
    () => ({
      prefetchedDetections,
      onInferenceComplete: handleInferenceComplete,
    }),
    [prefetchedDetections, handleInferenceComplete]
  );

  const { imgRef, containerRef, hotspots, error } = useFurnitureHotspots(
    imageUrl,
    mirrored,
    shouldInferHotspots,
    hotspotOptions
  );

  useEffect(() => {
    if (imageId === null) return;
    if (!shouldInferHotspots) {
      lastSyncedHotspotsRef.current = null;
      resetImageState(imageId);
      return;
    }
    if (isSameHotspotArray(lastSyncedHotspotsRef.current, hotspots)) {
      return;
    }
    lastSyncedHotspotsRef.current = hotspots;
    const rawDetectedCodes = mapHotspotsToDetectedObjects(hotspots);
    const detectedObjects = filterAllowedDetectedObjects(rawDetectedCodes, {
      stage: 'image-detection',
      imageId,
      hotspotCount: hotspots.length,
    });
    setImageDetection(imageId, {
      hotspots,
      detectedObjects,
    });
    const processedDetections = lastDetectionsRef.current;
    if (processedDetections) {
      saveEntry({
        processedDetections,
        hotspots,
        detectedObjects,
      });
      lastDetectionsRef.current = null;
    }
  }, [
    imageId,
    hotspots,
    setImageDetection,
    resetImageState,
    shouldInferHotspots,
    saveEntry,
  ]);

  useEffect(() => {
    lastSyncedHotspotsRef.current = null;
  }, [imageId]);

  // 이미지 URL이 변경되면 로드 상태 리셋
  useEffect(() => {
    setIsImageLoaded(false);
  }, [imageUrl]);

  if (error) {
    // 모델 로드 실패 시에도 이미지 자체는 보여주도록
    logDetectionEvent(
      'detection-model-error',
      {
        error:
          error instanceof Error
            ? { name: error.name, message: error.message }
            : error,
      },
      'warn'
    );
  }

  return (
    <div ref={containerRef} className={styles.container}>
      {!isImageLoaded && <div className={styles.skeleton} />}
      <img
        ref={imgRef}
        crossOrigin="anonymous"
        src={imageUrl}
        alt="generated"
        className={styles.image({ mirrored, loaded: isImageLoaded })}
        onLoad={() => setIsImageLoaded(true)}
      />
    </div>
  );
};

export default DetectionHotspots;
