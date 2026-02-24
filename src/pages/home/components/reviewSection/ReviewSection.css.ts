import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const wrapper = style({
  width: '100%',
  minWidth: '37.5rem',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2.4rem',
  backgroundColor: colorVars.color.primary_light2,
  padding: '3.2rem 3rem',
});

export const footerContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4rem',
  marginBottom: '11.7rem',
  backgroundColor: colorVars.color.gray000,
  width: '100%',
});

export const copy = style({
  ...fontStyle('body_r_14'),
  padding: '4rem 0',
  textAlign: 'center',
  color: colorVars.color.gray500,
});
