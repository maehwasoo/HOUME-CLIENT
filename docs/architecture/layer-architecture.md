# Layer Architecture

## 엔트리 계층

- `src/main.tsx`는 `HelmetProvider` → `QueryClientProvider` → `OverlayProvider` → `App` 순으로 공급자(provider) 트리를 구성하고, 개발 환경에서 React Query Devtools와 Toast 컨테이너를 주입해요. 앱 최초 로드시 `?ab=single|multiple` 쿼리를 감지해 `localStorage`에 A/B 테스트 그룹을 저장하는 로직도 포함돼요.
- `src/App.tsx`는 `RouterProvider`만을 반환하는 얇은 셸이에요. 모든 화면 렌더링은 라우터와 레이아웃 단계에서 결정되도록 책임을 분리했어요.

## 레이아웃 계층

- `src/layout/RootLayout.tsx`는 공통 스크롤 초기화 훅(`useScrollToTop`)을 호출하고 `<Outlet />`를 감싸 단일 진입점으로 유지돼요. 또한 `Generate/ImageSetup` 관련 경로에서 `preloadONNXModel(OBJ365_MODEL_PATH)`를 호출해 ONNX 모델을 워밍업(warmup, 선로딩)해요. 추후 헤더/푸터가 필요할 때 이 레이아웃에만 추가하면 돼요.
- 루트 레이아웃 아래로 `src/routes/router.tsx`가 `createBrowserRouter` 트리를 정의해요. 공개 라우트(`HomePage`, `LoginPage`, `SignupPage`, 정책 페이지 등)와 `ProtectedRoute`로 감싼 인증 라우트를 명시적으로 분리했고, 404 페이지는 `route.lazy`를 활용한 지연 로딩으로 구성돼요.

## 도메인 페이지 계층

- `src/pages`는 도메인별 폴더(`home`, `imageSetup`, `generate`, `mypage`, `login`, `signup`, `Error404Page`)를 갖고, 각 폴더는 공통 서브 구조(`apis`, `types`, `constants`, `components`, `hooks`, `utils`, `pages`, `stores`)를 따르도록 정리돼 있어요.
- `home` 도메인은 스크롤 트래킹/CTA 라우팅, `imageSetup`은 `@use-funnel/react-router` 기반 퍼널, `generate`는 AI 이미지 생성과 가구 큐레이션, `mypage`는 사용자 정보·저장 목록, `login|signup`은 인증 흐름을 담당해요.

## 공유 계층(Shared Layer)

- `src/shared/apis`는 axios 인스턴스, 요청 래퍼, React Query 클라이언트를 제공하고, `staticDataPrefetch.ts`로 앱 부팅 시 정적 옵션(prefetch)을 가져와요.
- `src/shared/constants`는 API 엔드포인트/쿼리키/에러 코드/바텀시트 상수 등을 중앙집중식으로 노출해요.
- `src/shared/hooks`에는 `useUserSync`, `useErrorHandler`, `useCreditGuard`, `useBottomSheetDrag`, `useScrollToTop` 등 모든 페이지가 공유하는 행태 로직이 있어요.
- `src/shared/components`는 버튼, 내비게이션, 바텀시트, 토스트, 카드, 로딩, 오버레이 등 공용 UI 컴포넌트를 모아두고 모두 Vanilla Extract 스타일 시트를 동반해요.
- `src/shared/styles`는 reset, 글로벌 테마, 폰트, 색상/애니메이션 토큰을 정의하고 앱 전체에 주입돼요.
- `src/shared/utils`에는 Firebase Analytics 헬퍼, object-fit 보정, 커버 프로젝션, 가구 감지 파이프라인 로거 등이 들어 있어요.

## 상태/데이터 계층

- 전역 상태는 `src/store/useUserStore.ts`와 `useSavedItemsStore.ts` 같은 Zustand 스토어가 처리하고, 도메인 워크플로는 `imageSetup`의 `useFunnelStore`, `generate`의 `useGenerateStore`·`useCurationStore`가 확장해요.
- 서버 상태는 TanStack Query(`src/shared/apis/queryClient.ts`)가 담당하고, 모든 `useQuery`/`useMutation`은 `shared/constants/queryKey.ts`에서 관리하는 키를 사용해요.
- `useUserSync` 훅이 로그인 상태에 따라 마이페이지 API를 호출하고, `ProtectedRoute`가 이를 이용해 인증 라우트를 보호해요.

## 데이터 흐름

1. **로그인 + 가입**: `LoginPage` → 카카오 OAuth 콜백 → `useKakaoLoginMutation` → `useUserStore`에 토큰 저장 → 신규 사용자면 `SignupPage`에서 추가 정보 입력.
2. **이미지 생성 퍼널**: `ImageSetup`이 `useFunnel`로 HouseInfo → FloorPlan → InteriorStyle → ActivityInfo 스텝을 관리하고, 입력값은 `useFunnelStore`에 보관돼 `GeneratePage` mutation 요청 시 payload가 돼요.
3. **생성/큐레이션**: `useGenerateImageApi`가 `pages/generate/apis/generate.ts`를 호출해 이미지 생성(A/B 전환) 후 `useGenerateStore`에 결과를 저장하고, `ResultPage`는 `useFurnitureHotspots`+`useONNXModel` 조합으로 감지/큐레이션 UI를 그려요.
4. **마이페이지/저장목록**: `useMyPageUser`, `useMyPageImages`, `getJjymList`가 React Query로 데이터를 유지하고, `useSavedItemsStore`가 찜 상태를 로컬에서 즉시 반영해요.

## 디렉터리 맵(요약)

```
src/
├─ layout/RootLayout.tsx
├─ routes/{router.tsx, paths.ts, ProtectedRoute.tsx}
├─ pages/
│  ├─ home/*
│  ├─ imageSetup/{apis,components,hooks,pages,stores,...}
│  ├─ generate/{apis,components,hooks,stores,utils,...}
│  ├─ mypage/{apis,components,hooks,...}
│  └─ login|signup|Error404Page
├─ shared/
│  ├─ apis/{axiosInstance,request,queryClient,staticDataPrefetch}
│  ├─ constants/{apiEndpoints,queryKey,...}
│  ├─ hooks/{useUserSync,...}
│  ├─ components/{button,navBar,bottomSheet,...}
│  ├─ styles/{global.css.ts, tokens/*}
│  ├─ utils/{analytics,coverProjection,...}
│  └─ types/{toast,error,apis,...}
└─ store/{useUserStore,useSavedItemsStore}
```
