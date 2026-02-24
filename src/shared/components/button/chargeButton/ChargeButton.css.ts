import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const chargeButton = recipe({
  base: {
    alignItems: 'center',
    gap: '0.8rem',
    transition: 'all 0.2s ease-in-out',
    border: 'none',
    borderRadius: '999px',
    ...fontStyle('caption_m_12'),
    padding: '0rem 1.2rem',
    height: '2.8rem',
    color: colorVars.color.primary,
  },
  variants: {
    state: {
      active: {
        backgroundColor: colorVars.color.primary_light2,
        ':active': {
          backgroundColor: colorVars.color.primary_light1,
        },
      },
      disabled: {
        backgroundColor: colorVars.color.gray300,
        cursor: 'not-allowed',
        color: colorVars.color.gray000,
      },
    },
  },
  defaultVariants: {
    state: 'active',
  },
});
