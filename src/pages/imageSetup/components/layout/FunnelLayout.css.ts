import { style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const wrapper = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
});

export const content = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
});

// 이탈 방지 팝업 콘텐츠 영역
export const popupContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const popupTitle = style({
  ...fontVars.font.title_sb_16,
  marginBottom: unitVars.unit.gapPadding['200'],
  textAlign: 'center',
  color: colorVars.color.text.primary,
});

export const popupDetail = style({
  ...fontVars.font.body_r_14,
  textAlign: 'center',
  color: colorVars.color.text.secondary,
});
