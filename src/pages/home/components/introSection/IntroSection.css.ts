import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { animationTokens } from '@styles/tokens/animation.css';
import { colorVars } from '@styles/tokens/color.css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  textAlign: 'center',
});

export const titleWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  animation: animationTokens.fadeInUpSlow,
});

export const title = style({
  ...fontStyle('heading_sb_20'),
  marginBottom: '0.8rem',
  textAlign: 'left',
  color: colorVars.color.gray900,
});

export const description = style({
  ...fontStyle('body_r_14'),
  marginBottom: '4rem',
  textAlign: 'left',
  color: colorVars.color.gray600,
});

export const radioImageBox = style({
  aspectRatio: '3 / 2',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '1.6rem',
  borderRadius: '16px',
  width: '100%',
  overflow: 'hidden',
});

export const radioImage = style({
  boxSizing: 'border-box',
  display: 'block',
  objectFit: 'cover',
  objectPosition: 'center',
  width: '100%',
  height: '100%',
});

export const buttonGroup = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.7rem',
  width: '100%',
});

export const radioButtonLabel = style({
  display: 'flex',
  flex: '0 0 calc((100% - 2.1rem) / 4)',
  cursor: 'pointer',
  minWidth: '6rem',
  maxWidth: '10rem',
});

export const radioButton = style({
  display: 'none',
});
