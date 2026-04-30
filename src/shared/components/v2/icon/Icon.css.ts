import { styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { unitVars } from '@/shared/styles/tokensV2/unit.css';

export const iconSize = styleVariants({
  '12': { width: '1.2rem', height: '1.2rem' },
  '14': { width: '1.4rem', height: '1.4rem' },
  '16': { width: '1.6rem', height: '1.6rem' },
  '20': { width: '2rem', height: '2rem' },
  '24': { width: '2.4rem', height: '2.4rem' },
  '32': { width: '3.2rem', height: '3.2rem' },
  '40': { width: '4rem', height: '4rem' },
});

export const iconButton = recipe({
  base: {
    padding: unitVars.unit.gapPadding[100],

    selectors: {
      // 비활성화 상태가 아닐 때만 active 효과 적용
      '&:not(:disabled):active': {
        transform: 'scale(0.95)',
      },
    },
  },
  variants: {
    disabled: {
      true: { opacity: 0.2, cursor: 'not-allowed' },
    },
    size: {
      XXS: {},
      S: {},
      M: { padding: unitVars.unit.gapPadding['200'] },
      L: {},
      XL: {},
    },
  },
});
