import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { zIndex } from '@styles/tokens/zIndex';
import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const menuTabBar = style({
  position: 'sticky',
  zIndex: zIndex.sticky,
  top: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  background: colorVars.color.fill.inverse,
  padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['500']}`,
  width: '100%',
  height: '4.2rem',
});

export const tabButton = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['100']}`,
    borderBottom: '0.2rem solid transparent',
    padding: unitVars.unit.gapPadding['200'],
    height: '100%',
    ...fontVars.font.title_sb_16,
  },
  variants: {
    state: {
      active: {
        borderBottomColor: colorVars.color.fill.primary,
        color: colorVars.color.text.primary,
      },
      inactive: {
        borderBottomColor: colorVars.color.fill.inverse,
        color: colorVars.color.text.tertiary,
      },
    },
  },
  defaultVariants: {
    state: 'inactive',
  },
});

export const tabButtonText = style({
  height: '100%',
  whiteSpace: 'nowrap',
});
