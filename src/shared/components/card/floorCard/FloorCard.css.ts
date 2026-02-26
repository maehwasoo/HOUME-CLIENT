import { style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokens/color.css';

export const container = style({
  boxSizing: 'border-box',
  position: 'relative',
  outline: 'none',
  border: `1.5px solid ${colorVars.color.gray200}`,
  borderRadius: '16px',
  cursor: 'pointer',
  width: '100%',
  minWidth: '16rem',
  maxWidth: '19.4rem',
  height: '24rem',
  overflow: 'hidden',

  selectors: {
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      transition: 'background-color 0.3s ease',
      borderRadius: '16px',
      backgroundColor: 'transparent',
      pointerEvents: 'none',
      width: '100%',
      height: '100%',
      content: '',
    },

    '&:active::after': {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
  },
});

export const selected = style({
  selectors: {
    '&::after': {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
  },
});

export const floorimg = style({
  boxSizing: 'border-box',
  display: 'block',
  objectFit: 'cover',
  objectPosition: 'center',
  width: '100%',
  height: '100%',
});
