import { keyframes, style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const page = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  padding: `${unitVars.unit.gapPadding['300']} ${unitVars.unit.gapPadding['000']}`,
  width: '100%',
  minHeight: '100vh',
  overflow: 'hidden',
});

export const backgroundImage = style({
  position: 'absolute',
  inset: 0,
  objectFit: 'cover',
  width: '100%',
  height: '100%',
});

const dissolveFadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const backgroundImagePrevious = style({
  zIndex: 0,
});

export const backgroundImageCurrent = style({
  zIndex: 1,
  animation: `${dissolveFadeIn} 300ms ease`,
});

export const mainSection = style({
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  flex: '1 0 0',
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: unitVars.unit.gapPadding['000'],
  padding: `${unitVars.unit.gapPadding['400']} ${unitVars.unit.gapPadding['500']}`,
});

export const contentBlock = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: unitVars.unit.gapPadding['700'],
  padding: `${unitVars.unit.gapPadding['900']} ${unitVars.unit.gapPadding['000']}`,
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'stretch',
  justifyContent: 'center',
  gap: unitVars.unit.gapPadding['300'],
  padding: `${unitVars.unit.gapPadding['000']}`,
});

export const title = style({
  ...fontVars.font.title_sb_24,
  textAlign: 'center',
  color: colorVars.color.text.inverse,
});

export const text = style({
  ...fontVars.font.body_r_14,
  textAlign: 'center',
  color: colorVars.color.text.inverseSecondary,
});
