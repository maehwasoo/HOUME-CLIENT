import { style } from '@vanilla-extract/css';

import ImgLanding01 from '@assets/images/ImgLanding_01.png';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: `url(${ImgLanding01}) center / cover no-repeat`,
  padding: `${unitVars.unit.gapPadding['300']} ${unitVars.unit.gapPadding['000']}`,
  width: '100%',
  minHeight: '100vh',
});

export const mainSection = style({
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
