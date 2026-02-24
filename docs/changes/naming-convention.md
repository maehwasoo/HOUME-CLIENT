## Phase 3: 네이밍 컨벤션 통일 (2026-02-17)

### 1. 작업 배경

- 페이지 컴포넌트에 `Page` 접미사가 없는 파일 5개, `useQuery`/`useMutation` 래핑 훅에 `Query`/`Mutation` 접미사가 없는 파일 7개 존재
- 컴포넌트 이름이 파일명과 불일치하는 케이스 2건 (`LargeFilled` ≠ `LargeFilledButton.tsx`, `Flip` ≠ `FlipButton.tsx`)
- 폴더명 PascalCase 위반 1건 (`ErrorButton/`), Props 타입명이 컴포넌트명과 불일치 2건
- deprecated 미사용 파일 2개 (`kakaoLoginPath.tsx`, `useLogout.ts`)

### 2. 주요 변경 사항

#### 2-A: 페이지 컴포넌트 `{Feature}Page` 통일

| 변경 전                        | 변경 후             | 파일                                                      |
| ------------------------------ | ------------------- | --------------------------------------------------------- |
| `ImageSetup`                   | `ImageSetupPage`    | `pages/imageSetup/ImageSetup.tsx` → `ImageSetupPage.tsx`  |
| `KakaoCallback`                | `KakaoCallbackPage` | `pages/login/KakaoCallback.tsx` → `KakaoCallbackPage.tsx` |
| `PrivacyPolicy` (컴포넌트명만) | `PrivacyPolicyPage` | `pages/mypage/pages/setting/PrivacyPolicyPage.tsx`        |
| `ServicePolicy` (컴포넌트명만) | `ServicePolicyPage` | `pages/mypage/pages/setting/ServicePolicyPage.tsx`        |
| `SettingPage`                  | 유지                | 이미 `Page` 접미사 포함                                   |

- `src/routes/router.tsx` — 모든 import명과 JSX 사용처 업데이트

#### 2-B: Query/Mutation 접미사 통일

| 변경 전                | 변경 후                     | 파일                            | 사용처          |
| ---------------------- | --------------------------- | ------------------------------- | --------------- |
| `useStackData`         | `useStackDataQuery`         | `generate/hooks/useGenerate.ts` | LoadingPage.tsx |
| `useGenerateImageApi`  | `useGenerateImageMutation`  | `generate/hooks/useGenerate.ts` | LoadingPage.tsx |
| `useFallbackImage`     | `useFallbackImageQuery`     | `generate/hooks/useGenerate.ts` | LoadingPage.tsx |
| `useLandingData`       | `useLandingDataQuery`       | `home/hooks/useLanding.ts`      | (미사용)        |
| `useMyPageUser`        | `useMyPageUserQuery`        | `mypage/hooks/useMypage.ts`     | 8곳             |
| `useMyPageImageDetail` | `useMyPageImageDetailQuery` | `mypage/hooks/useMypage.ts`     | ResultPage.tsx  |

#### 2-C: 컴포넌트명 = 파일명 통일 + Props 네이밍

| 변경 전                            | 변경 후                                        | 파일                                                               | 사용처                           |
| ---------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------ | -------------------------------- |
| `LargeFilled` / `LargeFilledProps` | `LargeFilledButton` / `LargeFilledButtonProps` | `shared/components/button/largeFilledButton/LargeFilledButton.tsx` | ButtonGroup, SignupPage, stories |
| `Flip` / `FlipProps`               | `FlipButton` / `FlipButtonProps`               | `shared/components/button/flipButton/FlipButton.tsx`               | FlipSheet, stories               |

- `FlipSheet.tsx` — `FilpButton` 오타 → `FlipButton` 수정

#### 2-D: 폴더명 camelCase 통일

| 변경 전                                 | 변경 후                                  | 사유                                         |
| --------------------------------------- | ---------------------------------------- | -------------------------------------------- |
| `shared/components/button/ErrorButton/` | `shared/components/button/errorMessage/` | PascalCase 위반 + 폴더명과 컴포넌트명 불일치 |

- `ErrorButton.css.ts` → `ErrorMessage.css.ts` 리네임
- import 경로 3곳 + 1 story 수정

#### 2-E: Dead code 삭제

| 파일                                       | 사유                                                         |
| ------------------------------------------ | ------------------------------------------------------------ |
| `pages/login/constants/kakaoLoginPath.tsx` | deprecated, import 0건                                       |
| `pages/login/hooks/useLogout.ts`           | `apis/logout.ts`에 `useLogoutMutation` 이미 존재, import 0건 |

### 3. 수정 파일 목록 (~27개)

**정의 변경 (7개)**

- `src/pages/imageSetup/ImageSetupPage.tsx` (파일 리네임 + 컴포넌트명)
- `src/pages/login/KakaoCallbackPage.tsx` (파일 리네임 + 컴포넌트명)
- `src/pages/mypage/pages/setting/PrivacyPolicyPage.tsx` (컴포넌트명)
- `src/pages/mypage/pages/setting/ServicePolicyPage.tsx` (컴포넌트명)
- `src/pages/generate/hooks/useGenerate.ts` (3개 훅 리네임)
- `src/pages/home/hooks/useLanding.ts` (1개 훅 리네임)
- `src/pages/mypage/hooks/useMypage.ts` (2개 훅 리네임)

**컴포넌트/스타일 변경 (4개)**

- `src/shared/components/button/largeFilledButton/LargeFilledButton.tsx`
- `src/shared/components/button/flipButton/FlipButton.tsx`
- `src/shared/components/button/errorMessage/ErrorMessage.tsx` (import 경로)
- `src/shared/components/button/errorMessage/ErrorMessage.css.ts` (파일 리네임)

**import 사용처 변경 (~13개)**

- `src/routes/router.tsx`
- `src/pages/generate/pages/loading/LoadingPage.tsx`
- `src/pages/generate/pages/result/ResultPage.tsx`
- `src/pages/generate/pages/result/components/GeneratedImgA.tsx`
- `src/pages/home/HomePage.tsx`
- `src/pages/mypage/MyPage.tsx`
- `src/pages/imageSetup/hooks/useCreditCheck.ts`
- `src/pages/imageSetup/components/buttonGroup/ButtonGroup.tsx`
- `src/pages/signup/SignupPage.tsx`
- `src/shared/hooks/useCreditGuard.ts`
- `src/shared/hooks/useUserSync.ts`
- `src/shared/components/overlay/modal/CreditModal.tsx`
- `src/shared/components/bottomSheet/flipSheet/FlipSheet.tsx`

**Storybook (3개)**

- `src/stories/LargeFilled.stories.tsx`
- `src/stories/FlipButton.stories.tsx`
- `src/stories/ErrorMessage.stories.tsx`

**삭제 (2개)**

- `src/pages/login/constants/kakaoLoginPath.tsx`
- `src/pages/login/hooks/useLogout.ts`

**문서 (1개)**

- `docs/reference/conventions.md` — Phase 3 네이밍 컨벤션 섹션 추가

### 4. 확립된 컨벤션

| 대상            | 규칙                         | 예시                                            |
| --------------- | ---------------------------- | ----------------------------------------------- |
| 페이지 컴포넌트 | `{Feature}Page`              | `HomePage`, `ImageSetupPage`                    |
| Query 훅        | `use{Subject}Query`          | `useMyPageUserQuery`, `useStackDataQuery`       |
| Mutation 훅     | `use{Subject}Mutation`       | `useGenerateImageMutation`, `useLogoutMutation` |
| 상태/로직 훅    | `use{Subject}` (접미사 없음) | `useABTest`, `useFloorPlan`                     |
| 컴포넌트명      | PascalCase = 파일명과 동일   | `LargeFilledButton` in `LargeFilledButton.tsx`  |
| Props 타입      | `{Component}Props`           | `LargeFilledButtonProps`, `FlipButtonProps`     |
| 폴더명          | camelCase                    | `errorMessage/`, `flipButton/`                  |

### 5. 검증

- `pnpm build` — 0 errors
- `pnpm lint` — 0 errors, 8 warnings (기존과 동일, 모두 pre-existing)
- 이전 이름 grep — `useMyPageUser[^Q]`, `useMyPageImageDetail[^Q]`, `ErrorButton`, `FilpButton`, `LargeFilledButtonButton` 모두 0건
