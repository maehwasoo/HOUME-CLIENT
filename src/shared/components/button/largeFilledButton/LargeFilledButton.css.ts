import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

export const largeFilled = recipe({
  base: {
    alignItems: 'center',
    transition: 'all 0.2s ease-in-out',
    border: 'none',
    borderRadius: '8px',
    padding: '1rem 2rem',
    width: '100%',
    height: '4.8rem',
    textAlign: 'center',
    ...fontStyle('body_r_14'),
  },
  variants: {
    state: {
      active: {
        backgroundColor: colorVars.color.gray100,
        ':active': {
          backgroundColor: colorVars.color.gray300,
        },
      },
      disabled: {
        backgroundColor: colorVars.color.gray050,
        cursor: 'not-allowed',
        pointerEvents: 'none',
        color: colorVars.color.gray300,
      },
      error: {
        backgroundColor: colorVars.color.error_light,
        color: colorVars.color.error,
        ...fontStyle('body_m_14'),
      },
    },
    buttonSize: {
      xsmall: {
        // 너비 1/4 버튼
        borderRadius: '6px',
        padding: '0.7rem 0',
        minWidth: '7.4rem',
        height: '3.2rem',
        ...fontStyle('caption_r_12'),
      },
      small: {
        // 너비 1/3 버튼
        minWidth: '10.7rem',
        textAlign: 'center',
      },
      medium: {
        // '소파'에 사용되는 버튼
        borderRadius: '6px',
        padding: '0.7rem 0',
        minWidth: '15.45rem',
        height: '3.2rem',
        ...fontStyle('caption_r_12'),
      },
      large: {
        // 너비 1/2 버튼
        minWidth: '16.4rem',
      },
    },
    selected: {
      true: {
        backgroundColor: colorVars.color.primary_light2,
        color: colorVars.color.primary,
        ...fontStyle('body_m_14'),
      },
    },
  },
  defaultVariants: {
    state: 'active',
    buttonSize: 'large',
    selected: false,
  },
  compoundVariants: [
    // compundVariants: 특정 조건이 동시에 만족될 때 추가로 적용되는 스타일
    // small + selected
    {
      variants: { buttonSize: 'xsmall', selected: true },
      style: { ...fontStyle('caption_m_12') },
    },
    // small + error
    {
      variants: { buttonSize: 'xsmall', state: 'error' },
      style: { ...fontStyle('caption_m_12') },
    },
    // medium + selected
    {
      variants: { buttonSize: 'medium', selected: true },
      style: { ...fontStyle('caption_m_12') },
    },
    // medium + error
    {
      variants: { buttonSize: 'medium', state: 'error' },
      style: { ...fontStyle('caption_m_12') },
    },
  ],
});
