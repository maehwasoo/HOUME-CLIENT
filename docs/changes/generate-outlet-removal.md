## Phase 7: GeneratePage Outlet 제거 — 독립 라우트 전환 (2026-02-17)

### 1. 작업 배경

- `GeneratePage.tsx`가 `<Outlet />`으로 LoadingPage/ResultPage를 감싸는 레이아웃 컨테이너 역할
- 실제로 하는 일: TitleNavBar 렌더링 + ErrorBoundary 감싸기 + 경로별 뒤로가기 분기
- `useOutletContext()` 사용 0건, 부모 → 자식 상태 전달 0건 — 순수 레이아웃 편의 목적

### 2. 왜 Outlet을 제거했는가

#### 문제: 로직이 실제 사용처와 떨어져 있다

GeneratePage의 뒤로가기 로직을 보면:

```typescript
// GeneratePage.tsx (Before)
const handleBackClick = () => {
  if (location.pathname === '/generate/result') {
    // ResultPage일 때의 분기
    if (isFromMypage) { ... } else { navigate('/'); }
  } else {
    // LoadingPage일 때의 분기
    navigate(-1);
  }
};
```

`pathname`으로 분기해서 "지금 어떤 자식이 렌더링 중인지"를 판별하고 있다. 이 로직은 사실상 ResultPage 전용인데, ResultPage 파일을 열어봐도 이 뒤로가기 동작이 보이지 않는다. 부모 파일을 따로 열어야 이해할 수 있다.

#### 문제: NavBar 조건도 pathname 기반

```typescript
const isBackIcon = useMatch('/generate/result'); // result만 뒤로가기 아이콘 표시
```

LoadingPage에는 뒤로가기 아이콘이 없고, ResultPage에만 있다. 이 조건이 GeneratePage에 숨어 있으면 각 페이지를 읽을 때 NavBar가 어떻게 보이는지 바로 알 수 없다.

#### 해결: 각 페이지가 자기 레이아웃을 직접 소유

독립 라우트로 전환하면:

- **LoadingPage를 열면** → `isBackIcon={false}` 가 바로 보임
- **ResultPage를 열면** → `isBackIcon={true}` + `handleBackClick` 로직이 바로 보임
- pathname 분기가 필요 없어짐 (ResultPage 안에서는 항상 result 경로이므로)

#### 부가 이점

- Phase 9 Lazy Loading 시 `React.lazy(() => import('./ResultPage'))` 같은 독립 코드 스플리팅이 깔끔
- GeneratePage.tsx 파일 1개 삭제 (63줄)

#### 트레이드오프: TitleNavBar + ErrorBoundary 반복

LoadingPage와 ResultPage 양쪽에 `<main>` + `<TitleNavBar>` + `<ErrorBoundary>` 가 각각 존재한다. 코드 중복처럼 보일 수 있지만:

- NavBar props가 다름 (`isBackIcon`, `onBackClick` 유무)
- 각 페이지의 레이아웃이 **자기 파일 안에서 완결됨** — 외부 파일을 찾아가지 않아도 됨
- 공통 레이아웃 래퍼를 만들 수도 있지만, 2곳 반복 수준에서는 추상화보다 명시가 나음

### 3. 주요 변경 사항

#### 3-A: router.tsx — 중첩 라우트 → flat 라우트

```typescript
// Before: GeneratePage가 Outlet 컨테이너
{
  path: ROUTES.GENERATE,
  element: <GeneratePage />,
  children: [
    { index: true, element: <LoadingPage /> },
    { path: 'result', element: <ResultPage /> },
  ],
}

// After: 각 페이지가 독립 라우트
{ path: ROUTES.GENERATE, element: <LoadingPage /> },
{ path: ROUTES.GENERATE_RESULT, element: <ResultPage /> },
```

#### 3-B: LoadingPage — 자체 레이아웃 추가

| 추가 항목     | 내용                                                                       |
| ------------- | -------------------------------------------------------------------------- |
| `<main>` 래퍼 | `display: flex, flexDirection: column, flex: 1` (GeneratePage와 동일)      |
| TitleNavBar   | `title="스타일링 이미지 생성"`, `isBackIcon={false}`, `isLoginBtn={false}` |
| ErrorBoundary | `FallbackComponent={FeatureErrorFallback}`                                 |

- 기존 early return (`<Navigate>`)은 `<main>` 래퍼 밖에서 처리 (GeneratePage 때와 동일한 위치)
- 로딩 스피너는 ErrorBoundary 안으로 이동 (기존에도 Outlet 안에서 렌더링됐으므로 동일)

#### 3-C: ResultPage — 자체 레이아웃 + 뒤로가기 로직 이관

| 추가 항목                              | 내용                                           |
| -------------------------------------- | ---------------------------------------------- |
| `useNavigate`                          | 뒤로가기에 필요                                |
| `getCanHistoryGoBack`                  | history stack 판별 유틸                        |
| `handleBackClick`                      | GeneratePage에서 이관 (ResultPage 전용 분기만) |
| `<main>` + TitleNavBar + ErrorBoundary | LoadingPage와 동일한 래핑                      |

뒤로가기 로직 단순화:

```typescript
// Before (GeneratePage): pathname으로 분기
if (location.pathname === '/generate/result') {
  if (isFromMypage) { ... } else { navigate('/'); }
} else {
  navigate(-1);
}

// After (ResultPage): 항상 result이므로 외부 분기 제거
if (isFromMypage) {
  getCanHistoryGoBack() ? navigate(-1) : navigate('/mypage', { replace: true });
} else {
  navigate('/');
}
```

- early return (Loading, InlineError)에도 `<main>` + TitleNavBar 포함 — 로딩/에러 시에도 NavBar가 보여야 함
- `<Navigate to="/" replace />`(데이터 없음 리다이렉트)에는 NavBar 불필요 — 즉시 이동하므로

#### 3-D: GeneratePage.tsx 삭제

- 63줄 전체 삭제
- `useOutletContext` 사용처 0건 확인 완료

#### 3-E: StartPage — 변경 없음

이미 자체 TitleNavBar 보유 + 독립 라우트(`ROUTES.GENERATE_START`)로 등록되어 있었음.

### 4. 동작 보존 체크리스트

| 경로                                              | 기존 동작                                 | 변경 후   | 동일 |
| ------------------------------------------------- | ----------------------------------------- | --------- | ---- |
| `/generate`                                       | TitleNavBar(뒤로가기 X), 캐러셀 표시      | 동일      | O    |
| `/generate/result`                                | TitleNavBar(뒤로가기 O), 결과 이미지 표시 | 동일      | O    |
| `/generate/result?from=mypage`                    | 뒤로가기 → mypage                         | 동일      | O    |
| `/generate/result` (일반 플로우)                  | 뒤로가기 → 홈(`/`)                        | 동일      | O    |
| `/generate/start`                                 | 자체 TitleNavBar, 독립 라우트             | 변경 없음 | O    |
| ResultPage CSS `calc(100dvh - titleNavBarHeight)` | TitleNavBar와 같은 `<main>` 안에서 계산   | 동일 구조 | O    |

### 5. 수정 파일

| 작업 | 파일                                               |
| ---- | -------------------------------------------------- |
| 수정 | `src/routes/router.tsx`                            |
| 수정 | `src/pages/generate/pages/loading/LoadingPage.tsx` |
| 수정 | `src/pages/generate/pages/result/ResultPage.tsx`   |
| 삭제 | `src/pages/generate/GeneratePage.tsx`              |

### 6. 검증

- `pnpm build` — 0 errors
- `pnpm lint` — 0 errors, 8 warnings (기존과 동일)
- `GeneratePage` import 잔여 → 0건
