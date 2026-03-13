import { style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const container = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: colorVars.color.bg.primary,
  paddingRight: unitVars.unit.gapPadding['400'],
  paddingLeft: unitVars.unit.gapPadding['400'],
  width: '100%',
  minWidth: unitVars.unit.dimension.wMin,
  maxWidth: unitVars.unit.dimension.wMax,
  height: '4.8rem',
});

export const leftSlot = style({
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'flex-start',
});

export const backButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 120ms ease',
  border: 0,
  background: 'transparent',
  paddingTop: unitVars.unit.gapPadding['000'],
  paddingRight: unitVars.unit.gapPadding['100'],
  paddingBottom: unitVars.unit.gapPadding['000'],
  paddingLeft: unitVars.unit.gapPadding['000'],
  color: colorVars.color.text.tertiary,
  ...fontVars.font.title_r_15,
  selectors: {
    '&:active': {
      transform: 'scale(0.95)',
    },
  },
});

export const backIcon = style({
  flexShrink: 0,
  width: '2rem',
  height: '2rem',
});

export const title = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  margin: 0,
  pointerEvents: 'none',
  maxWidth: '70%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: colorVars.color.text.primary,
  ...fontVars.font.title_m_16,
});
