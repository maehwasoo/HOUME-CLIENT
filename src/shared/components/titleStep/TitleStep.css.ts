import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1.2rem',
  padding: '0 2rem',
  width: '100%',
});

export const stepLabelBox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  backgroundColor: colorVars.color.primary_light2,
  width: '5.6rem',
  height: '2.8rem',
});

export const stepLabel = style({
  ...fontStyle('caption_m_12'),
  whiteSpace: 'nowrap',
  color: colorVars.color.primary,
});

export const title = style({
  ...fontStyle('heading_sb_18'),
  alignSelf: 'stretch',
  color: colorVars.color.gray900,
});
