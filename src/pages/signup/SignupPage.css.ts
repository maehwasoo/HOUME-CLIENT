import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { animationTokens } from '@styles/tokens/animation.css';
import { colorVars } from '@styles/tokens/color.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2.4rem',
  padding: '1.6rem 2rem 0 2rem',
  width: '100%',
  animation: animationTokens.fadeInUpFast,
});

export const title = style({
  width: '100%',
  ...fontStyle('heading_sb_20'),
  color: colorVars.color.gray900,
});

export const fieldbox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});

export const fieldtitle = style({
  marginBottom: '1.2rem',
  ...fontStyle('title_sb_16'),
  width: '100%',
  color: colorVars.color.gray800,
});

export const flexbox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.7rem',
  width: '100%',
});

export const btnarea = style({
  position: 'fixed',
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 2rem 2rem 2rem',
  width: '100%',
  maxWidth: '440px',
});
