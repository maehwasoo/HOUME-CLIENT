import { style } from '@vanilla-extract/css';

import { zIndex } from '@styles/tokens/zIndex';
import { colorVars } from '@styles/tokensV2/color.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const section = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  paddingBottom: '22rem', // 하단 바 높이만큼 패딩
  width: '100%',
});

export const searchHeader = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: `${unitVars.unit.gapPadding['100']} ${unitVars.unit.gapPadding['000']}`,
  width: '100%',
});

export const stickyHeader = style({
  position: 'fixed',
  zIndex: zIndex.navigation,
  top: 0,
  left: 0,
  background: colorVars.color.bg.primary,
  width: '100%',
});

export const stickySearchBarWrap = style({
  transform: 'translateY(-0.8rem)',
  transition: 'max-height 360ms ease, opacity 360ms ease, transform 360ms ease',
  opacity: 0,
  maxHeight: 0,
  overflow: 'hidden',
});

export const stickySearchBarWrapVisible = style({
  transform: 'translateY(0)',
  opacity: 1,
  maxHeight: '6.4rem',
});

export const searchBarContainer = style({
  boxSizing: 'border-box',
  padding: `${unitVars.unit.gapPadding['200']} ${unitVars.unit.gapPadding['500']}`,
  width: '100%',
});

export const filterList = style({
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  overflow: 'hidden',
});

export const filterScroll = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  gap: unitVars.unit.gapPadding['100'],
  padding: `${unitVars.unit.gapPadding['200']} ${unitVars.unit.gapPadding['500']}`,
  width: '100%',
  minWidth: 0,
  maxWidth: '100%',
  overflowX: 'auto',
  overflowY: 'hidden',
  overscrollBehaviorX: 'contain',
  scrollbarWidth: 'none',
  whiteSpace: 'nowrap',
  msOverflowStyle: 'none',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const productList = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: unitVars.unit.gapPadding['200'],
  padding: `${unitVars.unit.gapPadding['200']} ${unitVars.unit.gapPadding['500']}`,
  width: '100%',
});
