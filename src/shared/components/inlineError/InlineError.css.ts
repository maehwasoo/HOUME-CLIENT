import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const container = style({
  width: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: '4.5rem',
  gap: '0.8rem',
  textAlign: 'center',
});

export const message = style({
  ...fontStyle('body_m_14'),
  color: colorVars.color.gray600,
});

export const retryButton = style({
  marginTop: '0.4rem',
  padding: '0.8rem 1.6rem',
  borderRadius: '999px',
  border: '1px solid',
  borderColor: colorVars.color.gray300,
  backgroundColor: colorVars.color.gray000,
  ...fontStyle('caption_m_12'),
  color: colorVars.color.gray600,
  cursor: 'pointer',
});
