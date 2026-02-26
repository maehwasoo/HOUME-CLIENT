import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import {
  SKELETON_GRADIENT,
  animationTokens,
} from '@styles/tokens/animation.css';

export const cardCurationContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.6rem',
  width: '100%',
  overflow: 'visible',
});

export const cardImage = style({
  aspectRatio: '1/1',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0.8rem',
  cursor: 'pointer',
  width: '100%',
  overflow: 'hidden',
});

export const image = recipe({
  base: {
    transition: 'opacity 0.3s ease-in-out',
    objectFit: 'cover',
    width: '100%',
    height: '100%', // 이미지 로드 완료 시 이미지로 부드럽게 전환
  },
  variants: {
    loaded: {
      true: { opacity: 1 },
      false: { opacity: 0 }, // 로드 중에는 이미지 투명하게
    },
  },
  defaultVariants: {
    loaded: false,
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
