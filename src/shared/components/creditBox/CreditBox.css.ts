import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const boxWrapper = style({
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1.8rem',
  borderRadius: '6px',
  backgroundColor: colorVars.color.gray100,
  padding: '0rem 0.8rem 0rem 1.6rem',
  maxWidth: '100%',
  height: '4rem',
});

export const contentWrapper = style({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: '1.8rem',
  width: '100%',
});

export const textContainer = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: '0.8rem',
});

export const infoText = style({
  ...fontStyle('body_m_14'),
  color: colorVars.color.gray600,
});

export const creditText = style({
  ...fontStyle('title_sb_16'),
  transform: 'translateY(0.1rem)',
  color: colorVars.color.gray900,
});
