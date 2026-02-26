import { style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokens/color.css';

export const divider = style({
  border: '0',
  backgroundColor: colorVars.color.gray100,
  width: '100%',
  height: '0.1rem',
});
