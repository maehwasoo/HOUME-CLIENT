import { style } from '@vanilla-extract/css';

import { zIndex } from '@styles/tokens/zIndex';
import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

const PRODUCT_BOTTOM_SHEET_COLLAPSED_HEIGHT = '24rem';
const PRODUCT_SCROLL_TOP_FLOATING_BOTTOM = `calc(${PRODUCT_BOTTOM_SHEET_COLLAPSED_HEIGHT} + 1.2rem)`;

export const section = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
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
  margin: '0 auto',
  background: colorVars.color.bg.primary,
  width: '100%',
  minWidth: unitVars.unit.dimension.wMin,
  maxWidth: unitVars.unit.dimension.wMax,
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

export const productListFallback = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  padding: unitVars.unit.gapPadding['000'],
  width: '100%',
});

export const productListState = style({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});

export const productListEmptyWrap = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: `${unitVars.unit.gapPadding['500']} ${unitVars.unit.gapPadding['000']}`,
  width: '100%',
});

export const recommendDivider = style({
  margin: 0,
  backgroundColor: colorVars.color.border.tertiary,
  height: '0.8rem',
});

export const emptyContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: unitVars.unit.gapPadding['000'],
  padding: unitVars.unit.gapPadding['400'],
  width: '100%',
});

export const emptyTitle = style({
  margin: 0,
  textAlign: 'center',
  color: colorVars.color.text.secondary,
  ...fontVars.font.title_sb_16,
});

export const emptyDescription = style({
  margin: 0,
  textAlign: 'center',
  whiteSpace: 'pre-line',
  color: colorVars.color.text.tertiary,
  ...fontVars.font.body_r_14,
});

export const scrollTopFloatingWrap = style({
  position: 'fixed',
  zIndex: zIndex.sticky,
  right: unitVars.unit.gapPadding['500'],
  bottom: PRODUCT_SCROLL_TOP_FLOATING_BOTTOM,
  transform: 'translateY(0.8rem)',
  transition: 'opacity 240ms ease, transform 240ms ease',
  opacity: 0,
  border: `1px solid ${colorVars.color.border.tertiary}`,
  borderRadius: unitVars.unit.radius['full'],
  backgroundColor: colorVars.color.bg.primary,
  pointerEvents: 'none',
});

export const scrollTopFloatingWrapVisible = style({
  transform: 'translateY(0)',
  opacity: 1,
  pointerEvents: 'auto',
});
