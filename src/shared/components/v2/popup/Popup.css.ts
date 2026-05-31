import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colorVars } from '@styles/tokensV2/color.css';

import { zIndex } from '@/shared/styles/tokens/zIndex';
import { fontVars } from '@/shared/styles/tokensV2/font.css';
import { unitVars } from '@/shared/styles/tokensV2/unit.css';

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const backdrop = style({
  position: 'fixed',
  zIndex: zIndex.popup,
  inset: 0,
  background: 'rgba(0, 0, 0, 0.2)',
  animation: `${fadeIn} 0.45s cubic-bezier(0.22, 1, 0.36, 1)`,
});

export const container = style({
  position: 'fixed',
  zIndex: zIndex.popup + 1,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  willChange: 'opacity',
  borderRadius: unitVars.unit.radius['700'],
  backgroundColor: colorVars.color.gray000,
  width: '28.8rem',
  animation: `${fadeIn} 0.45s cubic-bezier(0.22, 1, 0.36, 1)`,
});

export const closeButton = style({
  position: 'absolute',
  zIndex: zIndex.sticky,
  top: '1.2rem',
  right: '1.2rem',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const contentArea = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  variants: {
    btnStyle: {
      text: {
        padding: unitVars.unit.gapPadding['700'],
      },
      solid: {
        padding: `${unitVars.unit.gapPadding['600']} ${unitVars.unit.gapPadding['600']} ${unitVars.unit.gapPadding['200']} ${unitVars.unit.gapPadding['600']}`,
      },
    },
  },
  defaultVariants: {
    btnStyle: 'solid',
  },
});

export const slotBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: unitVars.unit.gapPadding['400'],
  minHeight: '7.2rem',
  textAlign: 'center',
});

export const body = style({
  width: '100%',
  textAlign: 'center',
});

export const buttonArea = recipe({
  base: {
    display: 'flex',
  },
  variants: {
    btnStyle: {
      text: {
        borderTop: '0.1rem solid ' + colorVars.color.border.tertiary,
        width: '100%',
        height: '5.2rem',
      },
      solid: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '0.8rem',
        padding: `${unitVars.unit.gapPadding['200']} ${unitVars.unit.gapPadding['400']} ${unitVars.unit.gapPadding['400']} ${unitVars.unit.gapPadding['400']}`,
      },
    },
  },
  defaultVariants: {
    btnStyle: 'solid',
  },
});

export const textButton = recipe({
  base: {
    display: 'flex',
    flex: '1 1 0',
    alignItems: 'center',
    justifyContent: 'center',
    border: 0,
    background: 'transparent',
    cursor: 'pointer',
    padding: '1.2rem 0',
  },
  variants: {
    role: {
      weak: {
        ...fontVars.font.body_r_14,
        color: colorVars.color.text.tertiary,
        selectors: {
          '&:not(:only-child)': {
            borderRight: '1px solid ' + colorVars.color.border.tertiary,
          },
        },
      },
      strong: {
        ...fontVars.font.body_m_14,
        color: colorVars.color.text.primary,
      },
    },
    layout: {
      single: {
        flex: '1 1 auto',
        width: '100%',
      },
      paired: {},
    },
  },
  defaultVariants: {
    role: 'strong',
    layout: 'paired',
  },
});
