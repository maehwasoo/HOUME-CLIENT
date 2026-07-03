import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { pressTransformInteraction } from '@styles/tokensV2/interaction/presets';

import { colorVars } from '@/shared/styles/tokensV2/color.css';
import { fontVars } from '@/shared/styles/tokensV2/font.css';
import { unitVars } from '@/shared/styles/tokensV2/unit.css';

export const wrapper = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: unitVars.unit.gapPadding['200'],
    transformOrigin: 'center center',
    transition: pressTransformInteraction,
    borderRadius: unitVars.unit.radius.full,
    backgroundColor: colorVars.color.fill.weak,
    padding: unitVars.unit.gapPadding['200'],
    width: '100%',
    height: '4.4rem',
  },
  variants: {
    state: {
      default: {},
      pressed: { transform: 'scale(0.97)' },
      focused: {},
      typing: {},
      typed: {},
    },
  },
});

export const leftContainer = style({
  display: 'flex',
  flex: 1,
  gap: unitVars.unit.gapPadding['200'],
  paddingInline: unitVars.unit.gapPadding['200'],
  width: '100%',
});

export const rightContainer = style({
  display: 'flex',
  flexShrink: 0,
  justifyContent: 'flex-end',
});

export const textField = recipe({
  base: {
    outline: 'none',
    backgroundColor: colorVars.color.fill.weak,
    width: '100%',
    ...fontVars.font.body_r_14,
    caretColor: colorVars.color.fill.primary,

    selectors: {
      '&::placeholder': {
        color: colorVars.color.text.tertiary,
      },
    },
  },
  variants: {
    state: {
      default: {},
      pressed: {},
      focused: {},
      typing: {
        color: colorVars.color.text.primary,
      },
      typed: {
        color: colorVars.color.text.primary,
      },
    },
  },
  defaultVariants: {
    state: 'default',
  },
});
