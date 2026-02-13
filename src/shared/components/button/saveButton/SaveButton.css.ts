import { globalStyle, style } from '@vanilla-extract/css';

import { colorVars } from '@/shared/styles/tokens/color.css';

export const buttonWrapper = style({
  width: '2.8rem',
  height: '2.8rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  padding: 0,
  margin: 0,
});

export const selected = style({});

export const unselected = style({});

globalStyle(`${buttonWrapper} svg`, {
  width: '2.4rem',
  height: '2.4rem',
});

globalStyle(`${selected} svg path`, {
  fill: colorVars.color.primary,
  stroke: 'none',
});

globalStyle(`${unselected} svg path`, {
  fill: 'rgba(0, 0, 0, 0.2)',
  stroke: colorVars.color.gray000,
  strokeWidth: 1,
});
