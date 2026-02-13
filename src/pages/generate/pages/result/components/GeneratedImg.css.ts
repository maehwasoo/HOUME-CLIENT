import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

// import { zIndex } from '@/shared/styles/tokens/zIndex';
import { fontStyle } from '@/shared/styles/fontStyle';
import { animationTokens } from '@/shared/styles/tokens/animation.css';

import { colorVars } from '@styles/tokens/color.css';

export const container = style({
  width: '100%',
  minHeight: '26rem',
  aspectRatio: '3 / 2',
  overflow: 'hidden',
  position: 'relative',
});

export const swiperSlide = style({
  position: 'relative',
  overflow: 'hidden',
});

export const imgArea = recipe({
  base: {
    width: '100%',
    aspectRatio: '3 / 2',
    objectFit: 'cover', // 비율 유지하며 영역 완전히 채움
    objectPosition: 'center', // 이미지 중앙 부분 표시
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
  },
  defaultVariants: {
    mirrored: false,
  },
});

export const slideNum = style({
  position: 'absolute',
  right: '1.2rem',
  top: '1.2rem',
  width: '3.4rem',
  height: '2rem',
  borderRadius: '99.9rem',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colorVars.color.gray000,
  backgroundColor: colorVars.color.gray999_30,
  ...fontStyle('caption_r_11'),
  gap: '0.1rem',
});

export const slideNumSkeleton = style({
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
  border: `1px solid ${colorVars.color.gray200}`,
  boxShadow: `inset 0 0 0 1px ${colorVars.color.gray100}`,
  background: `linear-gradient(
    90deg,
    ${colorVars.color.gray200} 0%,
    ${colorVars.color.gray100} 50%,
    ${colorVars.color.gray200} 100%
  )`,
  backgroundSize: '200% 100%',
  animation: `${animationTokens.skeletonWave} 1.6s ease-in-out infinite`,
});

export const slideBtnCircle = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '2.4rem',
  height: '2.4rem',
  borderRadius: '1.2rem',
  backgroundColor: colorVars.color.gray999,
  pointerEvents: 'none',
  transition: 'opacity 0.2s ease-in-out',
});

export const slideBtnIcon = style({
  position: 'relative',
  zIndex: 1,
  width: '1.2rem',
  height: '1.2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

globalStyle(`${slideBtnIcon} > svg`, {
  width: '1.2rem',
  height: '1.2rem',
});

export const slidePrevBtn = style({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  left: '0.6rem',
  top: 'calc(50% + 0.8rem)',
  transform: 'translateY(-50%)',
  width: '3.6rem',
  height: '3.6rem',
  borderRadius: '99.9rem',
  padding: 0,
  border: 'none',
  background: 'transparent',
  appearance: 'none',
  WebkitTapHighlightColor: 'transparent',
  zIndex: 1,
  selectors: {
    '&:disabled': {
      cursor: 'default',
    },
  },
});

export const slideNextBtn = style({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: '0.6rem',
  top: 'calc(50% + 0.8rem)',
  transform: 'translateY(-50%)',
  width: '3.6rem',
  height: '3.6rem',
  borderRadius: '99.9rem',
  padding: 0,
  border: 'none',
  background: 'transparent',
  appearance: 'none',
  WebkitTapHighlightColor: 'transparent',
  zIndex: 1,
  selectors: {
    '&:disabled': {
      cursor: 'default',
    },
  },
});

globalStyle(`${slidePrevBtn} ${slideBtnCircle}`, {
  opacity: 0.3,
});

globalStyle(`${slidePrevBtn}:active:not(:disabled) ${slideBtnCircle}`, {
  opacity: 0.5,
});

globalStyle(`${slidePrevBtn}:disabled ${slideBtnCircle}`, {
  opacity: 0.04,
});

globalStyle(`${slideNextBtn} ${slideBtnCircle}`, {
  opacity: 0.3,
});

globalStyle(`${slideNextBtn}:active:not(:disabled) ${slideBtnCircle}`, {
  opacity: 0.5,
});

globalStyle(`${slideNextBtn}:disabled ${slideBtnCircle}`, {
  opacity: 0.04,
});

export const imgAreaBlurred = recipe({
  base: {
    width: '100%',
    aspectRatio: '3 / 2',
    objectFit: 'cover',
    objectPosition: 'center',
    filter: 'blur(15px)',
    backgroundColor: 'lightgray',
  },
  variants: {
    mirrored: {
      true: {
        transform: 'scaleX(-1) scale(1.1)',
      },
      false: {
        transform: 'scale(1.1)',
      },
    },
  },
  defaultVariants: {
    mirrored: false,
  },
});

export const lockWrapper = style({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.6rem',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  filter: 'none',
});

export const moreBtn = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '11.6rem',
  height: '4.4rem',
  backgroundColor: colorVars.color.gray999,
  borderRadius: '99.9rem',
  ...fontStyle('body_m_14'),
  color: colorVars.color.gray000,
});
