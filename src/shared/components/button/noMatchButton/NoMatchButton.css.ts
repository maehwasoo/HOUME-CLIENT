import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const buttonWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: colorVars.color.gray100,
  padding: '0.4rem 2rem',
  width: '100%',
  height: '4.4rem',
});

export const textContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
});

export const messageText = style({
  ...fontStyle('body_m_14'),
  padding: '0.4rem 0',
  whiteSpace: 'pre-line',
  color: colorVars.color.gray600,
});
