import { style, styleVariants } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokens/color.css';

export const flipButtonBase = style({
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.8rem',
  transition: 'all 0.2s ease-in-out',
  border: 'none',
  borderRadius: '999px',
  padding: '1.2rem 0',
  width: '8rem',
  height: '5.6rem',

  ':active': {
    backgroundColor: colorVars.color.primary_light1,
  },
});

export const flipButtonVariants = styleVariants({
  normal: {
    backgroundColor: colorVars.color.primary_light2,
  },
  clicked: {
    backgroundColor: colorVars.color.primary_light1,
  },
});
