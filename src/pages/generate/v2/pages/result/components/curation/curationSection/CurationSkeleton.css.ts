import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { animationTokens } from '@styles/tokens/animation.css';
import { colorVars } from '@styles/tokens/color.css';

// 스켈레톤 공통 shimmer 블록
const skeletonBlock = {
  backgroundColor: colorVars.color.gray100,
  borderRadius: '0.2rem',
  background: `linear-gradient(
    90deg,
    ${colorVars.color.gray100} 0%,
    ${colorVars.color.gray050} 50%,
    ${colorVars.color.gray100} 100%
  )`,
  backgroundSize: '200% 100%',
  animation: `${animationTokens.skeletonWave} 1.6s ease-in-out infinite`,
} as const;

// ─── 이미지 영역 ───
export const imgContainer = style({
  position: 'relative',
  flexShrink: 0,
  backgroundColor: colorVars.color.gray100,
  width: '100%',
  height: '26rem',
  overflow: 'hidden',
});

export const pageIndicator = style({
  position: 'absolute',
  top: '1.2rem',
  right: '1.2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.1rem',
  borderRadius: '999px',
  backgroundColor: colorVars.color.gray999_30,
  width: '3.4rem',
  height: '2rem',
  ...fontStyle('caption_r_11'),
  color: colorVars.color.gray000,
});

export const pagination = style({
  position: 'absolute',
  top: '50%',
  right: '0.6rem',
  left: '0.6rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transform: 'translateY(-50%)',
});

export const navBtn = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.6rem',
  height: '3.6rem',
});

export const navIconFrame = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '1.2rem',
  width: '2.4rem',
  height: '2.4rem',
});

export const navIconFrameLeft = style({
  backgroundColor: colorVars.color.gray999_04,
});

export const navIconFrameRight = style({
  backgroundColor: colorVars.color.gray999_30,
});

// ─── 큐레이션 리스트 영역 ───

export const listContainer = style({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  padding: '2rem 1.6rem 0',
  minHeight: 0,
  overflowX: 'hidden',
  overflowY: 'auto',

  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  scrollbarWidth: 'none',
});

export const titleSkeleton = style({
  ...skeletonBlock,
  width: '15.2rem',
  height: '1.6rem',
});

export const filterSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  marginTop: '0.8rem',
  padding: '0.8rem 0',
});

export const filterChipSkeleton = style({
  ...skeletonBlock,
  flexShrink: 0,
  borderRadius: '999px',
  width: '6.9rem',
  height: '3.6rem',
});

// ─── 상품 카드 그리드 ───

export const gridBox = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  justifyContent: 'space-between',
  justifyItems: 'start',
  rowGap: 0,
  columnGap: '1.1rem',
  marginTop: '0.8rem',
  paddingBottom: '2rem',
  width: '100%',
});

export const cardWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const cardImgSkeleton = style({
  ...skeletonBlock,
  aspectRatio: '1 / 1',
  borderRadius: '0.8rem',
  width: '100%',
});

export const cardInfoWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  padding: '0.6rem 0.2rem 2rem',
});

export const cardBrandSkeleton = style({
  ...skeletonBlock,
  width: '100%',
  height: '1.1rem',
});

export const cardNameSkeleton = style({
  ...skeletonBlock,
  width: '100%',
  height: '3.36rem',
});

export const cardPriceWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.3rem',
  width: '8.3rem',
});

export const cardOriginalPriceSkeleton = style({
  ...skeletonBlock,
  width: '100%',
  height: '1.1rem',
});

export const cardDiscountPriceSkeleton = style({
  ...skeletonBlock,
  width: '100%',
  height: '1.5rem',
});
