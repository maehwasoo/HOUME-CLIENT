import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@/shared/styles/fontStyle';

import { colorVars } from '@styles/tokens/color.css';

export const linkButton = recipe({
  base: {
    height: '2.6rem',
    padding: '0.6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '999px',

    transition: 'all 0.2s ease-in-out',
    border: `1px solid ${colorVars.color.gray300}`,
    backgroundColor: colorVars.color.gray000,

    ':active': {
      backgroundColor: colorVars.color.gray300,
    },
  },
  variants: {
    type: {
      withText: {
        width: 'fit-content',
        gap: '0.2rem',
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
