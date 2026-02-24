# State & Hooks

## Zustand 스토어

- `src/store/useUserStore.ts`는 `accessToken`, `userName`, `userId`를 localStorage와 동기화하며, 토큰 갱신 시 `setAccessToken`, 탈퇴/로그아웃 시 `clearUser`를 호출해요.
- `src/store/useSavedItemsStore.ts`는 추천 가구 ID Set을 관리하고 토글/동기화(setSavedProductIds)를 제공해 찜 상태를 즉시 반영해요.
- 퍼널/생성 전용 스토어
  - `imageSetup/stores/useFunnelStore.ts`: HouseInfo/FloorPlan/MoodBoard/ActivityInfo 각 단계 데이터를 저장하고 `reset()`으로 퍼널 탈출 시 클린업해요.
  - `generate/stores/useGenerateStore.ts`: 이미지 생성 진행 상태(`isApiCompleted`)와 네비게이션 데이터(`navigationData`)를 저장해 로딩/결과 페이지가 동일한 상태를 참조하게 해요.
  - `generate/stores/useCurationStore.ts`: 활성 이미지, 핫스팟, 감지 객체, 바텀시트 스냅 상태를 유지하고, 가구 큐레이션 중 선택 상태를 공유해요.

## React Query 훅

- `useMyPageUser`는 세션 단위로 크레딧 정보를 재사용하기 위해 `staleTime` 15분, `refetchOnWindowFocus:false`를 사용해요.
- `useMyPageImages`는 `staleTime 15분 + cacheTime 30분`으로 설정해 목록 데이터를 세션 내에서 재사용하고, `useMyPageImageDetail`은 `staleTime 5분 + cacheTime 30분` · `initialData` 지원으로 리스트 데이터로 즉시 hydrate 할 수 있어요.
- `useStackData`, `useGetResultDataQuery`, `useFactorsQuery` 등 `generate/hooks/useGenerate.ts` 내부 훅들은 React Query + Mutation을 혼합해 이미지 생성 로딩, 선호도, 폴백을 구성해요.
- `useKakaoLoginMutation`, `useLogoutMutation`, `useDeleteUserMutation`, `useSignupMutation`은 인증 전용 mutation 훅으로, 성공/실패 시 상태/네비게이션을 일관되게 처리해요.

## 사용자 동기화 & 가드

- `useUserSync`는 `useMyPageUser` 쿼리를 바탕으로 Zustand 스토어에 사용자 이름/ID를 기록하고 `isLoggedIn`을 유도해요.
- `useCreditGuard`는 `useMyPageUser`의 최신 데이터를 refetch해서 크레딧을 검증하고, 부족하면 토스트 + false를 반환해 이미지 생성/가구 추천 액션을 가드해요.
- `useErrorHandler`는 페이지 컨텍스트별 리다이렉트 맵을 갖고 있고, 토스트 중복 쿨다운과 세션 만료 특별 처리를 제공해요.

## 전역 UX 훅

- `useScrollToTop`이 라우트/검색/해시 변화마다 스크롤을 초기화해 모바일 앱 같은 내비게이션을 제공해요.
- `useBottomSheetDrag`는 Pointer Events로 바텀시트 드래그/닫기를 제어하고 `--drag-y` 변수를 통해 애니메이션 상태를 노출해요.
- `useToast`는 `react-toastify`로부터 받은 `toastId`를 ref에 저장해 중복 토스트를 방지하고, 텍스트/타입/마진을 인자로 받아요.

## AI/가구 감지 파이프라인

- `useABTest`는 `useUserStore.userId`와 Firebase Remote Config를 조합해 이미지 생성 API를 single/multiple 그룹으로 분배하고, Analytics 사용자 속성에 기록해요.
- `useONNXModel`은 CDN에서 onnx 모델을 lazy load하고, `preprocessImage`로 만든 텐서를 세션에 주입해 감지 결과를 `ProcessedDetections`로 반환해요.
- `useFurnitureHotspots`는 `useONNXModel` 출력 → `buildHotspotsPipeline`(가구 라벨 필터 + 캐비닛 리파인) → `projectHotspots` 순서로 실행하고, reducer(`furnitureHotspotReducer`)로 상태 전이를 추적해요.
- `useDetectionCache`는 세션 스토리지 기반 감지 캐시를 캡슐화해 `prefetchedDetections`/`saveEntry`/TTL(30분)을 제공하고, `useFurnitureCuration`, `furnitureHotspotState` 등 Generate 페이지 전용 훅은 바텀시트, 감지 정보, 사용자의 카테고리 선택을 `useCurationStore`와 동기화해요.

## 퍼널 관리

- `useImageSetup`(`pages/imageSetup/hooks/useImageGeneration.ts`)는 `@use-funnel/react-router`를 활용해 Step별 context/history를 관리하고, 각 Step 컴포넌트는 `funnel.Render.with` 구성으로 이벤트→다음 스텝 전환을 선언적으로 정의해요.
