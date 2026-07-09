import { createElement } from 'react';

import { toast } from 'sonner';

import { ROUTES } from '@routes/paths';

import { TOASTER_ID, TOAST_TYPE } from '@shared/types/toast';

import Toast from '@components/v2/toast/Toast';
import { toastStyle } from '@components/v2/toast/Toast.css';

// React 외부 toast 유틸 (훅을 쓸 수 없는 모듈 스코프에서 사용)
const showGlobalToast = (text: string, hasIcon = true) => {
  toast.custom(
    () => createElement(Toast, { text, type: TOAST_TYPE.ERROR, hasIcon }),
    {
      toasterId: TOASTER_ID.BOTTOM_4,
      style: toastStyle,
    }
  );
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
export const handleGlobalError = (error: unknown) => {
  if (import.meta.env.DEV) console.error('[QueryClient Error]', error);

  if (isSessionExpiredError(error)) {
    handleSessionExpired();
  }
};
