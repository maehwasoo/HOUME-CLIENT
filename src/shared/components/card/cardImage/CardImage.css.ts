import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';
const shimmer = keyframes({
  '0%': { transform: 'translateX(-100%)' },
  '100%': { transform: 'translateX(100%)' },
});

export const cardcontainer = recipe({
  base: {
    boxSizing: 'border-box',
    position: 'relative',
    outline: 'none',
    borderRadius: '1.6rem',
    cursor: 'pointer',
    width: '100%',
    minWidth: '16rem',
    maxWidth: '19.4rem',
    overflow: 'hidden',
    selectors: {
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        transition: 'background-color 0.3s ease',
        borderRadius: '16px',
        backgroundColor: 'transparent',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        content: '',
      },
    },
  },
  variants: {
    state: {
      default: { backgroundColor: colorVars.color.gray100 },
      pressed: {
        outline: 'none',
        selectors: {
          '&::after': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
        },
      },
      selected: {
        outline: `1.5px solid ${colorVars.color.primary}`,
        outlineOffset: '-1.5px',
        selectors: {
          '&::after': {
            backgroundColor: 'transparent',
          },
        },
      },
      disabled: {
        outline: 'none',
        cursor: 'not-allowed',
        selectors: {
          '&::after': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

export const cardimg = style({
  boxSizing: 'border-box',
  display: 'block',
  objectFit: 'cover',
  objectPosition: 'center',
  width: '100%',
  height: '100%',
});

export const disabledcardimg = style([
  cardimg,
  {
    opacity: 0.15,
  },
]);

export const checkbox = recipe({
  base: {
    position: 'absolute',
    zIndex: 1,
    top: '1rem',
    right: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition:
      'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, color 0.2s ease',
    borderRadius: '9999px',
    width: '2rem',
    ...fontStyle('body_m_14'),
    height: '2rem',
  },
  variants: {
    state: {
      default: {
        border: 'none',
        backgroundColor: colorVars.color.gray000,
        color: 'transparent',
      },
      pressed: {
        border: 'none',
        backgroundColor: colorVars.color.gray000,
        color: 'transparent',
      },
      selected: {
        border: 'none',
        backgroundColor: colorVars.color.primary,
        width: '2.4rem',
        height: '2.4rem',
        color: colorVars.color.gray000,
      },
      disabled: {
        display: 'none',
      },
    },
  },
});

export const skeletonCardImg = style({
  position: 'relative',
  borderRadius: '12px',
  backgroundColor: colorVars.color.gray100,
  width: '100%',
  height: '100%',
  overflow: 'hidden',

  selectors: {
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      background:
        'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      width: '60%',
      height: '100%',
      animation: `${shimmer} 1s infinite`,
      content: '""',
    },
  },
});
