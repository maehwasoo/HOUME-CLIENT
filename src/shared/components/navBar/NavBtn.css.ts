import { style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokens/color.css';

export const loginNav = style({
  cursor: 'pointer',
  width: '4.8rem',
  height: '4.8rem',
  textAlign: 'center',
  textDecoration: 'underline',
  color: colorVars.color.gray900,
  textUnderlineOffset: '3px',
});

export const settingNav = style({
  cursor: 'pointer',
  width: '3.2rem',
  height: '4.8rem',
  textAlign: 'center',
  color: colorVars.color.gray700,
});
