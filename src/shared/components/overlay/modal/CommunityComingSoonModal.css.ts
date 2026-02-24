import { keyframes, style } from '@vanilla-extract/css';

import { fontStyle } from '@/shared/styles/fontStyle';
import { colorVars } from '@/shared/styles/tokens/color.css';
import { zIndex } from '@/shared/styles/tokens/zIndex';

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const backdrop = style({
  position: 'fixed',
  inset: 0,
  background: colorVars.color.gray999_20,
  zIndex: zIndex.backdrop,
  animation: `${fadeIn} 0.45s cubic-bezier(0.22, 1, 0.36, 1)`,
});

export const container = style({
  backgroundColor: colorVars.color.gray000,
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: zIndex.modal,
  width: '30rem',
  borderRadius: '20px',
  animation: `${fadeIn} 0.45s cubic-bezier(0.22, 1, 0.36, 1)`,
  willChange: 'opacity',
});

export const contentArea = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '3.2rem 1.4rem',
});

export const headingText = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '1.2rem',
});

export const title = style({
  ...fontStyle('title_sb_16'),
  color: colorVars.color.gray900,
});

export const body = style({
  ...fontStyle('body_r_14'),
  color: colorVars.color.gray700,
  whiteSpace: 'pre-line',
});

export const buttonArea = style({
  borderTop: `1px solid ${colorVars.color.gray200}`,
});

export const closeButton = style({
  width: '100%',
  height: '4.8rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...fontStyle('body_r_14'),
  color: colorVars.color.gray700,
});
