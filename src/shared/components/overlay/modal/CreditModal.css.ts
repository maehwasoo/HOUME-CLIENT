import { style, keyframes } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';
import { zIndex } from '@styles/tokens/zIndex';

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const backdrop = style({
  position: 'fixed',
  zIndex: zIndex.backdrop,
  inset: 0,
  background: 'rgba(0, 0, 0, 0.2)',
  animation: `${fadeIn} 0.45s cubic-bezier(0.22, 1, 0.36, 1)`,
});

export const container = style({
  position: 'fixed',
  zIndex: zIndex.modal,
  top: '50%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '3.2rem',
  transform: 'translate(-50%, -50%)',
  willChange: 'opacity',
  border: 0,
  borderRadius: '20px',
  backgroundColor: colorVars.color.gray000,
  padding: '3.2rem 0 1.6rem 0',
  width: '30rem',
  height: '42.6rem',
  animation: `${fadeIn} 0.45s cubic-bezier(0.22, 1, 0.36, 1)`,
});

export const info = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.6rem',
  width: '22.8rem',
  whiteSpace: 'pre-line', // 문자열에 개행(\n)이 있을 때만 줄바꿈함
});

export const title = style({
  textAlign: 'center',
  ...fontStyle('heading_sb_18'),
  color: colorVars.color.gray900,
  // wordBreak: 'keep-all', // 공백 또는 하이픈에서만 줄바꿈이 일어나도록 설정
});

export const creditBox = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  borderRadius: '6px',
  background: colorVars.color.gray100,
  padding: '0 1.6rem',
  minWidth: '11.5rem',
  height: '3.6rem',
});

export const label = style({
  ...fontStyle('body_m_14'),
  color: colorVars.color.gray600,
});

export const count = style({
  ...fontStyle('title_sb_16'),
  color: colorVars.color.primary,
});

export const creditImg = style({
  background: colorVars.color.gray100,
  width: '22.8rem',
  height: '12rem',
});

export const buttonBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.4rem',
  width: '18rem',
});

export const exitButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '4.8rem',
  height: '4.8rem',
});

export const exitButtonText = style({
  ...fontStyle('body_r_14'),
  color: colorVars.color.gray500,
});
