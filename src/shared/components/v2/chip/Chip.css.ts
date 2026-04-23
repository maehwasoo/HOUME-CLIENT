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
    gap: unitVars.unit.gapPadding['050'],
    transition:
      'transform 120ms ease, background-color 120ms ease, color 120ms ease, border-color 120ms ease',
    borderWidth: '1px',
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
    color: {
      strong: {},
      weak: {},
    },
    disabled: {
      true: {
        borderColor: colorVars.color.border.tertiary,
        cursor: 'default',
        selectors: {
          '&:active': {
            transform: 'none',
          },
        },
      },
    },
  },
  compoundVariants: [
    {
      variants: { color: 'weak', selected: true },
      style: {
        borderColor: 'transparent',
        backgroundColor: colorVars.color.fill.weak,
        color: colorVars.color.text.primary,
      },
    },
  ],
});

export const label = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: unitVars.unit.gapPadding['300'],
    whiteSpace: 'nowrap',
  },
  variants: {
    selected: {
      false: {
        color: colorVars.color.text.tertiary,
        ...fontVars.font.body_r_13,
      },
      true: {
        color: colorVars.color.text.inverse,
        ...fontVars.font.body_m_13,
      },
    },
    disabled: {
      true: {
        color: colorVars.color.text.disabled,
      },
    },
    color: {
      strong: {},
      weak: {},
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
  compoundVariants: [
    {
      variants: { color: 'weak', selected: true },
      style: {
        color: colorVars.color.text.primary,
      },
    },
  ],
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

export const suffixButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 100ms ease',
  paddingTop: unitVars.unit.gapPadding['200'],
  paddingRight: unitVars.unit.gapPadding['300'],
  paddingBottom: unitVars.unit.gapPadding['200'],
  paddingLeft: unitVars.unit.gapPadding['000'],
  color: 'inherit',
  selectors: {
    '&:active': {
      transform: 'scale(0.9)',
    },
  },
});
