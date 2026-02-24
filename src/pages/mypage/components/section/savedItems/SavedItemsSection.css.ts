import { style } from '@vanilla-extract/css';

export const container = style({
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '2rem',
  padding: '0 2rem',
  width: '100%',
});

export const gridContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  rowGap: '0',
  columnGap: '0.55rem',
  width: '100%',
});
