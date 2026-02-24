import { style } from '@vanilla-extract/css';

import { zIndex } from '@styles/tokens/zIndex';

export const container = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

export const buttonWrapper = style({
  zIndex: zIndex.button,
  bottom: '2rem',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});
