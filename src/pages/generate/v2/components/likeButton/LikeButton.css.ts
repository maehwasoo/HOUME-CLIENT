import { recipe } from '@vanilla-extract/recipes';

import { colorVars } from '@/shared/styles/tokensV2/color.css';
import { unitVars } from '@/shared/styles/tokensV2/unit.css';

export const likeButton = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: unitVars.unit.radius.full,
    width: '6.8rem',
    height: '6.8rem',

    selectors: {
      '&:active': {
        transform: 'scale(0.95)',
      },
    },
  },
  variants: {
    name: {
      like: { backgroundColor: colorVars.color.fill.primary },
      dislike: { backgroundColor: colorVars.color.fill.dimSecondary },
    },
  },
});
