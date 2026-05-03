import { style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const title = style({
  ...fontVars.font.title_sb_16,
  marginTop: unitVars.unit.gapPadding['400'],
  marginBottom: unitVars.unit.gapPadding['200'],
  color: colorVars.color.text.primary,
});

export const description = style({
  ...fontVars.font.body_r_14,
  color: colorVars.color.text.secondary,
});
