import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@/shared/styles/fontStyle';

import { colorVars } from '@styles/tokens/color.css';

export const linkButton = recipe({
  base: {
    height: '3rem',
    padding: '0.6rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    borderRadius: '999px',

    transition: 'all 0.2s ease-in-out',
    border: `1px solid ${colorVars.color.gray300}`,
    backgroundColor: colorVars.color.gray000,

    ':hover': {
      backgroundColor: colorVars.color.gray000,
    },
    ':active': {
      backgroundColor: colorVars.color.gray000,
    },
    ':visited': {
      color: colorVars.color.gray700,
    },
  },
  variants: {
    type: {
      withText: {
        width: '6.1rem',
        minWidth: '6.1rem',
        height: '2.6rem',
        padding: '0.4rem 0.6rem',
        gap: 0,
        flex: '0 0 6.1rem',
        ...fontStyle('caption_r_11'),
        lineHeight: '1.1rem',
        color: colorVars.color.gray700,
      },
      onlyIcon: {
        width: '3rem',
      },
    },
  },
  defaultVariants: {
    type: 'withText',
  },
});

export const linkContent = style({
  width: '4.9rem',
  height: '1.8rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0,
  flex: '0 0 4.9rem',
});

export const linkLabel = style({
  width: '3.3rem',
  height: '1.8rem',
  lineHeight: '1.1rem',
  textAlign: 'center',
  flex: '0 0 3.3rem',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
});

export const linkIconWrapper = style({
  width: '1.6rem',
  height: '1.6rem',
  flex: '0 0 1.6rem',
  padding: '0.1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

globalStyle(`${linkIconWrapper} svg`, {
  width: '1.4rem',
  height: '1.4rem',
});
