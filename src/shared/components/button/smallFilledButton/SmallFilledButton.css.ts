import { style, styleVariants } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const smallButtonBase = style({
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease-in-out',
  borderRadius: '6px',
  padding: '1rem 1.6rem',
  width: '100%',
  height: '3.6rem',
  textAlign: 'center',
  whiteSpace: 'nowrap',
});

export const smallButtonVariants = styleVariants({
  on: {
    border: `1px solid ${colorVars.color.primary}`,
    backgroundColor: colorVars.color.primary_light2,
    color: colorVars.color.primary,
    ...fontStyle('caption_m_12'),
  },
  off: {
    border: `1px solid ${colorVars.color.primary_light2}`,
    backgroundColor: colorVars.color.gray000,
    color: colorVars.color.gray500,
    ...fontStyle('caption_r_12'),
  },
});
