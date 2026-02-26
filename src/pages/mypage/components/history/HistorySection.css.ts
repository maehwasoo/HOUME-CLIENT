import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.6rem',
  backgroundColor: colorVars.color.gray100,
  padding: '2.4rem 2rem',
  width: '100%',
});

export const title = style({
  ...fontStyle('title_sb_16'),
  alignSelf: 'flex-start',
  color: colorVars.color.gray800,
});
