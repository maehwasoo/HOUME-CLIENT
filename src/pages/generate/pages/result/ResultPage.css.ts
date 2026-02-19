import { style } from '@vanilla-extract/css';

import { layoutVars } from '@styles/global.css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: `calc(100dvh - ${layoutVars.titleNavBarHeight})`, // TitleNavBar height
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
