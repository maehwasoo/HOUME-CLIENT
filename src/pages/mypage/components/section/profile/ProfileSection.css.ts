import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';

export const container = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 2rem',
  width: '100%',
  maxWidth: '100%',
  height: '6.4rem',
});

export const profileBox = style({
  display: 'flex',
  flex: '0 1 auto',
  alignItems: 'center',
  gap: '1.6rem',
});

export const profileImage = style({
  flexShrink: 0,
  borderRadius: '50%',
  width: '4.8rem',
  height: '4.8rem',
});

export const userName = style({
  ...fontStyle('heading_sb_18'),
  flex: '0 0 auto',
  whiteSpace: 'nowrap',
});
