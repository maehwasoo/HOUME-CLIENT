import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@styles/fontStyle';
import {
  SKELETON_GRADIENT,
  animationTokens,
} from '@styles/tokens/animation.css';
import { colorVars } from '@styles/tokens/color.css';
import { zIndex } from '@styles/tokens/zIndex';

export const wrapper = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  variants: {
    size: {
      large: { minWidth: '16.4rem' },
      small: { minWidth: '10.8rem' },
    },
  },
});

export const clickable = style({
  cursor: 'pointer',
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${colorVars.color.primary}`,
      outlineOffset: '2px',
      borderRadius: '0.8rem',
    },
  },
});

export const imgSection = recipe({
  base: {
    aspectRatio: '1 / 1', // 내부 absolute(링크 버튼)의 기준
    position: 'relative', // 모서리 밖으로 이미지 안 튀어나오게
    border: `1px solid ${colorVars.color.gray200}`,
    background: 'transparent',
    width: '100%', // 이미지 영역만 정사각형
    overflow: 'hidden',
  },
  variants: {
    size: {
      large: { borderRadius: '0.8rem' },
      small: { borderRadius: '1.2rem' },
    },
  },
});

export const cardImage = recipe({
  base: {
    boxSizing: 'border-box',
    display: 'block',
    transition: 'opacity 0.3s ease-in-out',
    objectFit: 'cover',
    objectPosition: 'center',
    width: '100%',
    height: '100%',
  },
  variants: {
    loaded: {
      true: { opacity: 1 },
      false: { opacity: 0 },
    },
  },
  defaultVariants: {
    loaded: false,
  },
});

export const skeleton = style({
  position: 'absolute',
  inset: 0,
  background: SKELETON_GRADIENT,
  backgroundSize: '200% 100%',
  animation: `${animationTokens.skeletonWave} 2s linear infinite`,
});

export const linkBtnContainer = recipe({
  base: {
    position: 'absolute',
    zIndex: zIndex.button,
  },
  variants: {
    size: {
      large: { bottom: '0.6rem', left: '0.6rem' },
      small: { bottom: '0.8rem', left: '0.8rem' },
    },
  },
});

export const saveBtnOverlay = style({
  position: 'absolute',
  zIndex: zIndex.button,
  top: '0.6rem',
  right: '0.6rem',
});

export const bottomSection = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '0.4rem',
  padding: '0.6rem 0 2rem 0',
  width: '100%',
});

export const textContainer = style({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  gap: '0.6rem',
  padding: '0.2rem',
  width: '100%',
  minWidth: '8rem', // 남은 공간 텍스트가 차기
});

export const saveBtnContainer = style({
  flex: '0 0 auto', // 하트 아이콘 찌그러짐 방지
});

export const productText = style({
  ...fontStyle('body_r_13'),
  display: '-webkit-box',
  maxHeight: '3.6rem',

  overflow: 'hidden',
  color: colorVars.color.gray999, // 최대 2줄
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});

export const brandText = style({
  ...fontStyle('caption_r_11'),
  color: colorVars.color.gray700,
});

export const infoSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  paddingTop: '1.2rem',
  paddingBottom: '2rem',
});

export const colorRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
});

export const colorChip = style({
  boxSizing: 'border-box',
  border: `0.5px solid ${colorVars.color.gray999_30}`,
  borderRadius: '50%',
  width: '1.4rem',
  height: '1.4rem',
});

export const colorChipCount = style({
  ...fontStyle('caption_r_11'),
  color: colorVars.color.gray500,
});

export const productInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  padding: '0.2rem',
});

export const brandTextLarge = style({
  ...fontStyle('caption_r_11'),
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: colorVars.color.gray500,
});

export const productTextLarge = style({
  ...fontStyle('body_r_13'),
  display: '-webkit-box',
  maxHeight: '3.6rem',
  overflow: 'hidden',
  color: colorVars.color.gray900,
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});

export const priceSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const originalPriceText = style({
  ...fontStyle('caption_r_11'),
  textDecoration: 'line-through',
  color: colorVars.color.gray500,
});

export const discountRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.1rem',
});

export const discountRateText = style({
  ...fontStyle('title_sb_15'),
  color: colorVars.color.primary,
});

export const discountPriceText = style({
  ...fontStyle('title_sb_15'),
  color: colorVars.color.gray900,
});

export const saveCountRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
});

export const saveCountIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '1.4rem',
  height: '1.4rem',
});

globalStyle(`${saveCountIcon} svg`, {
  width: '100%',
  height: '100%',
});

globalStyle(`${saveCountIcon} path`, {
  fill: colorVars.color.gray400,
});

export const saveCountText = style({
  ...fontStyle('caption_r_11'),
  color: colorVars.color.gray400,
});
