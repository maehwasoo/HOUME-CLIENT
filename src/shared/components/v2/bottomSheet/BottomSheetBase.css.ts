import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { zIndex } from '@styles/tokens/zIndex';
import { colorVars } from '@styles/tokensV2/color.css';
import { unitVars } from '@styles/tokensV2/unit.css';

// dim과 바텀시트를 동일한 모바일 프레임 폭으로 맞추기 위한 공통 폭 제한
const mobileFrame = style({
  width: '100%',
  minWidth: unitVars.unit.dimension.wMin,
  maxWidth: unitVars.unit.dimension.wMax,
});

// 바텀시트 포털 전체를 viewport 하단 기준으로 정렬하는 고정 레이어
export const viewportLayer = style({
  position: 'fixed',
  zIndex: zIndex.sheet,
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

// 모바일 콘텐츠 영역에만 dim을 씌우는 오버레이(데스크탑/모바일 환경 모두)
export const overlay = style([
  mobileFrame,
  {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: colorVars.color.fill.dim,
    pointerEvents: 'auto',
  },
]);

// 실제 바텀시트 콘텐츠를 담는 Vaul drawer의 루트
export const content = style([
  mobileFrame,
  {
    position: 'relative',
    outline: 'none',
  },
]);

// 스크린리더용 제목을 시각적으로만 숨기는 역할
export const srOnlyTitle = style({
  position: 'absolute',
  margin: '-0.1rem',
  border: 0,
  padding: 0,
  width: '0.1rem',
  height: '0.1rem',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
});

// 헤더, 본문, 액션 영역을 감싸는 바텀시트 패널 본체
export const panel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: unitVars.unit.gapPadding['200'],
  transition: 'height 350ms ease-in-out',
  borderTopLeftRadius: unitVars.unit.radius['700'],
  borderTopRightRadius: unitVars.unit.radius['700'],
  backgroundColor: colorVars.color.bg.primary,
  padding: `${unitVars.unit.gapPadding['200']} ${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['600']}`,
  width: '100%',
  maxHeight: 'calc(100dvh - 10.4rem)',
  overflow: 'hidden',
});

// drag handle 타입에서 상단 핸들을 가운데 배치하는 헤더
export const dragHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: unitVars.unit.gapPadding['200'],
  width: '100%',
});

// 드래그 시작 지점이 되는 핸들 버튼
export const dragHandleButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 0,
  borderRadius: unitVars.unit.radius.full,
  backgroundColor: colorVars.color.border.primary,
  padding: 0,
  width: '3.5rem',
  height: '0.4rem',
});

// close 타입에서 제목과 닫기 버튼을 배치하는 헤더
export const closeHeader = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: unitVars.unit.gapPadding['200'],
  width: '100%',
  height: '4.8rem',
});

// close 타입 제목을 헤더 왼쪽(FilterSheet)/중앙(FloorPlanSheet)에 고정하는 슬롯
export const titleSlot = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
  },
  variants: {
    align: {
      center: {
        position: 'absolute',
        inset: 0,
        justifyContent: 'center',
        pointerEvents: 'none',
      },
      left: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingLeft: unitVars.unit.gapPadding['400'],
      },
    },
  },
});

// 우측 상단 닫기 액션 버튼
export const closeButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 100ms ease',
  border: 0,
  background: 'transparent',
  padding: unitVars.unit.gapPadding['300'],
  width: '4.8rem',
  height: '4.8rem',
  selectors: {
    '&:active': {
      transform: 'scale(0.95)',
    },
  },
});

// 본문 콘텐츠와 하단 버튼 감싸는 column 래퍼
export const body = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: unitVars.unit.gapPadding['500'],
  padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['600']}`,
  width: '100%',
  height: '100%',
  minHeight: 0,
});

// contentSlot(바텀시트 내부의 실질적인 contents 영역)이 스크롤되도록 하는 슬롯
export const contentSlot = style({
  width: '100%',
  minHeight: 0,
  overflow: 'auto',
});

// 버튼 래퍼 row
export const actionRow = style({
  display: 'flex',
  alignItems: 'stretch',
  gap: unitVars.unit.gapPadding['200'],
  width: '100%',
});

// secondary 버튼이 자기 너비를 유지하도록 감싸는 슬롯
export const secondaryActionSlot = style({
  display: 'flex',
  flexShrink: 0,
});

// primary 버튼이 남은 가로 공간을 채우도록 감싸는 슬롯
export const primaryActionSlot = style({
  display: 'flex',
  flex: 1,
  width: '100%',
  minWidth: 0,
});
