import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  borderRadius: '16px',
  backgroundColor: colorVars.color.gray000,
  width: '100%',
  minWidth: '33.5rem',
  overflow: 'hidden',
});

export const imgbox = style({
  aspectRatio: '3/2',
  objectFit: 'cover',
  objectPosition: 'center',
  width: '100%',
  minWidth: '33.5rem', // 비율 유지하며 영역 완전히 채움
  overflow: 'hidden', // 이미지 중앙 부분 표시
});

export const image = style({
  boxSizing: 'border-box',
  display: 'block',
  objectFit: 'cover',
  objectPosition: 'center',
  width: '100%',
  height: '100%',
});

export const textbox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '2.4rem',
  width: '100%',
});

export const title = style({
  ...fontStyle('title_m_16'),
  paddingRight: '0.4rem',
  paddingLeft: '0.4rem',
});
