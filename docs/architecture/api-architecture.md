# API Architecture

## HTTP 클라이언트 파이프라인

- `src/shared/apis/axiosInstance.ts`는 `VITE_API_BASE_URL`을 기준으로 axios 인스턴스를 만들고 `withCredentials` + JSON 헤더를 기본값으로 사용해요.
- 요청 인터셉터는 `/oauth/kakao`, `/oauth/kakao/callback`을 제외한 모든 요청에 `localStorage`의 `accessToken`을 자동 주입해요.
- 응답 인터셉터는 `ERROR_CODES.ACCESS_TOKEN_EXPIRED`(40002) 발생 시 `/reissue` 엔드포인트로 토큰을 갱신한 뒤, `useUserStore` 상태를 업데이트하고 원래 요청을 재시도해요. 실패 시 `clearUser()`로 세션을 정리하고 `SESSION_EXPIRED` 에러를 던져 훅(`useErrorHandler`)에서 처리하게 만들어요.

## Request 래퍼

- `src/shared/apis/request.ts`는 `HTTPMethod` 상수를 제공하고, query 객체를 `URLSearchParams`로 변환한 뒤 axiosInstance를 호출해요. 서버 응답 타입은 `BaseResponse<T>`로 가정하고 `data` 필드만 반환하므로, 모든 API 모듈에서 실제 payload 타입만 다루면 돼요.
- 실패 시 상태 코드에 맞는 메시지를 `RESPONSE_MESSAGE`에서 찾아 로깅하고 에러를 그대로 throw해서 상위 훅에서 공통 에러 핸들링(`useErrorHandler`)을 트리거해요.

## React Query 클라이언트

- `src/shared/apis/queryClient.ts`는 공통 `QueryClient`와 `QueryCache`를 초기화하고, 개발 환경에서 에러를 콘솔로 노출해요. 기본 쿼리 옵션은 `refetchOnWindowFocus=false`, `retry=1`, `staleTime=5분`으로 설정돼 있어요.
- 앱 부팅 시 `prefetchStaticData`가 주거 옵션(`getHousingOptions`), 활동 옵션(`getActivityOptions`), 무드보드(`getMoodBoardImage`)를 미리 캐시해요.
- 모든 훅은 `src/shared/constants/queryKey.ts`에서 정의한 문자열을 사용하며, `ImageSetup`/`Generate`/`MyPage`/`Login` 등 각 도메인은 자신의 키 네임스페이스를 재사용해 캐시 중복을 피해요.

## 엔드포인트 정의

- `src/shared/constants/apiEndpoints.ts`는 REST 경로를 도메인별로 중첩 오브젝트로 정리하고, 일부 엔드포인트는 함수를 사용해 path parameter를 생성해요.
- 타입 `DeepValues<typeof API_ENDPOINT>`를 제공해 엔드포인트 문자열 유효성을 TypeScript 수준으로 강제할 수 있어요.

## 도메인 API 모듈

- `pages/home/apis/landing.ts` 등 간단한 모듈도 있지만, 핵심은
  - `pages/imageSetup/apis/*`: 주거 옵션, 활동 옵션, 무드보드, 도면 조회·저장.
  - `pages/generate/apis/generate.ts`: 캐러셀, 이미지 생성(A/B API), 선호도 전송, 폴백 이미지, 가구/크레딧 로그.
  - `pages/generate/apis/saveItems.ts`: 추천 가구 찜 토글, 목록 조회.
  - `pages/mypage/apis/*`: 마이페이지 사용자/이력/상세 + 찜 리스트.
  - `pages/login/apis/*`: 카카오 OAuth, 로그아웃, 회원탈퇴.
  - `pages/signup/apis/signup.ts`: 추가 정보 PATCH.
- 각 API 모듈은 공통 request 래퍼만 사용하므로, 인증 헤더·에러 로깅은 axiosInstance 단계에서 일관적으로 처리돼요.

## 인증/세션 흐름

1. **카카오 로그인** (`pages/login/apis/kakaoLogin.ts`)
   - `axiosInstance.get('/oauth/kakao/callback?code=...)` 호출 후 응답 헤더의 `access-token`을 꺼내 `useUserStore.setAccessToken`으로 저장하고, 신규 사용자 여부에 따라 이동해요.
2. **ProtectedRoute** (`src/routes/ProtectedRoute.tsx`)
   - `useUserSync`의 `isLoggedIn` 상태를 감시하고, 인증되지 않으면 `Navigate`로 로그인 경로로 리디렉션해요.
3. **세션 만료**
   - `/reissue` 실패 또는 `SESSION_EXPIRED` 에러는 `useErrorHandler`의 `auth` 타입으로 바운스되며, 토스트를 띄운 뒤 로그인 페이지로 이동해요.
4. **로그아웃/탈퇴**
   - `useLogoutMutation`은 성공·실패와 관계없이 `useUserStore.clearUser()`와 `queryClient.clear()`를 실행하고 홈으로 라우팅해요.
   - `useDeleteUserMutation`은 성공 시 토스트를 띄우고 100ms 뒤 사용자 스토어와 캐시를 정리해요.

## 데이터 로깅/분석 API

- `pages/generate/apis/generate.ts`가 `postFurnitureLog`, `postCreditLog`를 제공하고, 클릭/결제 이벤트를 서버에 기록해요.
- Firebase Analytics 연동(`shared/config/firebase.ts`, `shared/utils/analytics.ts`)은 모델 A/B 그룹 설정, 이벤트 전송, setUserProperties를 담당해요.

## 크레딧 및 가드 로직

- `useCreditGuard`(`shared/hooks/useCreditGuard.ts`)가 `useMyPageUser` 데이터를 기반으로 크레딧을 조회하고, 부족하면 토스트 후 false를 반환해요. 이미지 생성 등 크레딧 소모 작업 전에 `checkCredit()`을 await 하도록 설계돼요.

## 예측/모델 API와 로컬 추론

- 가구 감지에는 서버 API 대신 `onnxruntime-web`을 통한 브라우저 내 모델 로딩(`useONNXModel`)과 `OBJ365_MODEL_PATH` CDN 리소스를 사용해요. 추론 결과는 클라이언트에서 후처리(`furnitureHotspotPipeline`) 후 UI를 업데이트하므로, 백엔드 부담을 줄이고 즉각적인 인터랙션을 제공해요.
