## Phase 5: Export 방식 통일 (2026-02-17)

### 1. 작업 배경

- 컴포넌트 파일에서 `export const Component = ...` (named export) 사용하는 곳 10개 발견
- 그 중 2개(NoMatchSheet, FlipSheet)는 named + default 혼용(mixed export)
- `React.lazy()` 사용을 위해 모든 컴포넌트 default export 필요 (Phase 8 Lazy Loading 전제조건)

### 2. 주요 변경 사항

#### 2-A: Mixed export → default only (2건)

| 파일                                                          | 수정 내용                                  |
| ------------------------------------------------------------- | ------------------------------------------ |
| `shared/components/bottomSheet/noMatchSheet/NoMatchSheet.tsx` | `export const` 제거, `export default` 유지 |
| `shared/components/bottomSheet/flipSheet/FlipSheet.tsx`       | 〃                                         |

- NoMatchSheet story: `{ NoMatchSheet }` → `import NoMatchSheet from`

#### 2-B: Named export → default export (5건)

| 파일                                                          | 소비자 수정                                           |
| ------------------------------------------------------------- | ----------------------------------------------------- |
| `shared/components/bottomSheet/BottomSheetWrapper.tsx`        | 3곳 (FlipSheet, NoMatchSheet, story)                  |
| `shared/components/dragHandle/DragHandle.tsx`                 | 3곳 (BottomSheetWrapper, CurationSheetWrapper, story) |
| `shared/components/cardReview/CardReview.tsx`                 | 2곳 (ReviewSection, story)                            |
| `pages/home/components/AnimatedSection.tsx`                   | 3곳 (HomePage, StepGuideSection, ReviewSection)       |
| `pages/generate/pages/result/curationSheet/CurationSheet.tsx` | 1곳 (ResultPage)                                      |

모두 rafce 스타일 (`const X = ...; export default X;`)로 통일.

#### 2-C: Dead code 삭제 (2건)

| 삭제 파일                                                                        | 사유       |
| -------------------------------------------------------------------------------- | ---------- |
| `pages/generate/pages/result/curationSheet/CurationSheetWrapper.tsx` + `.css.ts` | import 0건 |
| `pages/login/components/LogoutButton.tsx`                                        | import 0건 |

#### 2-D: 제외 항목

| 파일                                   | 사유                                                                |
| -------------------------------------- | ------------------------------------------------------------------- |
| `shared/components/toast/useToast.tsx` | 훅(use\* 접두사)이므로 named export가 올바름. 위치 이동은 별도 작업 |

### 3. 확립된 컨벤션

| 규칙                             | 설명                                              |
| -------------------------------- | ------------------------------------------------- |
| 컴포넌트 = default export        | rafce 스타일 (`const X = ...; export default X;`) |
| 훅/유틸/상수/타입 = named export | `export const useX`, `export const X`             |
| Mixed export 금지                | 한 파일에 named + default 혼용 불가               |
| Barrel export 금지               | index.ts 재내보내기 불가 (기존 유지)              |

### 4. 검증

- `pnpm build` — 0 errors
- `pnpm lint` — 0 errors, 8 warnings (기존과 동일)
- `export const` in shared/components/\*.tsx — useToast만 잔존 (훅이므로 정상)
- `export const` in pages/\*_/components/_.tsx — 0건
