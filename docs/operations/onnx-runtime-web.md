# 브라우저 ONNX Runtime(Web) 기반 가구 감지 도입 기록

이 문서는 HOUME-CLIENT에서 **브라우저 내 추론(inference, 기기에서 모델을 실행해 결과를 만드는 과정)** 으로 가구 객체 감지(object detection)를 수행하기 위해 `onnxruntime-web`을 도입한 배경/구현/운영 포인트를 “문서화 기록” 형태로 정리합니다.

## 목적

- 결과 이미지 위에 **구매 가능한 가구 핫스팟(hotspot, 클릭 가능한 포인트)** 을 빠르게 표시하기 위한 감지 파이프라인을 유지보수 가능하게 기록
- 운영 환경에서 발생할 수 있는 리스크(경로 오류, 캐시, WASM 로딩 등)를 사전에 문서로 고정

## 범위 / 비범위

- 범위
  - ONNX Runtime(Web) 기반 모델 로딩/캐시/추론
  - 전/후처리 및 “가구만 남기기 + 리파인(refine, 2차 분류)” 흐름
  - 모델 자산 배포/캐시 헤더 등 운영 설정
- 비범위
  - 성능 수치(ms/FPS/정확도) **숫자 생성** (필요 시 측정 방법만 체크리스트로 유지)

## 결정 배경(왜 브라우저 추론인가)

- 목표: 결과 화면에서 “이미지는 먼저 보여주고”, 감지 결과로 핫스팟을 **즉시/점진적으로** 렌더링
- 서버 추론을 붙이면 생길 수 있는 비용/지연/스케일링 부담을 줄이고, 제품 UX를 빠르게 반복하기 위함

관련 아키텍처 문서:

- `docs/architecture/api-architecture.md`
- `docs/architecture/state-and-hooks.md`

## 현재 구현 요약(TL;DR)

1. 모델 파일은 `public/models/dfine_s_obj365-059189e4.onnx`로 정적 제공
2. 런타임은 `onnxruntime-web`(WASM)로 브라우저에서만 동작하도록 동적 import
3. 모델 로딩은
   - 메모리 캐시(Map) + Promise 캐시로 중복 로딩 방지
   - Cache Storage API로 모델 바이너리 ArrayBuffer를 영속 캐싱(가능한 환경)
4. 추론은 “동시에 여러 번 돌지 않도록” 큐로 직렬화
5. 추론 결과는 가구만 필터링하고, Cabinet/Shelf는 리파인 시도 후 큐레이션으로 연결

## 핵심 파일(진입점)

- 모델/추론 훅: `src/pages/generate/hooks/useOnnxModel.ts`
- 모델 선로딩(warmup)
  - `src/pages/generate/pages/start/StartPage.tsx`
  - `src/layout/RootLayout.tsx`
- 핫스팟 파이프라인: `src/pages/generate/hooks/useFurnitureHotspots.ts`
- 핫스팟 UI: `src/pages/generate/pages/result/components/DetectionHotspots.tsx`
- 전처리(640×640 letterbox): `src/pages/generate/utils/imageProcessing.ts`
- 가구 인덱스/라벨 처리: `src/pages/generate/utils/obj365Furniture.ts`
- 리파인 로직: `src/pages/generate/utils/refineFurnitureDetections.ts`
- 큐레이션 매핑: `docs/reference/curation-mapping.md`

## 동작 흐름(요약)

1. Generate 플로우 진입 시 모델 워밍업
   - `preloadONNXModel(OBJ365_MODEL_PATH)` 호출
2. 이미지 요소를 입력으로 받아 전처리
   - `preprocessImage()`가 640×640 텐서 생성
3. `onnxruntime-web` 세션으로 추론 실행
4. 결과(boxes/scores/labels) 정규화 + 가구 클래스만 필터링
5. 후처리/좌표 보정/리파인 후 핫스팟 렌더링 및 큐레이션 연동

## 구현 상세(운영 관점에서 중요한 포인트)

### 1) 모델 로딩 가드레일(HTML 반환/리라이트 감지)

배포 환경에서 모델 경로가 틀리면 `index.html`이 내려오는 경우가 있어, 모델 바이너리를 신뢰하지 않고 아래를 확인합니다.

- `content-type`이 `text/html`/`text/plain`이면 오류 처리
- 응답 앞부분 바이트를 텍스트로 디코딩해 `<!doctype`, `<html`, `Not Found` 등을 탐지

관련 코드:

- `src/pages/generate/hooks/useOnnxModel.ts` (`fetchModelBinary`, `ensureModelBufferIsBinary`)
- `vercel.json` (`rewrites`)

### 2) 캐싱 전략(메모리 + 영속 캐시)

- 메모리 캐시: `modelCache: Map<string, ModelCacheEntry>`
  - 세션/모듈(ort) 재사용
  - 로딩 중에는 Promise 캐시로 중복 로딩 방지
- 영속 캐시: Cache Storage API(`caches.open(...)`)
  - 캐시 스토리지 키: `houme-onnx-models-v1`
  - 모델 바이너리(ArrayBuffer)를 `application/octet-stream`으로 저장

관련 코드:

- `src/pages/generate/hooks/useOnnxModel.ts` (`MODEL_CACHE_STORAGE`, `readModelFromPersistentCache`, `writeModelToPersistentCache`)

### 3) 추론 직렬화(inference queue)

같은 모델 경로에 대한 추론이 동시에 여러 번 실행되지 않도록, 엔트리 단위 `inferenceQueue`로 직렬화합니다.

관련 코드:

- `src/pages/generate/hooks/useOnnxModel.ts` (`inferenceQueue`)

### 4) WASM 자산 로딩(wasmPaths)

- `ort.env.wasm.wasmPaths`를 CDN으로 지정해 번들/배포 복잡도를 줄입니다.
- 리스크: `package.json` 의존성 버전이 범위(`^`)일 경우, **JS 모듈과 CDN의 WASM 파일 버전 불일치** 가능성이 있습니다.

관련 코드/설정:

- `src/pages/generate/hooks/useOnnxModel.ts` (`WASM_ASSET_BASE`)
- `package.json` (`onnxruntime-web`)

### 5) 모델 파일 배포(캐시 헤더)

- 모델 파일은 `public/models/dfine_s_obj365-059189e4.onnx`로 정적 제공
- `/models/*`에 `Cache-Control: public, max-age=31536000, immutable` 적용
- 파일명 접두어 `059189e4`는 모델 파일 sha256의 앞 8자리(내용 기반 해시)

관련 설정:

- `vercel.json` (`headers`)

## 변경 이력(근거: 커밋 기준)

- `757c63d6 (2025-10-07)`: feat: ONNX 모델 추론 훅 및 가구 검출 정제 로직 추가
- `c4979b33 (2025-10-09)`: feat: WebML ONNX 이미지 객체감지 파일 추가(초기 실험)
- `dc4867f5 (2025-10-10)`: feat: ONNX Runtime(Web/Node) 의존성 추가
- `5843f613 (2025-11-04)`: build: onnxruntime Node 전용 의존성 제거(빌드 안정화)
- `bacbee0d (2025-11-05)`: feat: ONNX 모델 캐시/선로딩 추가 및 시작 페이지 선로딩
- `9a118128 (2025-11-13)`: chore: onnxruntime-web 1.23.2로 업데이트
- `5c8195d9 (2025-11-27)`: fix: 캐비닛/선반 리파인 없으면 감지 무시 및 매핑 정리(모델 파일 해시 기반 rename + /models 캐시 헤더 포함)

## 운영/검증 체크리스트

### 번들/자산

- [ ] 모델 파일 용량과 네트워크 환경별 다운로드 시간 확인
- [ ] 모델 파일명에 내용 해시(content hash) 포함 여부 확인
- [ ] `/models/*` 캐시 정책이 모델 업데이트 전략과 일치하는지 확인

### 런타임 호환성

- [ ] WASM 성능이 낮은 기기에서의 UX 폴백 정의
- [ ] CORS(교차 출처 리소스 공유, Cross-Origin Resource Sharing) 정책 확인(이미지 URL 출처)
- [ ] CDN `wasmPaths` 사용 시 버전 고정 전략 확인

### 기능 검증(로컬/QA)

- [ ] 로컬 실행: `pnpm dev`
- [ ] `/models/*.onnx`가 정상 응답(HTML 반환 아님)인지 확인
- [ ] 동일 이미지 재진입 시 모델 로딩/추론이 불필요하게 반복되지 않는지 확인

## 후속 과제(선택)

- `WASM_ASSET_BASE`의 버전 고정(의존성 업데이트 전략과 함께)
- 저사양 기기용 폴백 정책 정의(핫스팟 비활성/서버 폴백 등)
