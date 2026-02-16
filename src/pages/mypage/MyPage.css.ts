import { style } from '@vanilla-extract/css';

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minHeight: '100vh',
  alignItems: 'center',
  alignSelf: 'stretch',
});
