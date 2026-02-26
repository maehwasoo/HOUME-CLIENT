import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { animationTokens } from '@styles/tokens/animation.css';
import { colorVars } from '@styles/tokens/color.css';

export const pageLayout = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
});

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.6rem 2rem 2rem 2rem',
  animation: animationTokens.fadeInUpFast,
});

export const infoSection = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '2.4rem',
  marginBottom: '2.4rem',
  width: '93%',
});

export const progressBarBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.8rem',
  borderRadius: '12px',
  backgroundColor: colorVars.color.gray050,
  padding: '1.6rem 2rem 1.2rem 2rem',
  width: '100%',
  minWidth: '30.5rem',
});

// progress bar
export const progressBack = style({
  borderRadius: '999px',
  backgroundColor: colorVars.color.gray200,
  width: '100%',
  minWidth: '26.5rem',
  height: '0.4rem',
  overflow: 'hidden',
});

export const progressBar = style({
  transition: 'width 0.2s ease-out',
  backgroundColor: colorVars.color.primary,
  height: '100%',
});

export const loadText = style({
  ...fontStyle('caption_r_12'),
  textAlign: 'center',
  color: colorVars.color.gray500,
});

export const infoText = style({
  ...fontStyle('body_r_14'),
  textAlign: 'center',
  color: colorVars.color.gray900,
});

export const carouselSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2.4rem',
  width: '100%',
});

export const buttonGroup = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '0.7rem',
  width: '100%',
});

// 이미지 영역 컨테이너
export const imageContainer = style({
  aspectRatio: '1 / 1',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minWidth: '33.5rem',
  height: 'auto',
});

// 현재 이미지 영역
export const currentImageArea = style({
  aspectRatio: '1 / 1',
  position: 'absolute',
  transform: 'translateY(0)',
  transition: 'transform 0.6s ease, opacity 0.6s ease',
  opacity: 1,
  width: '100%',
  minWidth: '33.5rem',
  overflow: 'hidden',
});

export const currentImageAreaOut = style({
  transform: 'translateY(-20px)',
  opacity: 0,
});

// 다음 이미지 영역
export const nextImageArea = style({
  aspectRatio: '1 / 1',
  position: 'absolute',
  transform: 'translateY(30px)',
  transition:
    'transform 0.6s ease, opacity 0.6s ease, width 0.6s ease, height 0.6s ease',
  opacity: 0,
  borderRadius: '16px',
  width: '91%',
  minWidth: '30.5rem',
  overflow: 'hidden',
});

export const nextImageAreaActive = style({
  aspectRatio: '1 / 1',
  transform: 'translateY(0)',
  opacity: 1,
  width: '100%',
  minWidth: '33.5rem',
});

// 이미지 스타일
export const imageStyle = style({
  borderRadius: '16px',
  objectFit: 'cover',
  width: '100%',
  height: '100%',
});

// 에러 메시지 스타일
export const errorMessage = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  ...fontStyle('body_r_14'),
  textAlign: 'center',
  color: colorVars.color.gray600,
});
