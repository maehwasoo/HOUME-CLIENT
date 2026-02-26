import { keyframes } from '@vanilla-extract/css';

const fadeInUp = keyframes({
  '0%': {
    transform: 'translateY(20px)',
    opacity: 0,
  },
  '100%': {
    transform: 'translateY(0)',
    opacity: 1,
  },
});

const slideLeft = keyframes({
  '0%': {
    transform: 'translateX(100%)',
    opacity: 0,
  },
  '100%': {
    transform: 'translateX(0)',
    opacity: 1,
  },
});

// 애니메이션 토큰
export const animationTokens = {
  fadeInUpSlow: `${fadeInUp} 1.2s ease-out forwards`,
  fadeInUpFast: `${fadeInUp} 0.8s ease-out forwards`,
  slideLeft: `${slideLeft} 1.2s ease-out forwards`,
  shimmer: keyframes({
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  }),
  skeletonWave: keyframes({
    to: { backgroundPositionX: '-200%' },
  }),
  dotsBounce: keyframes({
    '0%, 80%, 100%': { opacity: 0 },
    '40%': { opacity: 1 },
  }),
} as const;

// 스켈레톤 로딩 그라데이션 (skeletonWave와 함께 사용)
export const SKELETON_GRADIENT =
  'linear-gradient(90deg, #ececec 8%, #f0f0f0 18%, #ececec 33%)';
