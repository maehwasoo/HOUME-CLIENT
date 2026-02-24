import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const filterChip = recipe({
  base: {
    height: '3.6rem',
    padding: '0 1.2rem',
    textAlign: 'center',
    borderRadius: '999px',
    ...fontStyle('body_r_13'),
    backgroundColor: colorVars.color.gray000,
    color: colorVars.color.gray500,
    border: `1px solid ${colorVars.color.gray300}`,
    transition:
      'color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',
  },
  variants: {
    selected: {
      true: {
        ...fontStyle('body_m_13'),
        backgroundColor: colorVars.color.gray999,
        color: colorVars.color.gray000,
        borderColor: 'transparent',
      },
      false: {},
    },
  },
  defaultVariants: {
    selected: false,
  },
});
