import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { layoutVars } from '@styles/global.css';
import { colorVars } from '@styles/tokens/color.css';
import { zIndex } from '@styles/tokens/zIndex';

export const container = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: colorVars.color.gray000,
  width: '100%',
  height: layoutVars.titleNavBarHeight,
  textAlign: 'center',
  color: colorVars.color.gray900,
});

export const leftdiv = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.2rem',
  width: '4.8rem',
  height: layoutVars.titleNavBarHeight,
});

export const backicon = style({
  cursor: 'pointer',
});

export const title = style({
  position: 'absolute',
  zIndex: zIndex.base,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  margin: 0,
  pointerEvents: 'none',
  width: 'max-content',
  ...fontStyle('title_m_16'),
});

export const rightdiv = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.2rem 1.6rem',
  height: layoutVars.titleNavBarHeight,
  ...fontStyle('body_r_14'),
});
