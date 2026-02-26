import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const captionChip = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '3px',
    backgroundColor: colorVars.color.primary_light2,
    ...fontStyle('caption_m_12'),
    padding: '0.2rem 0.6rem',
    color: colorVars.color.primary,
  },
  variants: {
    stroke: {
      true: {
        outline: '1px solid black',
        outlineOffset: '-1px',
      },
    },
  },
});
