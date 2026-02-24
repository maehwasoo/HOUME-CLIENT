import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@styles/fontStyle';
import { layoutVars } from '@styles/global.css';
import { animationTokens } from '@styles/tokens/animation.css';
import { colorVars } from '@styles/tokens/color.css';

export const pageLayout = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
});

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: `calc(100dvh - ${layoutVars.titleNavBarHeight})`,
  overflow: 'hidden',
});

export const resultSection = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  minHeight: 0,
  overflow: 'hidden',
});

export const curationSheetVisible = style({
  display: 'contents',
});

export const curationSheetHidden = style({
  display: 'none',
});

export const imgArea = recipe({
  base: {
    aspectRatio: '3 / 2',
    objectFit: 'cover',
    objectPosition: 'center',
    width: '100%',
    animation: animationTokens.fadeInUpFast,
  },
  variants: {
    mirrored: {
      true: {
        transform: 'scaleX(-1)',
      },
      false: {
        transform: 'none',
      },
    },
  },
  defaultVariants: {
    mirrored: false,
  },
});

export const buttonSection = style({
  padding: '2rem',
  width: '100%',
});

export const buttonSectionDisabled = style({
  opacity: 0.3,
  pointerEvents: 'none',
});

export const buttonBox = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '1rem',
  borderRadius: '1.2rem',
  backgroundColor: colorVars.color.gray100,
  padding: '1.6rem clamp(1.6rem, 4vw, 4rem)',
  width: '100%',
  height: '100%',
});

export const boxText = style({
  ...fontStyle('body_m_14'),
  color: colorVars.color.gray900,
});

export const buttonGroup = style({
  display: 'flex',
  gap: '0.6rem',
});

export const tagGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const tagFlexItem = style({
  display: 'flex',
  gap: '0.6rem',
});

export const tagButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '99.9rem',
  backgroundColor: colorVars.color.gray000,
  cursor: 'pointer',
  ...fontStyle('body_r_14'),
  padding: '0 1.6rem',
  height: '3.6rem',
  color: colorVars.color.gray700,

  ':active': {
    backgroundColor: colorVars.color.gray300,
  },
});

export const tagButtonSelected = style({
  backgroundColor: colorVars.color.gray000,
  color: colorVars.color.primary,
});
