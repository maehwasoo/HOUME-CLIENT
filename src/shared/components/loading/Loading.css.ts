import { style, keyframes } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const loadingOverlay = style({
  boxSizing: 'border-box',
  position: 'fixed',
  zIndex: 9999,
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(4px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
  gap: '1.6rem',
});

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const loadingSpinner = style({
  border: `3px solid ${colorVars.color.primary_light2}`,
  borderTop: `3px solid ${colorVars.color.primary}`,
  borderRadius: '50%',
  width: '4rem',
  height: '4rem',
  animation: `${spin} 1s linear infinite`,
});

export const loadingText = style({
  textAlign: 'center',
  ...fontStyle('body_m_14'),
  color: colorVars.color.primary,
});
