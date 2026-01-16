# Route Architecture

## 라우터 구성 개요

- `src/routes/router.tsx`는 React Router v6.4 Data Router 방식을 사용하고 `createBrowserRouter` 호출에 정적 RouteObject 배열을 넘겨요.
- 루트 경로(`/`)는 `RootLayout`을 렌더링하고, 그 하위 children에 공개/보호 라우트를 모두 정의해요.

## 공개 라우트 그룹

- `index`(`HomePage`), `/login`, `/signup`, `/oauth/kakao/callback`, `/mypage/setting/service`, `/mypage/setting/privacy`가 공개 경로예요.
- 라우트 객체는 array spread(`...publicRoutes`)로 주입돼 관리가 쉬워요.

## 보호 라우트 그룹

- `/imageSetup`, `/generate`, `/mypage`, `/mypage/setting`, `/generate/start`는 인증이 필요하고, `ProtectedRoute`가 parent element로 감싸진 children으로 선언돼요.
- `/generate`는 nested children을 갖고 기본 경로를 `LoadingPage`로, `result` 서브경로를 `ResultPage`로 렌더링해요.

## ProtectedRoute 동작

- `ProtectedRoute` 컴포넌트는 `useUserSync`의 `isLoggedIn` 상태를 사용하거나 외부 prop으로 전달된 `isAuthenticated`를 우선해요.
- 인증되지 않았을 경우 즉시 `<Navigate replace to=ROUTES.LOGIN />`을 반환하고, 인증되면 `<Outlet />`을 반환해 하위 라우트를 렌더링해요.

## 경로 상수

- `src/routes/paths.ts`에서 `ROUTES` 객체를 `as const`로 선언하고, `RoutePath` 타입을 제공해 문자열 오타를 방지해요.
- `ProtectedRoute` 및 여러 페이지 컴포넌트는 이 상수를 import해 라우팅 로직을 공유해요.

## 지연 로딩 & 에러 경계

- 와일드카드 `path: '*'`는 `lazy` 옵션으로 `Error404Page`를 동적으로 import해 초기 번드를 경량화해요.
- React Router Data API(loader/action/errorElement)는 현재 사용하지 않지만, createBrowserRouter 구조 덕에 추후 쉽게 확장 가능해요.

## 내비게이션 UX

- `RootLayout`은 페이지 전환마다 `useScrollToTop` 훅을 호출해 스크롤을 초기화하고, `Generate/ImageSetup` 관련 경로에서 ONNX 모델을 워밍업(warmup)해요(`preloadONNXModel(OBJ365_MODEL_PATH)`).
- `LogoNavBar`·`TitleNavBar` 등 공용 컴포넌트가 `useNavigate`로 imperative 라우팅을 수행해요.
- `sessionStorage` 키(`activeTab`, `focusItemId`)를 통해 마이페이지 탭과 바텀시트 상태를 라우팅 간에 공유해 사용자 맥락을 유지해요.
