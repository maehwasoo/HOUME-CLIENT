import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const likeButton = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease-in-out',
    border: 'none',

    padding: '1rem',
    width: '100%',

    ':active': {
      backgroundColor: colorVars.color.gray300,
    },
  },
  variants: {
    type: {
      // loading
      withText: {
        gap: '0.4rem',
        borderRadius: '6px',
        backgroundColor: colorVars.color.gray100,
        width: '14rem',
        ...fontStyle('body_r_14'),
        height: '4.8rem',
        color: colorVars.color.gray800,
      },
      // result
      onlyIcon: {
        borderRadius: '999px',
        backgroundColor: colorVars.color.gray000,
        width: '4rem',
        height: '4rem',
      },
    },

    selected: {
      true: {},
      false: {},
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },
  compoundVariants: [
    // withText + selected
    {
      variants: { type: 'withText', selected: true },
      style: {
        ...fontStyle('body_m_14'),
        backgroundColor: colorVars.color.primary_light2,
        color: colorVars.color.primary,
      },
    },
  ],
  defaultVariants: {
    selected: false,
    type: 'withText',
    disabled: false,
  },
});
