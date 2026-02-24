import { style } from '@vanilla-extract/css';

import { animationTokens } from '@styles/tokens/animation.css';

export const container = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  width: '100%',
});

export const contents = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4rem',
  padding: '2rem',
  animation: animationTokens.fadeInUpFast,
});

export const activityButton = style({
  marginTop: '1.6rem',
});

export const caption = style({
  marginTop: '1.4rem',
});

export const furnitures = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
});
