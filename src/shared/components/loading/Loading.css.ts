import { style } from '@vanilla-extract/css';
export const loadingOverlay = style({
  boxSizing: 'border-box',
  position: 'fixed',
  zIndex: 9999,
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

export const loadingInline = style({
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2.4rem 1.6rem',
  width: '100%',
});

export const loadingContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});
