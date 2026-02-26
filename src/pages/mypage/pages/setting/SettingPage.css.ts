import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const container = style({
  padding: '2.4rem 2rem 0 2rem',
  width: '100%',
});

export const section = style({
  marginBottom: '4rem',
});

export const sectionTitle = style({
  ...fontStyle('title_sb_16'),
  marginBottom: '1.6rem',
  color: colorVars.color.gray800,
});

export const buttonArea = style({
  display: 'block',
  margin: 0,
  borderTop: `0.1rem solid ${colorVars.color.gray100}`,
  padding: 0,
  listStyle: 'none',
});

export const buttonItem = style({
  display: 'block',
  borderBottom: `0.1rem solid ${colorVars.color.gray100}`,
  padding: '1.2rem 0',
});

export const settingButton = style({
  display: 'flex',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  padding: 0,
  width: '100%',
  textAlign: 'left',
});

export const buttonText = style({
  ...fontStyle('body_r_14'),
  color: colorVars.color.gray600,
});
