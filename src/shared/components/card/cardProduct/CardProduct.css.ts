import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@/shared/styles/fontStyle';
import { animationTokens } from '@/shared/styles/tokens/animation.css';
import { colorVars } from '@/shared/styles/tokens/color.css';
import { zIndex } from '@/shared/styles/tokens/zIndex';

export const wrapper = recipe({
  base: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
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
    position: 'relative', // 내부 absolute(링크 버튼)의 기준
    overflow: 'hidden', // 모서리 밖으로 이미지 안 튀어나오게
    border: `1px solid ${colorVars.color.gray200}`,
    width: '100%',
    aspectRatio: '1 / 1', // 이미지 영역만 정사각형
    background: 'transparent',
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
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    display: 'block',
    boxSizing: 'border-box',
    transition: 'opacity 0.3s ease-in-out',
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
  background: `linear-gradient(
    90deg,
    ${colorVars.color.gray200} 8%,
    ${colorVars.color.gray100} 18%,
    ${colorVars.color.gray200} 33%
  )`,
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
      large: { left: '0.6rem', bottom: '0.6rem' },
      small: { left: '0.8rem', bottom: '0.8rem' },
    },
  },
});

export const saveBtnOverlay = style({
  position: 'absolute',
  top: '0.6rem',
  right: '0.6rem',
  zIndex: zIndex.button,
});

export const bottomSection = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.6rem 0 2rem 0',
  width: '100%',
  gap: '0.4rem',
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  minWidth: '8rem',
  padding: '0.2rem',
  width: '100%',
  flex: '1 1 auto', // 남은 공간 텍스트가 차기
});

export const saveBtnContainer = style({
  flex: '0 0 auto', // 하트 아이콘 찌그러짐 방지
});

export const productText = style({
  ...fontStyle('body_r_13'),
  color: colorVars.color.gray999,
  maxHeight: '3.6rem',

  display: '-webkit-box',
  WebkitLineClamp: 2, // 최대 2줄
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export const brandText = style({
  ...fontStyle('caption_r_11'),
  color: colorVars.color.gray700,
});

export const infoSection = style({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '1.2rem',
  paddingBottom: '2rem',
  gap: '0.8rem',
});

export const colorRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
});

export const colorChip = style({
  width: '1.4rem',
  height: '1.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '0 0 1.4rem',
});

export const colorChipInner = style({
  width: '1.2rem',
  height: '1.2rem',
  borderRadius: '50%',
  border: `0.5px solid ${colorVars.color.gray999_30}`,
  boxSizing: 'border-box',
});

export const colorChipCount = style({
  ...fontStyle('caption_r_11'),
  color: colorVars.color.gray500,
});

export const productInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const brandTextLarge = style({
  ...fontStyle('caption_r_11'),
  color: colorVars.color.gray500,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const productTextLarge = style({
  ...fontStyle('body_r_13'),
  color: colorVars.color.gray900,
  maxHeight: '3.6rem',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export const priceSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const originalPriceText = style({
  ...fontStyle('caption_r_11'),
  color: colorVars.color.gray500,
});

export const discountRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
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
  width: '1.4rem',
  height: '1.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
