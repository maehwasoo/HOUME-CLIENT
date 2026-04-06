import { recipe } from '@vanilla-extract/recipes';

import { colorVars } from '@/shared/styles/tokensV2/color.css';
import { fontVars } from '@/shared/styles/tokensV2/font.css';

export const linkButton = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease-in-out',
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
        ...fontVars.font.caption_r_11,
        color: colorVars.color.text.primary,
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
