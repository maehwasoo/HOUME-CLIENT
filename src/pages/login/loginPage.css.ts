import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { animationTokens } from '@styles/tokens/animation.css';
import { colorVars } from '@styles/tokens/color.css';

export const container = style({
  background: colorVars.color.bg_grad,
});

export const textbox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.8rem',
  padding: '4rem 2rem 2rem 2rem',
  width: '100%',
  ...fontStyle('title_m_16'),
  animation: animationTokens.fadeInUpFast,
  textAlign: 'center',
});

export const title = style({
  ...fontStyle('heading_sb_20'),
  color: colorVars.color.gray900,
});

export const content = style({
  ...fontStyle('body_r_14'),
  color: colorVars.color.gray600,
});

export const imgbox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});

export const loginImg = style({
  width: '37.5rem',
  height: '34.4rem',
  animation: animationTokens.fadeInUpFast,
});

export const btnarea = style({
  position: 'fixed',
  bottom: '0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  padding: '0 2rem 2rem 2rem',
  width: '100%',
  maxWidth: '430px',
});

export const aside = style({
  ...fontStyle('caption_r_12'),
  color: colorVars.color.gray500,
});

export const link = style({
  cursor: 'pointer',
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
});
