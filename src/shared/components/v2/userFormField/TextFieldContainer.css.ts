import { style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const fieldWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: unitVars.unit.gapPadding['100'],
  width: '100%',
});

export const fieldBox = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.2s ease-in-out',
  border: `1px solid ${colorVars.color.border.primary}`,
  borderRadius: unitVars.unit.radius['300'],
  backgroundColor: colorVars.color.fill.inverse,
  padding: unitVars.unit.gapPadding['200'],
  width: '100%',
  height: '4.4rem',
  selectors: {
    '&:active': {
      transform: 'scale(0.98)',
    },
  },
});

export const focused = style({
  borderColor: colorVars.color.border.strong,
});

export const errorMessage = style({
  display: 'flex',
  alignItems: 'center',
  gap: unitVars.unit.gapPadding['100'],
  ...fontVars.font.caption_r_12,
  color: colorVars.color.text.danger,
});
