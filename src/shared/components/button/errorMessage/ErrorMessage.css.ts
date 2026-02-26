import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const messageWrapper = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: '1rem',
  marginTop: '0.4rem',
  width: '100%',
});

export const messageText = style({
  ...fontStyle('caption_r_12'),
  padding: '0.4rem 0',
  whiteSpace: 'pre-line',
  color: colorVars.color.error, // 줄 바꿈
});
