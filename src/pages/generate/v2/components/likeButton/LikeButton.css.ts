import { recipe } from '@vanilla-extract/recipes';

import { pressInteraction } from '@styles/tokensV2/interaction/presets';

import { colorVars } from '@/shared/styles/tokensV2/color.css';
import { unitVars } from '@/shared/styles/tokensV2/unit.css';

export const likeButton = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transformOrigin: 'center center',
    ...pressInteraction(0.9, '&:not(:disabled):active'),
    border: 'none',
    borderRadius: unitVars.unit.radius.full,
    width: '6.8rem',
    height: '6.8rem',
  },
  variants: {
    name: {
      like: { backgroundColor: colorVars.color.fill.primary },
      dislike: { backgroundColor: colorVars.color.fill.dimSecondary },
    },
  },
});
