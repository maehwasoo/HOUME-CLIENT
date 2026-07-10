/** 그 외 컴포 — toast_type (GA 파라미터, Sonner TOAST_TYPE과 별개) */
export const GA_TOAST_TYPE = {
  SAVE: 'save_toast',
  UNSAVE: 'unsave_toast',
  LOGIN_FAIL: 'login_fail',
  LOGIN_SUCCESS: 'login_success',
  SIGNUP_SUCCESS: 'signup_success',
  SIGNUP_FAIL: 'signup_fail',
  ESSENTIAL_FURNITURE_DESELECT: 'essential_furniture_deselect',
} as const;

export type GaToastType = (typeof GA_TOAST_TYPE)[keyof typeof GA_TOAST_TYPE];
