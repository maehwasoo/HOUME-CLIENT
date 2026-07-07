import { beforeEach, describe, expect, it, vi } from 'vitest';

// 외부 의존성 모킹 (실제 모듈 동작과 독립적으로 로직만 검증)
vi.mock('sonner', () => ({ toast: { custom: vi.fn() } }));
vi.mock('@routes/paths', () => ({ ROUTES: { LOGIN: '/login' } }));
vi.mock('@shared/types/toast', () => ({
  TOAST_TYPE: { ERROR: 'error' },
  TOASTER_ID: { BOTTOM_4: 'bottom-4' },
}));
vi.mock('@components/v2/toast/Toast', () => ({ default: vi.fn() }));
vi.mock('@components/v2/toast/Toast.css', () => ({ toastStyle: {} }));
vi.mock('@/routes/router', () => ({ router: { navigate: vi.fn() } }));

import { handleGlobalError, isSessionExpiredError } from './globalErrorHandler';

describe('isSessionExpiredError', () => {
  // 정확히 'SESSION_EXPIRED' 메시지인 Error 인스턴스만 true여야 함
  it('SESSION_EXPIRED 메시지인 Error를 true로 판별한다', () => {
    expect(isSessionExpiredError(new Error('SESSION_EXPIRED'))).toBe(true);
  });

  it('다른 메시지의 Error는 false를 반환한다', () => {
    expect(isSessionExpiredError(new Error('Network Error'))).toBe(false);
  });

  // Error 인스턴스가 아닌 값(문자열, null 등)은 false여야 함
  it('Error 인스턴스가 아니면 false를 반환한다', () => {
    expect(isSessionExpiredError('SESSION_EXPIRED')).toBe(false);
    expect(isSessionExpiredError(null)).toBe(false);
    expect(isSessionExpiredError(undefined)).toBe(false);
  });
});

describe('handleGlobalError', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.history.replaceState(null, '', '/');
  });

  it('쿼리 실패의 네트워크 에러는 전역 toast를 호출하지 않는다', async () => {
    const { toast } = await import('sonner');

    handleGlobalError(new Error('Network Error'));

    expect(toast.custom).not.toHaveBeenCalled();
  });

  it('이미지 생성 예외 코드는 LoadingPage에서만 처리하도록 전역 toast를 호출하지 않는다', async () => {
    const { toast } = await import('sonner');

    handleGlobalError({
      isAxiosError: true,
      response: {
        status: 500,
        data: {
          code: 50013,
          message: 'GENERATED_IMAGE_EXCEPTION',
        },
      },
    });

    expect(toast.custom).not.toHaveBeenCalled();
  });

  it('SESSION_EXPIRED 에러는 v2 sonner toast를 호출한다', async () => {
    const { toast } = await import('sonner');

    handleGlobalError(new Error('SESSION_EXPIRED'));

    expect(toast.custom).toHaveBeenCalledTimes(1);
  });
});
