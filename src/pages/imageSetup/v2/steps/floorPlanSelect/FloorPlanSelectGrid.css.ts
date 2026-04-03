import { style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  minHeight: 0,
  overflow: 'hidden',
});

export const chipBar = style({
  display: 'flex',
  flexShrink: 0,
  gap: unitVars.unit.gapPadding['200'],
  padding: `${unitVars.unit.gapPadding['200']} ${unitVars.unit.gapPadding['500']}`,
  overflowX: 'auto',
  overflowY: 'hidden',
  scrollbarWidth: 'none',
  whiteSpace: 'nowrap',
  msOverflowStyle: 'none',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const gridScroll = style({
  flex: 1,
  padding: `${unitVars.unit.gapPadding['300']} ${unitVars.unit.gapPadding['500']}`,
  overflow: 'auto',
});

export const divider = style({
  margin: `${unitVars.unit.gapPadding['800']} calc(${unitVars.unit.gapPadding['500']} * -1)`,
  backgroundColor: colorVars.color.border.secondary,
  width: `calc(100% + ${unitVars.unit.gapPadding['500']} * 2)`,
  height: '0.8rem',
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  justifyItems: 'center',
  gap: unitVars.unit.gapPadding['200'],
});

export const chipIcon = style({
  flexShrink: 0,
  width: '1.2rem',
  height: '1.2rem',
});

// --- filtered-none 빈 결과 상태 (isExact: false) ---

export const emptyContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: unitVars.unit.gapPadding['200'],
  padding: `${unitVars.unit.gapPadding['200']} ${unitVars.unit.gapPadding['100']}`,
});

export const emptyTitle = style({
  margin: 0,
  textAlign: 'center',
  color: colorVars.color.text.secondary,
  ...fontVars.font.title_m_16,
});

export const emptyDescription = style({
  margin: 0,
  textAlign: 'center',
  whiteSpace: 'pre-line',
  color: colorVars.color.text.tertiary,
  ...fontVars.font.body_r_13,
});

// --- "선택한 필터와 유사한 공간" 섹션 ---

export const similarSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: unitVars.unit.gapPadding['300'],
  padding: `${unitVars.unit.gapPadding['400']} ${unitVars.unit.gapPadding['400']} ${unitVars.unit.gapPadding['600']}`,
});

export const similarTitle = style({
  margin: 0,
  padding: `0 ${unitVars.unit.gapPadding['100']}`,
  ...fontVars.font.title_sb_16,
  color: colorVars.color.text.primary,
});
