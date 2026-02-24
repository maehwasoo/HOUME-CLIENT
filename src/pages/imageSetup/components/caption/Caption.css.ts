import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const container = style({
  display: 'flex',
  gap: '0.4rem',
  outline: `1px solid ${colorVars.color.gray300}`,
  outlineOffset: '-1px',
  borderRadius: '8px',
  backgroundColor: colorVars.color.gray000,
  padding: '0.8rem 1rem',
});

export const textBox = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
});

export const text = style({
  ...fontStyle('caption_r_12'),
  color: colorVars.color.gray500,
});
