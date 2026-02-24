import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const container = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1.5rem',
    borderRadius: '30px',
    background: colorVars.color.gray900,
    padding: '1rem 2rem',
  },
  variants: {
    type: {
      navigate: {
        justifyContent: 'space-between',
        gap: 0,
        width: 'calc(100vw - 3.2rem)',
        maxWidth: '40.8rem',
        height: '4.4rem',
      },
    },
  },
});

export const text = recipe({
  base: {
    ...fontStyle('body_m_14'),
    color: colorVars.color.gray000,
  },
  variants: {
    type: {
      navigate: {
        ...fontStyle('body_r_14'),
        textAlign: 'center',
        color: colorVars.color.gray300,
      },
    },
  },
});

export const action = style({
  ...fontStyle('body_m_14'),
  flexShrink: 0,
  textDecoration: 'underline',
  color: colorVars.color.gray000,
});
