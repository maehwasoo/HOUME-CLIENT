import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const infoTextContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  marginBottom: '3.2rem',
  pointerEvents: 'auto',
  width: '100%',
});

export const infoText = style({
  ...fontStyle('heading_sb_18'),
  color: colorVars.color.gray900,
});

export const descriptionText = style({
  ...fontStyle('body_r_14'),
  color: colorVars.color.gray600,
});

export const fieldWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.2rem',
  marginBottom: '4.8rem',
  pointerEvents: 'auto',
  width: '100%',
});

export const fieldContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  width: '100%',
});

export const title = style({
  ...fontStyle('title_sb_15'),
  minWidth: '5.6rem',
  color: colorVars.color.gray800,
});

export const buttonContainer = style({
  display: 'flex',
  justifyContent: 'center',
  pointerEvents: 'auto',
  width: '100%',
});
