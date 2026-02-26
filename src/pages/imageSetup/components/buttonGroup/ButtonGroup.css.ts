import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const container = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  variants: {
    hasBorder: {
      true: {
        border: `1px solid ${colorVars.color.gray100}`,
        borderRadius: '8px',
        padding: '1rem',
      },
    },
  },
});

export const title = recipe({
  variants: {
    titleSize: {
      small: {
        marginBottom: '1rem',
        ...fontStyle('body_m_14'),
        textAlign: 'start',
        color: colorVars.color.gray700,
      },
      large: {
        marginBottom: '1.6rem',
        ...fontStyle('title_sb_16'),
        textAlign: 'start',
        color: colorVars.color.gray800,
      },
    },
  },
});

export const buttonGroupStyles = recipe({
  base: {
    display: 'grid',
    gap: '0.7rem',
  },
  variants: {
    layout: {
      'grid-2': {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      'grid-3': {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      'grid-4': {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
    },
  },
  defaultVariants: {
    layout: 'grid-2',
  },
});

export const errorContainer = style({
  marginTop: '4px',
});
