import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const filterChip = recipe({
  base: {
    transition:
      'color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',
    border: `1px solid ${colorVars.color.gray300}`,
    borderRadius: '999px',
    backgroundColor: colorVars.color.gray000,
    ...fontStyle('body_r_13'),
    padding: '0 1.2rem',
    height: '3.6rem',
    textAlign: 'center',
    color: colorVars.color.gray500,
  },
  variants: {
    selected: {
      true: {
        ...fontStyle('body_m_13'),
        borderColor: 'transparent',
        backgroundColor: colorVars.color.gray999,
        color: colorVars.color.gray000,
      },
    },
  },
  defaultVariants: {
    selected: false,
  },
});
