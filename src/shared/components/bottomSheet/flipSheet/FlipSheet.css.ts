import { styleVariants } from '@vanilla-extract/css';
import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const imageArea = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2rem',
  pointerEvents: 'none', // 드래그 중 이미지 영역 클릭 방지
});

export const infoText = style({
  ...fontStyle('heading_sb_18'),
  color: colorVars.color.gray900,
});

export const imageContainer = style({
  borderRadius: '16px',
  width: '22rem',
  height: '33rem',
  overflow: 'hidden',
});

export const imageVariants = styleVariants({
  normal: {
    transform: 'none',
    transition: 'transform 0.3s ease-in-out',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    userSelect: 'none',
  },
  flipped: {
    transform: 'scaleX(-1)',
    transition: 'transform 0.3s ease-in-out',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    userSelect: 'none',
  },
});

export const buttonGroup = style({
  display: 'flex',
  gap: '1.2rem',
  marginTop: '3.2rem',
  pointerEvents: 'auto', // 버튼 클릭 가능
});
