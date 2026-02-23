import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@/shared/styles/fontStyle';
import { animationTokens } from '@/shared/styles/tokens/animation.css';

import { colorVars } from '@styles/tokens/color.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  position: 'relative',
});

export const sliderArea = style({
  width: '100%',
  height: '26rem',
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
    height: '100%',
    objectFit: 'cover', // 비율 유지하며 영역 완전히 채움
    objectPosition: 'center center', // 이미지 중앙 기준 크롭
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

export const slidePrevBtn = style({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  left: '0.6rem',
  bottom: '50%',
  width: '3.6rem',
  height: '3.6rem',
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
  zIndex: 1,
});

export const slideNextBtn = style({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: '0.6rem',
  bottom: '50%',
  width: '3.6rem',
  height: '3.6rem',
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
  zIndex: 1,
});

export const slideNavIconFrame = style({
  width: '2.4rem',
  height: '2.4rem',
  borderRadius: '1.2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colorVars.color.gray999_30,

  selectors: {
    [`${slidePrevBtn}:active &`]: {
      backgroundColor: colorVars.color.gray999_50,
    },
    [`${slideNextBtn}:active &`]: {
      backgroundColor: colorVars.color.gray999_50,
    },
    [`${slidePrevBtn}:disabled &`]: {
      backgroundColor: colorVars.color.gray999_04,
    },
    [`${slideNextBtn}:disabled &`]: {
      backgroundColor: colorVars.color.gray999_04,
    },
  },
});

globalStyle(`${slideNavIconFrame} > svg`, {
  width: '1.2rem',
  height: '1.2rem',
});

export const imgAreaBlurred = recipe({
  base: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center',
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

export const lockedPreviewImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center center',
});

export const lockWrapper = style({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2rem',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  width: '23.2rem',
});

export const lockTextBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  color: colorVars.color.gray900,
  ...fontStyle('body_m_14'),
});

globalStyle(`${lockTextBox} p`, {
  margin: 0,
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

export const feedbackSection = style({
  marginTop: '2rem',
  padding: '0 2rem',
});

export const feedbackBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1.6rem clamp(1.6rem, 4vw, 4rem)',
  borderRadius: '1.2rem',
  backgroundColor: colorVars.color.gray100,
});

export const feedbackTitle = style({
  margin: 0,
  ...fontStyle('body_m_14'),
  color: colorVars.color.gray900,
});

export const feedbackButtonGroup = style({
  display: 'flex',
  gap: '0.6rem',
});

export const feedbackTagGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const feedbackTagRow = style({
  display: 'flex',
  gap: '0.6rem',
});

export const feedbackTagButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '99.9rem',
  height: '3.6rem',
  padding: '0 1.6rem',
  ...fontStyle('body_r_14'),
  backgroundColor: colorVars.color.gray000,
  color: colorVars.color.gray700,

  ':active': {
    backgroundColor: colorVars.color.gray300,
  },

  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

export const feedbackTagButtonSelected = style({
  backgroundColor: colorVars.color.gray000,
  color: colorVars.color.primary,
});
