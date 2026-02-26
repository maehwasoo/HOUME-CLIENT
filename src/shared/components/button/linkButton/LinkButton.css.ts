import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const linkButton = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease-in-out',
    border: `1px solid ${colorVars.color.gray300}`,
    borderRadius: '999px',

    backgroundColor: colorVars.color.gray000,
    padding: '0.6rem',
    height: '2.6rem',

    ':active': {
      backgroundColor: colorVars.color.gray300,
    },
  },
  variants: {
    type: {
      withText: {
        gap: '0.2rem',
        width: 'fit-content',
        whiteSpace: 'nowrap',
        ...fontStyle('caption_r_11'),
        color: colorVars.color.gray700,
      },
      onlyIcon: {
        width: '2.6rem',
      },
    },
  },
  defaultVariants: {
    type: 'withText',
  },
});
