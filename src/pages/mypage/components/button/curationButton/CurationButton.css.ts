import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const curationButton = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1px solid ${colorVars.color.gray300}`,
    borderRadius: '999px',
    backgroundColor: colorVars.color.gray000,
    cursor: 'pointer',
    padding: '0.8rem 0.4rem',
    width: '100%',
    height: '3rem',
    ...fontStyle('caption_r_12'),
    color: colorVars.color.gray700,
  },
});

export const curationButtonText = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.4rem',
  padding: '0 0.8rem',
});

export const curationButtonIcon = style({
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.6rem',
  width: '2.4rem',
  height: '2.4rem',
  color: colorVars.color.gray500,
});
