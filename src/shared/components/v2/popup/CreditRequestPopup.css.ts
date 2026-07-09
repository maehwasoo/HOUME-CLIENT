import { style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const title = style({
  ...fontVars.font.title_sb_16,
  marginBottom: unitVars.unit.gapPadding['200'],
  textAlign: 'center',
  color: colorVars.color.text.primary,
});

export const detail = style({
  ...fontVars.font.title_r_15,
  textAlign: 'center',
  color: colorVars.color.text.secondary,
});
