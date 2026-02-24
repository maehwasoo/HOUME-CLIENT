import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const cardReview = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: '1.6rem',
  borderRadius: '16px',
  background: colorVars.color.gray000,
  padding: '3.2rem',
  width: '100%',
  minWidth: '31.5rem',
});

//제목 텍스트
export const title = style({
  display: 'block',
  ...fontStyle('title_sb_15'),
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: colorVars.color.primary,
});

// 본문 내용 텍스트
export const body = style({
  ...fontStyle('body_r_14'),
  alignSelf: 'stretch',
  overflowWrap: 'break-word', // 단어 단위 줄바꿈(한글)
  wordBreak: 'keep-all', // 너무 긴 단어 강제 줄바꿈
  color: colorVars.color.gray700,
});

// 사용자 이름 텍스트
export const username = style({
  ...fontStyle('body_r_14'),
  alignSelf: 'stretch',
  textAlign: 'right',
  color: colorVars.color.gray500,
});
