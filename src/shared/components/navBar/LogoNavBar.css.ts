import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '7.2rem',
  textAlign: 'center',
  ...fontStyle('body_r_14'),
  color: colorVars.color.gray900,
});

export const leftdiv = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '7.2rem',
});

export const profileicon = style({
  padding: '0 1.6rem',
});

export const rightdiv = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.2rem 1.6rem',
  minWidth: '8rem',
  height: '4.8rem',
});
