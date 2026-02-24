# Component Catalog

## 공용 네비게이션 & 헤더

- `shared/components/navBar/LogoNavBar.tsx`는 로그인/프로필 상태에 따라 버튼을 토글하고 `ROUTES`를 이용해 내비게이션을 제어해요.
- `TitleNavBar.tsx`는 페이지별 제목, 뒤로가기, 설정/로그인 버튼을 조건부로 렌더링하며 대부분의 내부 페이지에서 사용돼요.

## 버튼 스택

- `shared/components/button` 하위 디렉터리는 CTA, Kakao, Like, Save, Flip, Charge, Large/Small Filled, Error 버튼 등을 variant recipe 패턴으로 분류해요.
- 각 버튼은 Vanilla Extract recipe로 상태(활성/비활성/선택), 사이즈, 타입 변형을 정의했기 때문에 디자이너 토큰을 그대로 반영해요.

## 입력 & 폼 요소

- `shared/components/textField/TextField.tsx`는 controlled/ uncontrolled 하이브리드 패턴을 지원하고 focus/error 상태를 CSS variant로 노출해요.
- `signup`/`imageSetup` 등 폼 페이지는 이 텍스트 필드와 `LargeFilledButton`, `Caption` 컴포넌트를 조합해 재사용성을 높였어요.

## 정보 카드 & 피드백

- `shared/components/card`, `cardReview`, `cardImage`, `cardHistory` 등은 이미지/텍스트 조합 카드 UI를 모듈화했고, Storybook 스토리를 통해 빠르게 시각 검증할 수 있어요.
- `shared/components/loading/Loading.tsx`, `shared/components/text/Text.tsx`, `shared/components/divider/Divider.tsx` 등 상태 알려주는 컴포넌트도 별도 폴더로 나뉘어요.

## Toast & Overlay

- `shared/components/toast` 디렉터리는 `Toast` 프레젠테이션, `useToast` 훅, 테스트 컴포넌트를 포함해 토스트 UX를 완성해요.
- `shared/components/overlay/{modal,popup}`는 오버레이 레벨 UI를 담당하며, `GeneralModal`은 두 버튼 슬롯, 크레딧 칩 옵션 등을 지원하고 `overlay-kit` provider에 의해 DOM 트리에 안전하게 주입돼요.

## Bottom Sheet & Drag UX

- `shared/components/bottomSheet/BottomSheetWrapper.tsx`는 스냅 상태·드래그 핸들·backdrop을 재사용 가능한 래퍼로 제공하고, `noMatchSheet`, `flipSheet`, `ResultPage`의 큐레이션 시트가 이를 확장해요.
- `shared/hooks/useBottomSheetDrag.ts`와 `SHEET_*` 상수를 조합해 모바일 바텀시트 UX를 통일해요.

## Lottie & Media

- `shared/components/lottie` 폴더는 Lottie 애니메이션 래퍼, placeholder, 스켈레톤 등을 보관해 이미지 생성 과정에서 자연스러운 로딩 경험을 제공해요.

## 도메인 전용 섹션

- `pages/home/components/*`: Intro/StepGuide/Review 섹션이 각각의 CSS 파일을 갖고 있어 랜딩 페이지 연출을 쉽게 유지보수할 수 있어요.
- `pages/imageSetup/components`: Funnel Header/Layout/ButtonGroup/Caption 등 퍼널 전용 컴포넌트를 제공해 각 스텝이 일관된 UI를 유지해요.
- `pages/generate/pages/result` 안의 `DetectionHotspots`, `GeneratedImgA/B`, `CurationSheet` 등은 AI 결과와 가구 큐레이션 UI를 세분화해 복잡한 상태를 나눠요.
- `pages/mypage/components`: NavBar, ProfileSection, SavedItemsSection, GeneratedImagesSection, Button, Card, History 등 사용자 자산 뷰를 책임지고 있고, Tab & section 컴포넌트로 관심 영역별 구분을 명확히 했어요.

## Storybook 커버리지

- `src/stories/*.stories.tsx` 파일은 공통 컴포넌트를 모두 샘플 스토리로 등록해 디자인 QA, 회귀 테스트, 제품/마케팅 협업에 사용돼요. `Introduction.mdx`는 사용 가이드를 문서화하고 있어 신규 기여자가 UI 토큰을 빠르게 이해할 수 있어요.
