import { beforeEach, describe, expect, it, vi } from 'vitest';

// 외부 의존성 모킹 (실제 모듈 동작과 독립적으로 로직만 검증)
vi.mock('react-toastify', () => ({ toast: vi.fn() }));
vi.mock('@routes/paths', () => ({ ROUTES: { LOGIN: '/login' } }));
vi.mock('@shared/types/toast', () => ({
  TOAST_TYPE: { WARNING: 'warning' },
  toastStyle: {},
}));
vi.mock('@components/toast/Toast', () => ({ default: vi.fn() }));
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
  });

  // SESSION_EXPIRED가 아닌 에러는 toast를 띄우지 않아야 함
  it('SESSION_EXPIRED가 아닌 에러는 toast를 호출하지 않는다', async () => {
    const { toast } = await import('react-toastify');
    handleGlobalError(new Error('Network Error'));
    expect(toast).not.toHaveBeenCalled();
  });

  // SESSION_EXPIRED 에러는 toast를 호출해야 함
  it('SESSION_EXPIRED 에러는 toast를 호출한다', async () => {
    const { toast } = await import('react-toastify');
    handleGlobalError(new Error('SESSION_EXPIRED'));
    expect(toast).toHaveBeenCalledTimes(1);
  });
});
