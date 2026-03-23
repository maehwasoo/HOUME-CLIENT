import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  selectors: {
    '&:active': {
      transform: 'scale(0.98)',
    },
  },
});

export const card = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    flexShrink: 0,
    alignItems: 'flex-start',
    transition: 'transform 100ms ease',
    border: 0,
    borderRadius: unitVars.unit.radius['500'],
    overflow: 'hidden',
  },
  variants: {
    size: {
      s: {
        aspectRatio: '164 / 111',
        padding: unitVars.unit.gapPadding['300'],
        width: '100%',
      },
      // 추후 m, l 등 사이즈 추가 시 확장
    },
  },
  defaultVariants: {
    size: 's',
  },
});

export const gradient = style({
  position: 'absolute',
  zIndex: 0,
  inset: 0,
  background:
    'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 39.71%, rgba(0, 0, 0, 0) 100%)',
});

export const image = style({
  position: 'absolute',
  zIndex: 0,
  inset: 0,
  objectFit: 'cover',
  width: '100%',
  height: '100%',
});

export const starIcon = recipe({
  base: {
    position: 'relative',
    zIndex: 1,
    flexShrink: 0,
  },
  variants: {
    size: {
      s: {
        width: '1.6rem',
        height: '1.6rem',
      },
    },
  },
  defaultVariants: {
    size: 's',
  },
});

export const title = recipe({
  base: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: colorVars.color.text.secondary,
  },
  variants: {
    size: {
      s: {
        ...fontVars.font.body_r_14,
        padding: unitVars.unit.gapPadding['100'],
      },
      // 추후 m, l 등 카드 사이즈 추가 시 동일하게 확장
    },
  },
  defaultVariants: {
    size: 's',
  },
});
