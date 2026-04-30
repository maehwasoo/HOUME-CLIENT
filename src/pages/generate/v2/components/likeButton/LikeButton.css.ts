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
    padding: unitVars.unit.gapPadding['300'],

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
