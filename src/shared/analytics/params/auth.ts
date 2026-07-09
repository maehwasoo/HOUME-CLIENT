/** 로그인/회원가입 — is_valid_login */
export const VALID_LOGIN_STATUS = {
  SOCIAL_PASSED: 'social_passed',
  FORM_PASSED: 'form_passed',
  ALL_PASSED: 'all_passed',
} as const;

export type ValidLoginStatus =
  (typeof VALID_LOGIN_STATUS)[keyof typeof VALID_LOGIN_STATUS];

/** 로그인/회원가입 — signup_step */
export const SIGNUP_STEP = {
  NICKNAME_INPUT: 'nickname_input',
  BIRTH_INPUT: 'birth_input',
  GENDER_SELECT: 'gender_select',
  COMPLETED: 'completed',
} as const;

export type SignupStep = (typeof SIGNUP_STEP)[keyof typeof SIGNUP_STEP];
