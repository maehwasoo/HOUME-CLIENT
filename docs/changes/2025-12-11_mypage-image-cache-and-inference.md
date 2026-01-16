## HOUME 마이페이지 이미지 캐싱 & 추론 개선 기록 (2025-12-11)

### 1. 작업 배경

- 마이페이지(`/mypage`) → 결과 페이지(`/generate/result`) 이동 시 이미지와 ONNX 추론이 매번 재실행돼 UX 지연이 컸어요.
- 세션 동안만 유지되는 감지 결과 캐시를 React Query · Zustand 흐름과 연결하고, 뒤로가기 시 URL만 변하고 화면이 남는 문제를 동시에 해결해야 했어요.

### 2. 주요 변경 사항

1. `src/pages/mypage/components/section/generatedImages/GeneratedImagesSection.tsx`
   - 카드 클릭 시 `buildResultNavigationState()` 유틸을 호출해 `navigate` state를 구성하고, 감지 캐시·React Query 초기 데이터를 동시에 프라임해요.
2. `src/pages/mypage/utils/resultNavigation.ts`
   - `buildResultNavigationState`는 `MyPageImageHistory`를 받아 `cachedDetection`, `initialHistory`, `userProfile`을 묶고 `queryClient.setQueryData`로 상세 쿼리를 시드해요.
3. `src/pages/generate/hooks/useDetectionCache.ts`
   - 세션 스토리지 기반 감지 캐시를 관리하는 훅을 신설해 `prefetchedDetections`, `saveEntry`, `clearEntry`, TTL(30분) 로직을 캡슐화했어요.
4. `DetectionHotspots.tsx`
   - 새 훅을 사용하도록 리팩터해 `prefetchedDetections` 여부로 ONNX 추론을 건너뛰고, `saveEntry`만 호출하도록 단순화했어요.
5. `GeneratedImgA.tsx`, `GeneratedImgB.tsx`
   - navigation state로 전달된 감지 캐시를 그대로 `DetectionHotspots`에 넘겨 감지 파이프라인이 첫 렌더에서 바로 완성되도록 했어요.
6. `ResultPage.tsx`
   - `cachedDetection` 타입/상태를 명시하고, location state에 포함된 데이터를 `forwardedDetectionMap`으로 변환해 멀티 이미지 슬라이드에서 재사용해요.
7. `src/pages/generate/hooks/useFurnitureHotspots.ts`
   - `prefetchedDetections` 옵션과 `onInferenceComplete(result, hotspots)` 시그니처로 정리해 캐시 히트 시 즉시 파이프라인을 실행해요.
8. `src/pages/generate/hooks/useFurnitureCuration.ts`
   - 추천 상품 쿼리(`useGeneratedProductsQuery`)의 `staleTime`을 5분으로 늘려 바텀시트 상품 API 호출을 최소화했어요.
9. `src/pages/mypage/hooks/useMypage.ts`
   - `useMyPageUser`, `useMyPageImages`, `useMyPageImageDetail`에 각각 `staleTime`/`cacheTime`/`initialData`를 설정해 React Query 캐시가 세션 동안 데이터를 유지하도록 했어요.
10. `src/shared/utils/history.ts` + `GeneratePage.tsx`
    - `getCanHistoryGoBack()` 유틸을 도입하고 GeneratePage 뒤로가기 로직이 이 함수를 통해 history stack을 판별하도록 했어요.

### 3. 네트워크 · 동작 분석

- `/mypage` 첫 진입 시 `useMyPageUser`(staleTime 15분), `useMyPageImages`(staleTime 15분, cacheTime 30분)가 데이터를 캐싱하므로 크레딧/목록 API는 세션 동안 한 번만 호출돼요.
- 카드 클릭 시 `buildResultNavigationState`가 React Query에 `MYPAGE_IMAGE_DETAIL`을 미리 심고 감지 캐시를 프라임하므로 결과 페이지는 서버 응답 없이도 UI를 즉시 렌더해요. 필요한 경우에만 `/api/v1/mypage/images/{houseId}`가 재호출돼요.
- `useDetectionCache` + `useFurnitureHotspots` 조합으로 동일 `imageId`는 ONNX 추론 없이 `prefetchedDetections` 경로(`inference-cache-hit`)를 타고, DevTools에는 이미지 요청만 남아요.
- 바텀시트 큐레이션 API는 `useGeneratedCategoriesQuery`(staleTime 60초)와 `useGeneratedProductsQuery`(staleTime 5분)로 캐싱돼 동일 이미지/카테고리 전환 시 네트워크 재호출을 크게 줄여요.
- 강화된 `GeneratePage` 뒤로가기는 history stack이 있으면 `navigate(-1)`로, 직접 접근이면 `/mypage` `replace`로 이동해 URL·화면이 동시에 갱신돼요.
- 마이페이지 → 결과 페이지 데이터 전달은 전역 스토어 대신 `navigate(..., { state })`로 처리했어요. 라우트 전환 시점의 스냅샷만 들고 있으므로 범위가 명확하고, 세션 종료/로그아웃 시 별도 정리 없이 자동으로 사라져 전역 상태 오염을 막을 수 있어요.

### 4. 디버깅 & 추가 조치

- 상세 페이지에서 발생하던 `Maximum update depth exceeded`는 캐시 저장이 effect를 재귀적으로 트리거하던 구조 때문이었어요. `DetectionHotspots`에서 `lastDetectionsRef`를 이용해 한 번만 `setCacheEntry`가 실행되도록 수정했어요.
- 감지 캐시가 최신 `detectedObjects`를 포함해 저장되므로 세션 중 바텀시트 카테고리 정보가 항상 동기화돼요.

### 5. 테스트 및 확인

- `pnpm lint` 실행: Node 22.x 엔진 경고와 기존 warning만 남고, 이번 변경으로 인한 신규 오류는 없어요.
- 수동 확인 포인트
  1. 동일 이미지를 두 번 이상 열어도 ONNX 추론이 생략되고 핫스팟이 즉시 표시되는지 확인해요.
  2. `/generate/result` → 뒤로가기 시 URL과 컨텐츠가 동시에 `/mypage`로 전환되는지 브라우저 history를 확인해요.
  3. DevTools Network 탭에서 `/mypage/user`가 중복 호출되지 않는지, `inference-cache-hit` 로그가 남는지 검증해요.

### 6. 후속 제안

- Detection cache 만료 정책을 명시적으로 두고(`updatedAt` 기반) 오래된 세션 데이터를 제거하는 정리 훅을 추가하면 안정성이 높아져요.
- React Query `useMyPageImageDetail`에도 `staleTime`을 부여해 상세 API 반복 호출을 더 줄일 수 있어요.

### 7. 2차 구조 정비(2025-12-11 오후)

- `useDetectionCache` 훅을 신설해 세션 스토리지 접근·TTL·prefetch 대기열을 한 곳에서 관리하도록 했어요. `DetectionHotspots`는 이 훅의 `prefetchedDetections`와 `saveEntry`만 사용해 의존성이 단순해졌어요.
- `buildResultNavigationState` 유틸을 도입해 마이페이지 카드 클릭 시 `navigate` state 구성 + React Query `MYPAGE_IMAGE_DETAIL` 시드를 동시에 처리해요. 향후 다른 페이지에서도 동일 유틸을 재사용할 수 있어요.
- React Query 훅 재정비
  - `useMyPageUser`: `staleTime 15분`, `refetchOnWindowFocus:false`로 설정해 세션 동안 사용자 정보 API를 재호출하지 않아요.
  - `useMyPageImages`: `cacheTime 30분`을 추가해 리스트 데이터를 장시간 보존.
  - `useMyPageImageDetail`: `staleTime 5분` + `cacheTime 30분`을 부여하고 `initialData`를 받을 수 있도록 만들어 MyPage → 결과 페이지로 전환할 때 서버 호출을 생략할 수 있어요.
- `GeneratePage`의 뒤로가기 로직은 `getCanHistoryGoBack()` 유틸(`@/shared/utils/history.ts`)을 통해 감싸 재사용성과 테스트 용이성을 높였어요.

### 8. 설계 선택 근거

- **navigate state vs 전역 스토어**
  - 전역 스토어에 크레딧/히스토리를 넣으면 로그아웃·세션 만료마다 정리 로직이 필요하고 다른 화면에서도 접근 가능해져 예상치 못한 의존성이 생겨요. navigate state는 해당 이동 시점 스냅샷만 들고 있으므로 결과 페이지 안에서만 쓰이고, 세션 종료 시 자동으로 사라져 안전해요.
- **navigate state vs URL 파라미터**
  - URL 쿼리는 문자열 직렬화/복원이 필요하고 민감 정보 노출 위험이 커요. navigate state는 브라우저 주소창에 노출되지 않고, 구조화된 객체 그대로 전달할 수 있어 유지보수가 쉽고 안전해요.
- **React Query 캐싱 vs sessionStorage**
  - 서버 데이터는 React Query의 `staleTime/cacheTime`으로 일관되게 관리할 수 있어 세션스토리지 이중화보다 단순하고, invalidation도 query key 기준으로 처리돼요. 반면 ONNX 추론 결과처럼 서버에서 얻을 수 없는 계산물은 sessionStorage에 캐싱하는 게 적합해요.
- **전략 요약**
- “서버 상태 → React Query”, “클라이언트 계산물 → 세션 캐시”, “페이지 간 전달 → navigate state”로 역할을 나눠 각 계층의 책임을 명확히 했어요.
