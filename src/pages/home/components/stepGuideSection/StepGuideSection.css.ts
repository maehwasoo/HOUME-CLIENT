import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'stretch',
  justifyContent: 'center',
  width: '100%',
});

export const landingImage = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.8rem',
  marginTop: '2.5rem',
  marginBottom: '4rem',
});

export const landingImageImg = style({
  objectFit: 'cover',
  width: '37.5rem',
});

export const headingText = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.4rem',
  width: '100%',
  height: '6rem',
  textAlign: 'center',
  ...fontStyle('heading_sb_18'),
});

export const stepLandImage = style({
  marginBottom: '4rem',
  backgroundColor: colorVars.color.gray100,
  objectFit: 'cover',
  width: '37.5rem',
  height: '22rem',
});

export const imageGap = style({
  marginTop: '2rem',
});

export const resultImageContainer = style({
  marginBottom: '4rem',
  padding: '0 2rem',
  width: '100%',
});

export const resultLandImage = style({
  boxSizing: 'border-box',
  aspectRatio: '3 / 2',
  display: 'block',
  borderRadius: '16px',
  backgroundColor: colorVars.color.gray100,
  objectFit: 'cover',
  width: '100%',
});
