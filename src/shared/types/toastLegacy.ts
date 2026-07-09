import { Slide } from 'react-toastify';

import type { ToastContainerProps } from 'react-toastify';

/*
모두 교체될 때까지 유지
*/
// react-toastify의 ToastContainer 기본 설정 (일단 삭제 안함)
export const TOAST_TYPE = {
  INFO: 'info',
  WARNING: 'warning',
  NAVIGATE: 'navigate',
} as const;

// // 1) 키 타입
export type ToastTypeKey = keyof typeof TOAST_TYPE;

// // 2) 값 타입
export type ToastType = (typeof TOAST_TYPE)[ToastTypeKey];

export const toastStyle = {
  backgroundColor: 'transparent',
  boxShadow: 'none',
  display: 'flex',
  justifyContent: 'center',
  width: 'auto',
};

export const toastConfig: ToastContainerProps = {
  position: 'bottom-center' as const,
  closeButton: false,
  autoClose: 3000,
  hideProgressBar: true,
  newestOnTop: true,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  limit: 1,
  toastStyle: {
    ...toastStyle,
  },
  transition: Slide,
};
