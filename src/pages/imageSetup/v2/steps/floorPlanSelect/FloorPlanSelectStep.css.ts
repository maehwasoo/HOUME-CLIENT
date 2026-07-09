import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  width: '100%',
  minHeight: 0,
  overflow: 'hidden',
});
