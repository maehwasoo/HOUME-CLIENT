import { style } from '@vanilla-extract/css';

import { animationTokens } from '@styles/tokens/animation.css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  width: '100%',
});

export const container = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: '2rem 2rem 4rem 2rem',
  width: '100%',
  maxWidth: '44rem',
  animation: animationTokens.fadeInUpFast,
});

export const gridbox = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))',
  justifyContent: 'center',
  rowGap: '1.2rem',
  columnGap: '1.1rem',
  width: '100%',
});

export const buttonContainer = style({
  marginBottom: '4rem',
  width: '100%',
  maxWidth: '44rem',
});
