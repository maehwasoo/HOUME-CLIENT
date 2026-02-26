import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';
import { zIndex } from '@styles/tokens/zIndex';

export const backdrop = style({
  position: 'fixed',
  zIndex: zIndex.backdrop,
  inset: 0,
  background: 'rgba(0, 0, 0, 0.08)',
});

export const container = style({
  position: 'fixed',
  zIndex: zIndex.popup,
  top: '50%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  transform: 'translate(-50%, -50%)',
  border: 0,
  borderRadius: '20px',
  background: colorVars.color.gray000,
  width: '30rem',
});

export const info = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.2rem',
  padding: '3.2rem 1.4rem',
  textAlign: 'center',
  whiteSpace: 'pre-line',
});

export const title = style({
  ...fontStyle('heading_sb_18'),
  color: colorVars.color.gray900,
});

export const detail = style({
  ...fontStyle('body_r_14'),
  color: colorVars.color.gray700,
});

export const buttonBox = style({
  display: 'flex',
  borderTop: `1px solid ${colorVars.color.gray200}`,
  textAlign: 'center',
});

export const exit = style({
  flex: 1,
  borderRight: `1px solid ${colorVars.color.gray200}`,
  ...fontStyle('body_r_14'),
  padding: '1.2rem 0',
  color: colorVars.color.gray700,
});

export const cancel = style({
  flex: 1,
  padding: '1.2rem 0',
  ...fontStyle('body_m_14'),
  color: colorVars.color.primary,
});
