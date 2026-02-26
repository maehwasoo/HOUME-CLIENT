# CLAUDE.md

이 파일은 HOUME 프로젝트에서 작업할 때 참고하는 가이드입니다.

## 개발 명령어

```bash
pnpm dev              # 개발 서버 (HMR)
pnpm build            # 프로덕션 빌드 (tsc -b && vite build)
pnpm lint             # ESLint 검사
pnpm lint --fix       # ESLint 자동 수정
pnpm format           # Prettier 포맷팅
pnpm storybook        # Storybook 개발 서버
```

## 기술 스택

- **React 19** + TypeScript + Vite
- **Vanilla Extract** (zero-runtime CSS-in-JS) + 디자인 토큰 시스템
- **TanStack Query v5** (서버 상태) + **Zustand** (클라이언트 상태)
- **React Router DOM 7** (Data API, 객체 기반 라우트)
- **@use-funnel** (온보딩 퍼널 위자드)
- **pnpm** 패키지 매니저

## 프로젝트 구조

```
src/
├── pages/                    # Feature 기반 조직
│   ├── home/                # 랜딩 페이지
│   ├── imageSetup/          # 온보딩 퍼널 (HouseInfo → FloorPlan → InteriorStyle → ActivityInfo)
│   ├── generate/            # AI 이미지 생성 (loading/, result/, start/)
│   ├── login/ & signup/     # 인증 (카카오 OAuth)
│   └── mypage/              # 프로필, 히스토리, 설정
├── shared/                  # 공통 모듈
│   ├── apis/config/         # axiosInstance, request<T>(), queryClient
│   ├── components/          # 공통 UI 컴포넌트
│   ├── constants/           # queryKeys factory, apiEndpoints, ROUTES
│   ├── detection/           # ONNX 가구 탐지 시스템
│   ├── hooks/               # 공통 훅
│   ├── styles/              # 디자인 토큰 (colorVars, fontStyle)
│   └── types/               # 공통 타입
├── store/                   # 전역 Zustand 스토어
└── routes/                  # 라우터 설정, RootLayout, paths.ts
```

각 Feature 폴더 내부 구조:

```
pages/{feature}/
├── apis/queries/            # bare API 함수 + useQuery 훅
├── apis/mutations/          # bare API 함수 + useMutation 훅
├── components/              # Feature UI 컴포넌트
├── hooks/                   # Feature 비즈니스 로직 훅
├── stores/                  # Feature Zustand 스토어
├── types/                   # Feature 타입
└── utils/                   # Feature 유틸
```

## Path Alias

가장 짧은 alias를 사용한다.

| Alias          | 경로                     | 예시                                         |
| -------------- | ------------------------ | -------------------------------------------- |
| `@pages/`      | `src/pages/`             | `@pages/generate/pages/loading/...`          |
| `@routes/`     | `src/routes/`            | `@routes/paths`                              |
| `@store/`      | `src/store/`             | `@store/useUserStore`                        |
| `@shared/`     | `src/shared/`            | `@shared/detection/...`, `@shared/types/...` |
| `@apis/`       | `src/shared/apis/`       | `@apis/config/request`                       |
| `@assets/`     | `src/shared/assets/`     | `@assets/icons/logoIcon.svg?react`           |
| `@components/` | `src/shared/components/` | `@components/navBar/TitleNavBar`             |
| `@constants/`  | `src/shared/constants/`  | `@constants/queryKey`                        |
| `@hooks/`      | `src/shared/hooks/`      | `@hooks/useCreditGuard`                      |
| `@styles/`     | `src/shared/styles/`     | `@styles/tokens/color.css`                   |
| `@utils/`      | `src/shared/utils/`      | `@utils/history`                             |

**금지**: `@/` prefix, `@types/` alias (npm 스코프 충돌), 3단계 이상 상대경로

## 핵심 컨벤션

### 네이밍

- 폴더: `camelCase` / 컴포넌트: `PascalCase.tsx` / 스타일: `PascalCase.css.ts`
- 페이지: `{Feature}Page` (e.g. `HomePage`, `LoginPage`)
- Query 훅: `use{Subject}Query` / Mutation 훅: `use{Subject}Mutation`
- API 함수: `{httpMethod}{Subject}` (e.g. `getFloorPlan`, `postHousingSelection`)
- 상수: `UPPER_SNAKE_CASE` (e.g. `API_ENDPOINT`, `ROUTES`)

### Export

- **컴포넌트 (.tsx)**: `default export`
- **훅/유틸/상수/타입**: `named export`
- **Barrel export (index.ts) 금지**, **mixed export 금지**

### Import

- 확장자 생략 (`.tsx`, `.ts` 붙이지 않음)
- `.css.ts` 파일은 `.css`로 import (`import * as styles from './Button.css'`)
- import 순서: ESLint `import/order`로 자동 정렬 (`pnpm lint --fix`)

### API / 데이터 페칭

```typescript
// 1파일 = 1 API 작업 (bare 함수 + 훅 colocate)
export const getXxx = async (): Promise<XxxResponse> => {
  return request<XxxResponse>({
    method: HTTPMethod.GET,
    url: API_ENDPOINT.XXX.YYY,
  });
};

export const useXxxQuery = () => {
  return useQuery({
    queryKey: queryKeys.xxx.yyy(),
    queryFn: getXxx,
  });
};
```

- 모든 API 호출은 `request<T>()` 래퍼 경유 (직접 `axiosInstance` 사용 금지)
- Query Key는 `queryKeys` factory 사용 (`src/shared/constants/queryKey.ts`)
- **`isPending` 사용** (TanStack Query v5, `isLoading` 사용 금지)
  - `useState` 기반 로딩 상태는 `isLoading` 허용

### 경로

- 모든 `navigate()`, `<Navigate>` 경로는 `ROUTES` 상수 사용 (`@routes/paths`)
- 하드코딩 문자열 경로 금지
- 예외: `window.location.href`는 에러 폴백(React Router 사용 불가)에서만 허용

### Vanilla Extract 스타일링

- **색상**: `colorVars` 사용 (`@styles/tokens/color.css`), 하드코딩 `#hex`/`rgba()` 금지
- **폰트**: `fontStyle()` 헬퍼 사용 (`@styles/fontStyle`), raw fontSize 등 금지
- **CSS 속성 순서**: concentric order (ESLint 플러그인으로 자동 정렬)

### Cross-Feature Import

- Feature는 다른 Feature를 직접 import할 수 없음 (shared 모듈 사용)
- `shared/`는 `pages/`를 import할 수 없음

### 인증

- 카카오 OAuth + JWT 토큰
- 자동 refresh: axios 인터셉터 (`shared/apis/config/axiosInstance.ts`)
- 인증 상태: `useUserStore` (Zustand, localStorage persistence)
- 보호된 라우트: `ProtectedRoute` 컴포넌트

### Lazy Loading

- **Eager**: HomePage, LoginPage, KakaoCallbackPage, ImageSetupPage, LoadingPage, ResultPage
- **Lazy**: `route.lazy` 패턴으로 동적 import (SignupPage, MyPage, SettingPage 등)

## Git 워크플로우

- **브랜치**: `develop`에서 분기, `develop`으로 merge
- **브랜치 네이밍**: `type/description/#issue-number` (e.g. `feat/login-page/#12`)
- **커밋 컨벤션**: `type: title` (e.g. `feat: 로그인 기능 구현`)
  - types: `feat`, `fix`, `refactor`, `style`, `design`, `chore`, `docs`, `test`, `rename`, `remove`
- **PR**: 2+ reviewer 승인 필요

## 참고 문서

- [컨벤션 상세 가이드](docs/reference/conventions.md) — 모든 컨벤션의 상세 규칙, 예시, ESLint 설정
- [변경 기록](docs/changes/README.md) — 주요 리팩토링/기능 변경 이력
