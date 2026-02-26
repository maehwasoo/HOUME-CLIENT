import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const smallButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  transition: 'all 0.2s ease',
  border: 'none',
  borderRadius: '99.9rem',
  backgroundColor: colorVars.color.gray999,
  cursor: 'pointer',
  padding: '0 2rem',
  height: '4.4rem',
  ...fontStyle('body_m_14'),
  color: colorVars.color.gray000,

  ':hover': {
    opacity: 0.8,
  },

  ':active': {
    transform: 'scale(0.98)',
  },
});
