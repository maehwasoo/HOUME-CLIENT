import { style } from '@vanilla-extract/css';

import { zIndex } from '@styles/tokens/zIndex';

export const container = style({
  position: 'relative',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '9.6rem',
  width: '100%',
});

export const buttonWrapper = style({
  position: 'fixed',
  zIndex: zIndex.button,
  right: 0,
  bottom: '2rem', // CtaButton 최대 너비 설정
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  margin: '0 auto',
  padding: '0 2rem 0 2rem',
  width: '100%',
  maxWidth: '44rem',
});
