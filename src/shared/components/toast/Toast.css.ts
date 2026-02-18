import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@/shared/styles/fontStyle';
import { colorVars } from '@/shared/styles/tokens/color.css';

export const container = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '1rem 2rem',
    borderRadius: '30px',
    background: colorVars.color.gray900,
  },
  variants: {
    type: {
      navigate: {
        width: 'calc(100vw - 3.2rem)', // viewport minus horizontal 16px gutters
        maxWidth: '40.8rem', // 440px layout minus 32px gutters
        height: '4.4rem', // 44px
        justifyContent: 'space-between',
        gap: 0,
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
        color: colorVars.color.gray300,
        textAlign: 'center',
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
