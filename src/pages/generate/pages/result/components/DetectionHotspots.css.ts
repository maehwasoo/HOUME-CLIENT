import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import {
  SKELETON_GRADIENT,
  animationTokens,
} from '@styles/tokens/animation.css';
import { zIndex } from '@styles/tokens/zIndex';

export const container = style({
  aspectRatio: '3 / 2',
  position: 'relative',
  width: '100%',
  minHeight: '26rem',
  overflow: 'hidden',
});

export const image = recipe({
  base: {
    transition: 'transform 0.2s ease-out, opacity 0.3s ease-in-out',
    objectFit: 'cover',
    objectPosition: 'center',
    width: '100%',
    height: '100%',
  },
  variants: {
    mirrored: {
      true: {
        transform: 'scaleX(-1)',
      },
      false: {
        transform: 'none',
      },
    },
    loaded: {
      true: { opacity: 1 },
      false: { opacity: 0 },
    },
  },
  defaultVariants: {
    mirrored: false,
    loaded: false,
  },
});

export const overlay = recipe({
  base: {
    position: 'absolute',
    zIndex: zIndex.base,
    inset: 0,
    transition: 'opacity 0.24s ease-out',
    opacity: 0,
    // 오버레이 레이어 우선순위 명시
    pointerEvents: 'none',
  },
  variants: {
    visible: {
      true: {
        opacity: 1,
        pointerEvents: 'auto',
      },
      false: {
        opacity: 0,
        pointerEvents: 'none',
      },
    },
  },
  defaultVariants: {
    visible: false,
  },
});

export const hotspot = style({
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  // 핫스팟 버튼 크기를 px 단위로 고정
  cursor: 'pointer',
  width: '24px',
  height: '24px',
});

export const skeleton = style({
  position: 'absolute',
  zIndex: zIndex.base,
  inset: 0,
  background: SKELETON_GRADIENT,
  backgroundSize: '200% 100%',
  animation: `${animationTokens.skeletonWave} 2s linear infinite`,
});
