# Styling System

## 기술 스택

- 전역 스타일과 컴포넌트 스타일 모두 Vanilla Extract(`@vanilla-extract/css`, `@vanilla-extract/recipes`)를 사용하고, 타입 세이프한 토큰을 통해 테마를 관리해요.
- 라우팅/스토리북 환경에서도 동일한 CSS-in-TypeScript 자산이 재사용돼요.

## 글로벌 테마 & Reset

- `src/shared/styles/global.css.ts`가 `createGlobalTheme`로 레이아웃 변수를 만들고 `globalStyle`로 `html/body/#root` 레벨의 모바일 퍼스트 레이아웃, 스크롤 숨김, 폰트 스무딩을 설정해요.
- `reset.css.ts`는 현대적인 CSS Reset을 Vanilla Extract로 구현해 모든 요소의 margin/padding 제거, `box-sizing: border-box`, rem 기준 62.5% 설정, 리스트/링크/폼 요소 초기화를 수행해요.
- `fontFace.css.ts`와 `fontStyle.ts`는 Pretendard 폰트를 선언하고, `fontStyle(key)` 헬퍼로 각 컴포넌트에서 일관된 타이포그래피를 주입하게 해요.

## 디자이너 토큰

- `shared/styles/tokens/color.css.ts`, `font.css.ts`, `animation.css.ts`, `zIndex.ts`가 색상·타입·애니메이션·레이어 토큰을 정의하고, 모든 스타일 시트에서 import 가능한 전역 CSS 변수를 노출해요.
- 애니메이션 토큰은 `keyframes`를 export해 Section 진입 애니메이션, 로딩 스켈레톤, 점프 점 등 인터랙션에 재사용돼요.

## 컴포넌트 스타일 패턴

- 대부분의 공용 컴포넌트는 `*.css.ts` 파일에서 `recipe`를 사용해 상태·사이즈·타입 변형(variants)을 선언하고, TS 수준에서 허용된 prop 값을 제한해요. 예를 들어 `CtaButton.css.ts`는 `state`, `type`, `buttonSize`, `font` 변형을 선언해 동적인 UX를 제공해요.
- `TextField`, `TitleNavBar`, `Button` 계열처럼 내부 상태에 따라 스타일이 바뀌는 요소는 CSS recipe를 통해 focus/error/filled 상태를 선언적으로 표현해요.

## 글로벌 UI 패턴

- **바텀시트**: `shared/components/bottomSheet/BottomSheetWrapper.tsx`와 `BottomSheetWrapper.css.ts`가 backdrop, sheet, drag handle 컨테이너 스타일을 책임지고, `useBottomSheetDrag`와 연계해 드래그 시 `--drag-y` CSS 변수를 이용한 트랜지션을 구현해요.
- **오버레이/모달**: `shared/components/overlay/modal/*.css.ts`와 `overlay-kit` 기반 OverlayProvider가 결합돼 모달 레이어, 그림자, 버튼 배치를 일관되게 유지해요.
- **Toast**: `shared/components/toast/Toast.css.ts`는 `react-toastify`가 주입하는 컨테이너를 커스터마이징하고, `toastConfig`에서 위치/애니메이션/스타일을 전역 정의해요.
- **레이아웃**: `HomePage.css.ts`, `MyPage.css.ts`, `ImageSetup` 내 각 Step CSS가 모두 토큰 기반 spacing과 그림자, gradient 배경(`colorVars.color.bg_grad`)을 재사용해요.

## 자산 & 미디어

- `shared/assets/{icons,images,lottie}`와 `public/fonts`는 Vite alias(`@assets`)로 접근하며, SVG는 SVGR(`?react`)로 React 컴포넌트화돼 스타일 시스템에 자연스럽게 녹아들어요.

## 스토리북 & 문서화

- `.storybook/`와 `src/stories/*.stories.tsx`는 모든 공용 컴포넌트를 토큰 그대로 렌더링해 디자인 팀이 실제 토큰·스타일 적용 결과를 확인할 수 있어요. Storybook은 Vite + Vanilla Extract 설정을 공유하므로 런타임과 동일한 CSS가 생성돼요.
