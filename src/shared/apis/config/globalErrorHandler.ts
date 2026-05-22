import { createElement } from 'react';

import { toast } from 'react-toastify';

import { ROUTES } from '@routes/paths';

import Toast from '@components/toast/Toast';

import { TOAST_TYPE, toastStyle } from '@/shared/types/toastLegacy';

// React 외부 toast 유틸 (훅을 쓸 수 없는 모듈 스코프에서 사용)
const showGlobalToast = (text: string) => {
  toast(createElement(Toast, { text, type: TOAST_TYPE.WARNING }), {
    style: toastStyle,
  });
};

// React 외부 navigate (dynamic import로 순환 참조 방지)
const redirectTo = async (path: string): Promise<void> => {
  const { router } = await import('@/routes/router');
  router.navigate(path);
};

// SESSION_EXPIRED 판별
export const isSessionExpiredError = (error: unknown): boolean =>
  error instanceof Error && error.message === 'SESSION_EXPIRED';

// 중복 방지 (여러 쿼리가 동시에 실패할 때)
let lastSessionExpiredAt = 0;
const SESSION_EXPIRED_COOLDOWN = 5000;

const handleSessionExpired = () => {
  const now = Date.now();
  if (now - lastSessionExpiredAt < SESSION_EXPIRED_COOLDOWN) return;
  lastSessionExpiredAt = now;

  showGlobalToast('세션이 만료되었습니다. 다시 로그인해주세요.');
  setTimeout(() => redirectTo(ROUTES.LOGIN), 1000);
};

/** QueryCache/MutationCache의 onError에서 호출 */
export const handleGlobalError = (error: Error) => {
  if (import.meta.env.DEV) console.error('[QueryClient Error]', error);
  if (isSessionExpiredError(error)) handleSessionExpired();
};
