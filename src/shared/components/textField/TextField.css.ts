import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const textField = recipe({
  base: {
    boxSizing: 'border-box',
    transition: 'all 0.2s ease-in-out',
    outline: 'none',
    borderRadius: '6px',
    padding: '1.4rem 1.2rem',
    width: '100%',
    ...fontStyle('body_r_14'),
    height: '4.9rem',

    ':active': {
      backgroundColor: colorVars.color.gray300,
    },

    ':focus': {
      border: `1px solid ${colorVars.color.primary}`,
      color: colorVars.color.gray900,
    },
  },
  variants: {
    state: {
      default: {
        backgroundColor: colorVars.color.gray100,
        color: colorVars.color.gray400,
      },
      filled: {
        backgroundColor: colorVars.color.gray100,
        color: colorVars.color.gray900,
      },
      error: {
        border: 'none',
        backgroundColor: colorVars.color.error_light,
        color: colorVars.color.error,

        ':focus': {
          border: `1px solid ${colorVars.color.error}`,
        },
      },
      errorFocused: {
        border: `1px solid ${colorVars.color.error}`,
        backgroundColor: colorVars.color.error_light,
        color: colorVars.color.error,
        selectors: {
          '&:focus': {
            border: `1px solid ${colorVars.color.error}`,
          },
        },
      },
    },
    fieldSize: {
      thin: {
        padding: '0.8rem 1.2rem',
        minWidth: '25.9rem',
        height: '3.6rem',
      },
      small: {
        minWidth: '10.7rem',
        textAlign: 'center',
      },
      large: {
        minWidth: '33.5rem',
      },
    },
  },
  defaultVariants: {
    state: 'default',
    fieldSize: 'small',
  },
});
