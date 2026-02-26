## Phase 4: 폴더 구조 정규화 + Detection 분리 (2026-02-17)

### 1. 작업 배경

- `generate/` 안의 detection 시스템을 `mypage/`, `layout/`, `store/`, `shared/`에서 직접 import → cross-feature 의존성
- `shared/` → feature 역방향 import 3건 (staticDataPrefetch, queryKey, analytics)
- `mypage` → `generate` import 13건 (detection prefetch + jjym mutation)
- `imageSetup/pages/` 폴더명이 퍼널 스텝인데 `pages/`라는 이름으로 혼란

### 2. 주요 변경 사항

#### 2-A: Detection 모듈 `shared/detection/`으로 추출 (17파일)

| 카테고리 | 이동 파일                                                                                                                                                                                     | 이동 후 경로                |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| 상수     | `detection.ts`, `furnitureCategoryMapping.ts`, `.test.ts`                                                                                                                                     | `shared/detection/`         |
| 타입     | `detection.ts`                                                                                                                                                                                | `shared/detection/types.ts` |
| 훅       | `useOnnxModel.ts`, `furnitureHotspotState.ts`, `furnitureHotspotPipeline.ts`, `useFurnitureHotspots.ts`, `useDetectionCache.ts`                                                               | `shared/detection/hooks/`   |
| 스토어   | `useDetectionCacheStore.ts`                                                                                                                                                                   | `shared/detection/stores/`  |
| 유틸     | `detectedObjectMapper.ts`, `imageProcessing.ts`, `furniturePipelineMonitor.ts`, `refineFurnitureDetections.ts`, `cabinetRefinementCategories.ts`, `obj365AllClasses.ts`, `obj365Furniture.ts` | `shared/detection/utils/`   |

**import 수정**: 이동된 17파일 내부 + 외부 소비자 5곳 + generate 내부 ~10곳 = ~35건

#### 2-B: Jjym(찜하기) shared로 이동 (3파일)

| 변경 전                         | 변경 후                           | 사유                        |
| ------------------------------- | --------------------------------- | --------------------------- |
| `generate/hooks/useSaveItem.ts` | `shared/hooks/useJjymMutation.ts` | generate + mypage 양쪽 사용 |
| `generate/apis/saveItems.ts`    | `shared/apis/jjym.ts`             | 위 훅의 의존성              |
| `generate/types/saveItems.ts`   | `shared/types/jjym.ts`            | 위 API의 타입               |

리네임: `usePostJjymMutation` → `useJjymMutation`

#### 2-C: staticDataPrefetch imageSetup으로 이동 (1파일)

| 변경 전                             | 변경 후                                        | 사유                                |
| ----------------------------------- | ---------------------------------------------- | ----------------------------------- |
| `shared/apis/staticDataPrefetch.ts` | `pages/imageSetup/utils/staticDataPrefetch.ts` | shared → feature 역방향 import 해소 |

소비자: `shared/apis/queryClient.ts` → `@pages/imageSetup/utils/staticDataPrefetch` (app-level 호출)

#### 2-D: A/B Test 타입 shared로 추출

| 변경        | 파일                                                       |
| ----------- | ---------------------------------------------------------- |
| 새 파일     | `shared/types/abTest.ts` (`ImageGenerationVariant` 타입)   |
| import 수정 | `shared/utils/analytics.ts`, `generate/hooks/useABTest.ts` |

#### 2-E: imageSetup/pages/ → imageSetup/steps/ 리네임

| 변경 전             | 변경 후             | 사유                        |
| ------------------- | ------------------- | --------------------------- |
| `imageSetup/pages/` | `imageSetup/steps/` | 퍼널 스텝이므로 의미 명확화 |

하위 4개 폴더: `houseInfo/`, `floorPlan/`, `interiorStyle/`, `activityInfo/`

### 3. Cross-Feature Import 해소 현황

| 위반                | Phase 4 전 | Phase 4 후                           |
| ------------------- | ---------- | ------------------------------------ |
| mypage → generate   | 13건       | 0건                                  |
| layout → generate   | 2건        | 0건                                  |
| store → generate    | 1건        | 0건                                  |
| shared → generate   | 2건        | 0건                                  |
| shared → imageSetup | 4건        | 1건 (queryClient.ts, 향후 개선 대상) |

### 4. 수정 파일 목록

**이동 (22파일)**

- Detection 17파일 → `src/shared/detection/`
- Jjym 3파일 → `src/shared/{hooks,apis,types}/`
- staticDataPrefetch 1파일 → `src/pages/imageSetup/utils/`
- 신규 1파일: `src/shared/types/abTest.ts`

**APIs config 분리 (4파일 이동 + ~20파일 import 수정)**

- `shared/apis/{axiosInstance,globalErrorHandler,queryClient,request}.ts` → `shared/apis/config/`
- `src/main.tsx`, `src/pages/login/apis/kakaoOAuthCallback.ts` 등 ~20파일 import 경로 수정

**import 수정 (~30파일, detection/jjym/staticDataPrefetch/abTest)**

외부 소비자:

- `src/layout/RootLayout.tsx`
- `src/store/useUserStore.ts`
- `src/shared/constants/queryKey.ts`
- `src/shared/utils/analytics.ts`
- `src/shared/apis/queryClient.ts`
- `src/pages/mypage/hooks/useDetectionPrefetch.ts`
- `src/pages/mypage/utils/resultNavigation.ts`
- `src/pages/mypage/components/section/savedItems/SavedItemsSection.tsx`

generate 내부:

- `src/pages/generate/pages/start/StartPage.tsx`
- `src/pages/generate/pages/result/ResultPage.tsx`
- `src/pages/generate/pages/result/components/DetectionHotspots.tsx`
- `src/pages/generate/pages/result/components/GeneratedImgA.tsx`
- `src/pages/generate/pages/result/components/GeneratedImgB.tsx`
- `src/pages/generate/pages/result/curationSheet/CardProductItem.tsx`
- `src/pages/generate/hooks/useABTest.ts`
- `src/pages/generate/hooks/useFurnitureCuration.ts`
- `src/pages/generate/stores/useCurationStore.ts`
- `src/pages/generate/stores/useCurationCacheStore.ts`
- `src/pages/generate/apis/furniture.ts`
- `src/pages/generate/utils/hotspotCategoryResolver.ts`

imageSetup 내부:

- `src/pages/imageSetup/ImageSetupPage.tsx` (steps 리네임)

**문서 (2개)**

- `docs/reference/conventions.md` — Phase 4 섹션 추가
- `docs/changes/2026-02-17_phase4-folder-structure.md` — 본 문서

#### 2-F: shared/apis/ 인프라-도메인 분리

| 변경 전                             | 변경 후                                    | 사유                                   |
| ----------------------------------- | ------------------------------------------ | -------------------------------------- |
| `shared/apis/axiosInstance.ts`      | `shared/apis/config/axiosInstance.ts`      | API 인프라 설정과 도메인 API 호출 분리 |
| `shared/apis/globalErrorHandler.ts` | `shared/apis/config/globalErrorHandler.ts` | 〃                                     |
| `shared/apis/queryClient.ts`        | `shared/apis/config/queryClient.ts`        | 〃                                     |
| `shared/apis/request.ts`            | `shared/apis/config/request.ts`            | 〃                                     |

- `shared/apis/` 루트 = 도메인 API (jjym.ts 등, 향후 공유 API 추가 시 여기에)
- `shared/apis/config/` = 인프라 설정 (axios 인스턴스, 에러 핸들러, queryClient, request 래퍼)
- import 경로: `@apis/config/request`, `@apis/config/queryClient` (~20파일 수정)
- config 내부 상대경로 → 절대 alias로 통일 (`@constants/`, `@shared/types/`, `@store/`)

### 5. 설계 결정: `shared/detection/` 위치

**질문**: detection이 shared/ 바로 아래에 있으면 "이 폴더가 뭐지?" 싶다. hooks/나 utils/ 아래에 있어야 역할이 바로 보이지 않나?

**결론**: `shared/detection/`으로 유지.

**근거**:

- Detection은 단일 역할이 아님 — 훅 5개, 유틸 7개, 스토어 1개, 상수, 타입을 모두 포함하는 **독립 도메인 모듈**
- `shared/hooks/useOnnxModel.ts`처럼 흩뿌리면 오히려 "이게 뭔 훅이지?" — detection이라는 **도메인 맥락**이 사라짐
- 함께 수정되는 코드는 함께 배치 (co-location) — detection 로직 수정 시 한 폴더에서 작업 가능
- 내부 구조(`hooks/`, `stores/`, `utils/`)가 feature 폴더와 동일한 패턴이라 한 번 열어보면 즉시 이해 가능
- React 프로젝트에서 흔한 "shared module" 패턴: `shared/auth/`, `shared/analytics/`, `shared/detection/`

### 6. 확립된 컨벤션

| 규칙                     | 설명                                              |
| ------------------------ | ------------------------------------------------- |
| Feature → Feature 금지   | 다른 feature를 직접 import하지 않고 shared로 추출 |
| shared → Feature 금지    | shared는 feature에 의존하지 않음                  |
| App-level → Feature 허용 | layout, routes, main.tsx는 feature import 가능    |
| Detection import         | `@shared/detection/` 경로 사용                    |
| 퍼널 스텝 폴더           | `steps/` (기존 `pages/`가 아닌)                   |
| shared/apis 구조         | `config/` = 인프라, 루트 = 도메인 API             |

### 7. 검증

- `pnpm build` — 0 errors
- `pnpm lint` — 0 errors, 8 warnings (기존과 동일, 모두 pre-existing)
- `@pages/generate/` in shared/, layout/, store/, mypage/ — 0건
- `@shared/apis/staticDataPrefetch` — 0건
