import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const stepsWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const step = style({
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  width: '19.4rem',
  height: '2rem',
});

export const icon = recipe({
  base: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
  variants: {
    variant: {
      active: {
        opacity: 1,
      },
      inactive: {
        opacity: 0.3,
      },
    },
  },
  defaultVariants: {
    variant: 'inactive',
  },
});
