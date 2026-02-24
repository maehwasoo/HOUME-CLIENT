# Phase 9: Lazy Loading + RootLayout 이동 + Dead Code 정리

## 1. 작업 배경

### 문제: 934KB 단일 JS 번들

router.tsx에서 12개 페이지를 모두 정적 import → Vite가 하나의 JS 청크(934.84 KB)로 번들링.
유저가 `/` (홈)에 처음 접속해도 MyPage, SettingPage, SignupPage, PolicyPage 등 **방문하지 않는 페이지의 코드까지 전부** 다운로드됨.

Vite가 500KB 초과 경고를 발생시키는 상태였음.

### 부가 문제

1. **RootLayout 위치 부적절**: `src/layout/` 폴더에 RootLayout.tsx 1개만 존재. router.tsx와 밀접한 코드(라우트 레이아웃 + ONNX warmup)인데 별도 폴더/alias로 분리되어 있었음.
2. **StartPage의 중복 ONNX preload**: RootLayout의 `useGenerateWarmup()`이 이미 `/generate/start` 경로를 커버하는데, StartPage에서도 동일한 `preloadONNXModel()` 호출이 있었음.

---

## 2. 설계 결정과 근거

### Q1: 왜 모든 페이지에 lazy loading을 적용하지 않나?

> lazy loading은 해당 페이지에 실제로 방문할 때 JS 청크를 다운로드하는 것이다. 첫 방문 시 약간의 지연이 발생한다.
> 핵심 퍼널(홈 → 로그인 → 이미지 설정 → 로딩 → 결과)은 유저가 연속적으로 방문하는 경로이므로, 이 경로에서 지연이 발생하면 UX가 저하된다. 하우미 첫 방문 → 이미지 생성 완료까지의 플로우에서의 UX 저하를 최소화하기 위해 일부 페이지에는 지연로딩을 적용하지 않았다.

**결론**: 핵심 6개 페이지는 eager(정적 import), 나머지 6개만 lazy.

| 분류  | 페이지            | 사유                                          |
| ----- | ----------------- | --------------------------------------------- |
| Eager | HomePage          | 랜딩 페이지, 첫 진입 90%+                     |
| Eager | LoginPage         | OAuth 플로우 진입점, CTA 클릭 시 즉시 필요    |
| Eager | KakaoCallbackPage | OAuth redirect, 지연 시 빈 화면 위험          |
| Eager | ImageSetupPage    | 퍼널 핵심, staticDataPrefetch 연동, UX 최우선 |
| Eager | LoadingPage       | 이미지 생성 직후 즉시 표시 필요               |
| Eager | ResultPage        | 생성 결과 즉시 표시, detection 연동           |
| Lazy  | SignupPage        | 신규 가입 시에만 방문                         |
| Lazy  | StartPage         | CTA 1개 + 이미지, 가벼움                      |
| Lazy  | MyPage            | 메인 플로우 외                                |
| Lazy  | SettingPage       | 마이페이지에서만 진입                         |
| Lazy  | ServicePolicyPage | 설정에서만 진입, 정적 텍스트                  |
| Lazy  | PrivacyPolicyPage | 설정에서만 진입, 정적 텍스트                  |

### Q2: Lazy loading이 ONNX 모델 preload에 영향을 주나?

> **영향 없다.** 두 가지는 완전히 별개의 리소스다.
>
> - **Lazy loading**: 페이지 컴포넌트의 JS 코드를 언제 다운로드할지의 문제
> - **ONNX 모델 preload**: ML 모델 바이너리 파일(.onnx)을 언제 로드할지의 문제
>
> RootLayout은 항상 eager(라우트 설정의 최상위 element)이므로, 유저가 어떤 generate 경로에 들어가든 ONNX preload는 즉시 실행된다.

### Q3: StartPage의 preloadONNXModel을 왜 삭제하나?

> RootLayout의 `GENERATE_WARMUP_PATHS`에 `ROUTES.GENERATE_START`가 이미 포함되어 있다:
>
> ```typescript
> const GENERATE_WARMUP_PATHS = [
>   ROUTES.GENERATE,
>   ROUTES.GENERATE_RESULT,
>   ROUTES.GENERATE_START, // ← 이미 포함
>   ROUTES.IMAGE_SETUP,
> ];
> ```
>
> RootLayout이 항상 먼저 마운트 → `useGenerateWarmup()` 실행 → StartPage 마운트 → 또 `preloadONNXModel()` 실행. `ensureModelLoad()`가 중복을 방지하지만, 불필요한 코드는 삭제하는 것이 맞다.

### Q4: RootLayout을 왜 `src/routes/`로 옮기나?

> `src/layout/` 폴더에 RootLayout.tsx 1개만 있었다. RootLayout은 라우트 설정의 최상위 element이고, ONNX warmup + 스크롤 복원 등 라우트 관련 로직만 포함한다. `src/routes/`에 함께 두면:
>
> - `@layout` alias가 불필요해져 삭제 가능
> - 라우트 관련 파일(router.tsx, paths.ts, ProtectedRoute.tsx, RootLayout.tsx)이 한 곳에 모임
> - 빈 `src/layout/` 폴더 제거

---

## 3. 주요 변경 사항

### 3-A: RootLayout 이동

| Before                                        | After                                   |
| --------------------------------------------- | --------------------------------------- |
| `src/layout/RootLayout.tsx`                   | `src/routes/RootLayout.tsx`             |
| `import RootLayout from '@layout/RootLayout'` | `import RootLayout from './RootLayout'` |

- `@layout` alias 삭제: `vite.config.ts`, `tsconfig.app.json`
- `src/layout/` 빈 폴더 삭제
- `CLAUDE.md`, `conventions.md`에서 `@layout` 행 삭제

### 3-B: StartPage 중복 preload 삭제

```typescript
// 삭제된 코드 (StartPage.tsx)
import { OBJ365_MODEL_PATH } from '@shared/detection/constants';
import { preloadONNXModel } from '@shared/detection/hooks/useOnnxModel';

useEffect(() => {
  preloadONNXModel(OBJ365_MODEL_PATH).catch(() => {});
}, []);
```

`useEffect` import도 함께 삭제 (다른 곳에서 미사용).

### 3-C: Lazy Loading 적용

```typescript
// Before: 정적 import
import SignupPage from '@pages/signup/SignupPage';
// ...
{ path: ROUTES.SIGNUP, element: <SignupPage /> },

// After: route.lazy
{
  path: ROUTES.SIGNUP,
  lazy: async () => {
    const { default: SignupPage } = await import('@pages/signup/SignupPage');
    return { Component: SignupPage };
  },
},
```

6개 페이지에 동일 패턴 적용. TODO 주석(`// TODO(지성): 컴포넌트 lazy load 적용하기`) 삭제.

---

## 4. 빌드 결과 비교

### Before (Phase 7 완료 후)

```
dist/assets/index.js               934.84 kB │ gzip: 292.93 kB  ← 모든 페이지
dist/assets/ort.bundle.min.js       403.92 kB │ gzip: 109.85 kB
dist/assets/NotFoundPage.js           0.81 kB │ gzip:   0.51 kB  ← 유일한 lazy
dist/assets/index.css                72.29 kB │ gzip:  10.81 kB
```

**JS 청크: 3개 (메인 + ONNX + NotFound)**

### After (Phase 9 완료)

```
dist/assets/index.js               744.41 kB │ gzip: 231.97 kB  ← 핵심 6페이지만
dist/assets/ort.bundle.min.js       403.92 kB │ gzip: 109.85 kB
dist/assets/PolicyPage.css.js       167.86 kB │ gzip:  51.44 kB  ← 공유 CSS 청크
dist/assets/MyPage.js                13.96 kB │ gzip:   6.76 kB
dist/assets/SignupPage.js             5.55 kB │ gzip:   2.45 kB
dist/assets/SettingPage.js            2.86 kB │ gzip:   1.22 kB
dist/assets/StartPage.js              0.98 kB │ gzip:   0.63 kB
dist/assets/NotFoundPage.js           0.81 kB │ gzip:   0.51 kB
dist/assets/PrivacyPolicyPage.js      0.43 kB │ gzip:   0.30 kB
dist/assets/ServicePolicyPage.js      0.42 kB │ gzip:   0.29 kB
dist/assets/index.css                63.90 kB │ gzip:   9.81 kB
```

**JS 청크: 10개 (메인 + ONNX + 8 lazy)**

### 개선 수치

| 항목             | Before       | After     | 변화                    |
| ---------------- | ------------ | --------- | ----------------------- |
| 메인 번들 (JS)   | 934.84 KB    | 744.41 KB | **-190.43 KB (-20.4%)** |
| 메인 번들 (gzip) | 292.93 KB    | 231.97 KB | **-60.96 KB (-20.8%)**  |
| 메인 CSS         | 72.29 KB     | 63.90 KB  | **-8.39 KB (-11.6%)**   |
| Lazy 청크 수     | 1 (NotFound) | 8         | +7                      |

---

## 5. 수정 파일

| 작업 | 파일                                                      |
| ---- | --------------------------------------------------------- |
| 이동 | `src/layout/RootLayout.tsx` → `src/routes/RootLayout.tsx` |
| 수정 | `src/routes/router.tsx`                                   |
| 수정 | `src/pages/generate/pages/start/StartPage.tsx`            |
| 수정 | `vite.config.ts`                                          |
| 수정 | `tsconfig.app.json`                                       |
| 수정 | `docs/reference/conventions.md`                           |
| 수정 | `CLAUDE.md`                                               |
| 삭제 | `src/layout/` (빈 폴더)                                   |

---

## 6. 검증

- `pnpm build` — 0 errors
- `pnpm lint` — 0 errors, 8 warnings (기존과 동일)
- grep `@layout` → 0건
- grep `preloadONNXModel` in StartPage → 0건
