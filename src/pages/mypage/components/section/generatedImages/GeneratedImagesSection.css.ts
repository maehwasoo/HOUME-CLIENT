import { style } from '@vanilla-extract/css';

export const container = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '1rem',
  padding: '2rem 2rem 4rem 2rem',
  width: '100%',
});

export const gridContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  rowGap: '1.6rem',
  columnGap: '0.7rem',
  width: '100%',
});
