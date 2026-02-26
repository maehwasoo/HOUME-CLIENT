## Phase 6: API/데이터 페칭 컨벤션 통일 (2026-02-17)

### 1. 작업 배경

- **파일 구조 불일치**: bare 함수와 훅이 분리된 곳(home, generate, mypage)과 합쳐진 곳(imageSetup, login, signup)이 혼재
- **`request()` 래퍼 우회**: signup.ts, kakaoOAuthCallback.ts가 직접 axios 사용 (헤더 추출 필요)
- **리턴 타입 누락**: ~14개 bare API 함수에 explicit `Promise<T>` 리턴 타입 없음

### 2. 주요 변경 사항

#### 2-A: .gitkeep 삭제 + 빈 폴더 정리

- .gitkeep 30건 삭제
- 빈 디렉토리 7개 제거 (home, login, signup 내 빈 하위 폴더 등)

#### 2-B: `request()` 래퍼 개선

| 항목        | Before                    | After                                               |
| ----------- | ------------------------- | --------------------------------------------------- |
| `body` 타입 | `Record<string, unknown>` | `object` (캐스트 없이 인터페이스 전달 가능)         |
| 헤더 접근   | 직접 `axiosInstance` 사용 | `rawResponse: true` 오버로드로 `AxiosResponse` 반환 |
| 에러 처리   | 중복 분기 + 장황          | `import.meta.env.DEV` + null coalescing chain       |

- `signup.ts`, `kakaoOAuthCallback.ts` → `request()` rawResponse 래퍼로 전환 (직접 axios 사용 제거)

#### 2-C: Feature별 queries/mutations 구조화

| Feature    | queries            | mutations | 삭제 파일 | 소비자 수정 |
| ---------- | ------------------ | --------- | --------- | ----------- |
| home       | 0 (dead code 삭제) | 0         | 2         | 1           |
| mypage     | 4                  | 0         | 4         | ~12         |
| imageSetup | 4                  | 2         | 4         | ~7          |
| login      | 0                  | 3         | 5         | ~4          |
| signup     | 0                  | 1         | 1         | ~1          |
| generate   | 7                  | 8         | 4         | ~3          |
| shared     | 0                  | 1 (jjym)  | 2         | ~2          |

- home: `useLanding.ts` + `landing.ts` dead code 발견 → 삭제
- login: `kakaoOAuthCallback.ts` + `useKakaoLogin.ts` → 단일 mutation 파일로 합침
- generate: `useGenerate.ts` (268줄) + `useFurnitureCuration.ts` (381줄) → 17개 개별 파일로 분리

#### 2-D: 보완 — `generate/apis/hooks/` → `generate/hooks/` 이동

- `useInvalidateCurationQueries.ts`: 사용처 0건 (dead code) → 삭제
- `useCurationState.ts`: `apis/hooks/` → `hooks/`로 이동 (순수 Zustand selector, API 아님)
- `apis/hooks/` 폴더 제거 → apis/ 아래에는 queries/mutations만 허용

### 3. 확립된 컨벤션

| 규칙                   | 설명                                                              |
| ---------------------- | ----------------------------------------------------------------- |
| 1파일 = 1 API 작업     | bare 함수 + React Query 훅을 같은 파일에 colocate                 |
| queries/mutations 분리 | `apis/queries/useXxxQuery.ts`, `apis/mutations/useXxxMutation.ts` |
| `request<T>()` 필수    | 직접 `axiosInstance` 사용 금지                                    |
| `rawResponse: true`    | 헤더 접근 필요 시 AxiosResponse 전체 반환                         |
| `body?: object`        | 인터페이스를 캐스트 없이 전달                                     |
| explicit 리턴 타입     | 모든 bare 함수에 `Promise<T>` 필수                                |
| API 훅 ≠ UI 훅         | API 훅은 apis/ 아래, 순수 상태/UI 훅은 hooks/ 아래                |
| apis/hooks/ 금지       | apis/ 아래에는 queries/mutations만 허용                           |

### 4. 검증

- `pnpm build` — 0 errors
- `pnpm lint` — 0 errors, 8 warnings (기존과 동일)
- `import.*axiosInstance` in non-config files → 0건
- 기존 import 경로 잔여 → 0건
- ~33 신규 파일, ~47 삭제 파일, ~44 소비자 import 수정
