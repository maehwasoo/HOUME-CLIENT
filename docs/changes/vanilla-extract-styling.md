# Phase 11: Vanilla Extract ESLint 플러그인 + CSS 속성 자동 정렬

## 1. 작업 배경

### 문제: CSS 속성 순서 불일치 + 하드코딩된 스타일값

~84개 `.css.ts` 파일에서 CSS 속성 순서가 파일마다 제각각이었다. 또한 `colorVars`, `fontStyle()` 등 디자인 토큰 시스템이 존재함에도 일부 파일에서 하드코딩된 색상, 그라데이션, 폰트 속성을 직접 사용하고 있었다.

### 부가 문제

1. **스켈레톤 로딩 그라데이션 중복**: 3개 파일에서 동일한 `linear-gradient()` 값을 각각 하드코딩
2. **인라인 스타일**: RootLayout, ResultPage, LoadingPage에서 동일한 `style={{ display: 'flex', flexDirection: 'column', flex: 1 }}` 인라인 스타일 사용
3. **저장 시 자동 정렬 미설정**: `.vscode/settings.json`에 ESLint autofix 설정 없음

---

## 2. 설계 결정과 근거

### Q1: 왜 Vanilla Extract 전용 ESLint 플러그인을 사용하나?

> 일반 CSS lint 도구(Stylelint)는 Vanilla Extract의 TypeScript 기반 CSS-in-JS 문법을 파싱하지 못한다. `@antebudimir/eslint-plugin-vanilla-extract`는 `style()`, `recipe()`, `globalStyle()` 등 Vanilla Extract API 안의 CSS 속성을 인식하고 정렬/검증한다.

### Q2: Concentric order란?

> **바깥 → 안쪽** 순서로 CSS 속성을 배치하는 규칙:
>
> ```
> position/z-index → display/flex → margin → border → padding → width/height → overflow → font → color → animation
> ```
>
> 요소의 위치(position) → 레이아웃(display) → 박스 모델(margin/border/padding) → 크기(width/height) → 콘텐츠(font/color) 순서로 읽을 수 있어 가독성이 높다.

### Q3: `no-empty-style-blocks`를 왜 끄나?

> `recipe()`의 variant에서 빈 블록이 TypeScript 타입 추론에 필요하다:
>
> ```typescript
> export const button = recipe({
>   variants: {
>     state: {
>       default: {}, // ← 스타일은 없지만, 'default' | 'active' 타입 유니언에 필요
>       active: { backgroundColor: colorVars.color.primary },
>     },
>   },
> });
> ```
>
> 빈 블록을 삭제하면 variant 타입에서 해당 키가 사라져 TypeScript 에러가 발생한다.

### Q4: `no-zero-unit`을 왜 끄나?

> CSS custom property `vars`에서 `'0px'` → `'0'` 자동 변환 시 `calc()` 연산이 깨진다:
>
> ```typescript
> // BottomSheetWrapper.css.ts
> vars: { '--drag-y': '0px' }  // calc(var(--base-y) + var(--drag-y))
> ```
>
> `'0'`은 CSS에서 단위가 없으므로 `calc()`의 덧셈 연산에서 타입 불일치가 발생한다. 규칙이 `vars` context를 구분하지 못하므로 전체를 off한다.

---

## 3. 주요 변경 사항

### 3-A: ESLint 플러그인 설치 + 설정

```bash
pnpm add -D @antebudimir/eslint-plugin-vanilla-extract
```

```javascript
// eslint.config.js
{
  files: ['**/*.css.ts'],
  plugins: { 'vanilla-extract': vanillaExtract },
  rules: {
    'vanilla-extract/concentric-order': 'error',
    'vanilla-extract/no-empty-style-blocks': 'off',
    'vanilla-extract/no-trailing-zero': 'error',
    'vanilla-extract/no-zero-unit': 'off',
    'vanilla-extract/no-unknown-unit': 'error',
    'vanilla-extract/no-unitless-values': 'error',
  },
},
```

### 3-B: ~84개 .css.ts 파일 concentric order 자동 정렬

`pnpm lint --fix`로 모든 `.css.ts` 파일의 CSS 속성을 concentric order로 자동 재배치.

### 3-C: SKELETON_GRADIENT 공유 상수 추출

```typescript
// src/shared/styles/tokens/animation.css.ts
export const SKELETON_GRADIENT =
  'linear-gradient(90deg, #ececec 8%, #f0f0f0 18%, #ececec 33%)';
```

3개 파일에서 중복 하드코딩된 스켈레톤 그라데이션을 공유 상수로 통합:

- `CardProduct.css.ts`
- `CardCuration.css.ts`
- `DetectionHotspots.css.ts`

### 3-D: RootLayout.css.ts 생성 + 인라인 스타일 제거

```typescript
// src/routes/RootLayout.css.ts
export const pageLayout = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
});
```

인라인 `style={{ ... }}` → `className={pageLayout}` 전환:

- `RootLayout.tsx`
- `ResultPage.tsx`
- `LoadingPage.tsx`

### 3-E: .vscode/settings.json 추가

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

저장 시 ESLint autofix → concentric order 자동 정렬.

### 3-F: global.css.ts 코멘트 정리

autofix로 CSS 속성이 재배치되면서 인라인 코멘트가 엉뚱한 속성 옆에 붙어있었음. JSDoc 블록 코멘트가 충분히 설명하므로 불필요한 인라인/섹션 코멘트 제거.

---

## 4. 수정 파일

| 작업 | 파일                                                                    |
| ---- | ----------------------------------------------------------------------- |
| 신규 | `src/routes/RootLayout.css.ts`                                          |
| 신규 | `.vscode/settings.json`                                                 |
| 수정 | `eslint.config.js` (플러그인 설정)                                      |
| 수정 | `package.json`, `pnpm-lock.yaml` (devDependency 추가)                   |
| 수정 | `src/shared/styles/tokens/animation.css.ts` (SKELETON_GRADIENT)         |
| 수정 | `src/shared/styles/global.css.ts` (코멘트 정리)                         |
| 수정 | `src/routes/RootLayout.tsx` (인라인 → className)                        |
| 수정 | `src/pages/generate/pages/result/ResultPage.tsx` (인라인 → className)   |
| 수정 | `src/pages/generate/pages/loading/LoadingPage.tsx` (인라인 → className) |
| 수정 | ~80개 `.css.ts` 파일 (concentric order 자동 정렬)                       |
| 수정 | `docs/reference/conventions.md` (Phase 11 섹션)                         |

---

## 5. 검증

- `pnpm build` — 0 errors
- `pnpm lint` — 0 errors, 8 warnings (기존과 동일)
- `pnpm lint --fix` 후 BottomSheetWrapper.css.ts `'0px'`/`'0%'` 보존 확인
