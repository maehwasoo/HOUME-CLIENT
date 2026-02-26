import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const tabNavBar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});

export const tabButton = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    padding: 0,
    width: '100%',
    height: '5rem',

    '::after': {
      position: 'absolute',
      right: 0,
      bottom: 0,
      left: 0,
      height: '0.2rem',
      content: '""',
    },
  },
  variants: {
    state: {
      active: {
        color: colorVars.color.gray800,
        ...fontStyle('title_sb_16'),
        '::after': {
          backgroundColor: colorVars.color.gray800,
        },
      },
      inactive: {
        color: colorVars.color.gray500,
        ...fontStyle('title_m_16'),
        '::after': {
          backgroundColor: colorVars.color.gray100,
        },
      },
    },
  },
  defaultVariants: {
    state: 'inactive',
  },
});

export const tabButtonText = style({
  whiteSpace: 'nowrap',
});
