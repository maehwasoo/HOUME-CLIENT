import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const chip = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition:
      'transform 100ms ease, background-color 100ms ease, color 100ms ease',
    borderWidth: '0.1rem',
    borderStyle: 'solid',
    borderRadius: unitVars.unit.gapPadding.full,
    background: 'transparent',
    height: '3.4rem',
    selectors: {
      '&:active': {
        transform: 'scale(0.9)',
      },
    },
  },
  variants: {
    selected: {
      false: {
        borderColor: colorVars.color.border.primary,
        backgroundColor: colorVars.color.fill.inverse,
        color: colorVars.color.text.tertiary,
      },
      true: {
        borderColor: colorVars.color.fill.strong,
        backgroundColor: colorVars.color.fill.strong,
        color: colorVars.color.text.inverse,
      },
    },
  },
});

export const content = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: unitVars.unit.gapPadding['050'],
});

export const label = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: unitVars.unit.gapPadding['300'],
    whiteSpace: 'nowrap',
    ...fontVars.font.body_r_13,
  },
  variants: {
    selected: {
      false: {
        color: colorVars.color.text.tertiary,
      },
      true: {
        color: colorVars.color.text.inverse,
      },
    },
    hasSuffix: {
      false: {
        paddingRight: unitVars.unit.gapPadding['300'],
      },
      true: {
        paddingRight: unitVars.unit.gapPadding['000'],
      },
    },
  },
});

export const suffix = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: unitVars.unit.gapPadding['200'],
  paddingRight: unitVars.unit.gapPadding['300'],
  paddingBottom: unitVars.unit.gapPadding['200'],
  paddingLeft: unitVars.unit.gapPadding['000'],
});

export const suffixIcon = style({
  flexShrink: 0,
  width: '1.2rem',
  height: '1.2rem',
});
