import { style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokens/color.css';
import { zIndex } from '@styles/tokens/zIndex';

export const page = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: colorVars.color.bg_grad,
  width: '100%',
});

export const gradFrame = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background:
    'linear-gradient(180deg, #A696FF -15.93%, #DDD6FF 13.05%, #FFF 47.05%, #FFF 100%)',
  width: '100%',
  height: '55.65rem',
});

export const introSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1.6rem 2rem 0 2rem',
  width: '100%',
});

export const contents = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: colorVars.color.gray000,
  width: '100%',
});

export const buttonContainer = style({
  position: 'fixed',
  zIndex: zIndex.button,
  bottom: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '4rem',
  padding: '0rem 2rem 2rem 2rem',
  width: '100%',
  maxWidth: '44rem',
});
