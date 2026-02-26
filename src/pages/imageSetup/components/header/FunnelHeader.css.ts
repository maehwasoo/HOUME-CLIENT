import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@styles/fontStyle';
import { animationTokens } from '@styles/tokens/animation.css';
import { colorVars } from '@styles/tokens/color.css';
import { zIndex } from '@styles/tokens/zIndex';

export const wrapper = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '2rem',
    width: '100%',
    animation: animationTokens.fadeInUpFast,
  },
  variants: {
    size: {
      short: {
        minHeight: '13.5rem',
      },
      long: {
        minHeight: '15.6rem',
      },
    },
  },
});

export const container = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const headerWapper = style({
  position: 'relative',
  zIndex: zIndex.text,
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  paddingTop: '1.2rem', // 텍스트 영역이 필요한 만큼만 차지
  minWidth: 0, // 텍스트가 넘치지 않도록
});

export const imgWrapper = style({
  position: 'relative',
  zIndex: zIndex.base,
  display: 'flex',
  flexGrow: 0,
  flexShrink: 0,
  width: '14.4rem',
});

export const progressWrapper = style({
  position: 'relative',
  zIndex: zIndex.text,
  marginBottom: '2.4rem',
});

export const textWrapper = style({
  position: 'relative',
  zIndex: zIndex.text,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  paddingRight: '1rem',
});

export const title = style({
  ...fontStyle('heading_sb_20'),
  whiteSpace: 'nowrap',
  color: colorVars.color.gray900,
});

export const detail = style({
  ...fontStyle('body_r_14'),
  whiteSpace: 'pre',
  color: colorVars.color.gray600, // 문자열에 개행(\n)이 있을 때만 줄바꿈함
});

export const image = style({
  objectFit: 'contain',
  width: '100%',
  maxWidth: '14.4rem',
  height: 'auto',
});
