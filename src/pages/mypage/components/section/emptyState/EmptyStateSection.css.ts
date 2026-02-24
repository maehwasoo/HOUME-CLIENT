import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});

export const image = style({
  width: '37.5rem',
  height: '22rem',
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.6rem',
});

export const textWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.2rem',
  padding: '1.6rem 2rem',
});

export const title = style({
  ...fontStyle('title_sb_16'),
  textAlign: 'center',
  whiteSpace: 'nowrap',
  color: colorVars.color.gray999,
});

export const description = style({
  ...fontStyle('body_r_14'),
  textAlign: 'center',
  whiteSpace: 'pre-line',
  color: colorVars.color.gray500,
});
