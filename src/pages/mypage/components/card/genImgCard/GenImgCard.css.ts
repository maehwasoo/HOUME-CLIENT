import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import {
  animationTokens,
  SKELETON_GRADIENT,
} from '@styles/tokens/animation.css';

import { colorVars } from '@/shared/styles/tokensV2/color.css';
import { fontVars } from '@/shared/styles/tokensV2/font.css';
import { unitVars } from '@/shared/styles/tokensV2/unit.css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: unitVars.unit.gapPadding['200'],
  padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['500']}`,
  width: '100%',
});

export const textContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: unitVars.unit.gapPadding['200'],
  cursor: 'pointer',
  width: '100%',
});

export const headingText = style({
  display: 'block',
  ...fontVars.font.title_sb_15,
  flex: 1,
  padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['100']}`,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: colorVars.color.text.primary,
});

export const imgContainer = style({
  aspectRatio: '166 / 111',
  position: 'relative',
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  transition: 'transform 100ms ease',
  border: 0,
  borderRadius: unitVars.unit.radius['300'],
  cursor: 'pointer',
  width: '100%',
  overflow: 'hidden',
});

export const cardImg = recipe({
  base: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  variants: {
    mirrored: {
      true: {
        transform: 'scaleX(-1)',
      },
    },
  },
  defaultVariants: {
    mirrored: false,
  },
});

export const listCardContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: unitVars.unit.gapPadding['200'],
  marginRight: `calc(-1 * ${unitVars.unit.gapPadding['500']})`, // 스크롤시
  marginLeft: `calc(-1 * ${unitVars.unit.gapPadding['500']})`,

  padding: `${unitVars.unit.gapPadding['100']} ${unitVars.unit.gapPadding['500']}`,
  width: `calc(100% + 2 * ${unitVars.unit.gapPadding['500']})`,
  overflowX: 'auto',
  scrollbarWidth: 'none',

  whiteSpace: 'nowrap',
  msOverflowStyle: 'none',

  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const skeleton = style({
  position: 'absolute',
  inset: 0,
  borderRadius: '0.8rem',
  background: SKELETON_GRADIENT,
  backgroundSize: '200% 100%',
  animation: `${animationTokens.skeletonWave} 2s linear infinite`,
});
