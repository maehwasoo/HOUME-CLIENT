import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

const TRAP_STATE_KEY = 'browserBackTrap';
export const SIGNUP_EXIT_MODAL_PENDING_KEY = 'signupExitModalPending';

interface UseBrowserBackTrapOptions {
  enabled: boolean;
  /** 브라우저 뒤로가기/스와이프 시도 시 호출 (모달 표시 등) */
  onBack: () => void;
}

/**
 * 브라우저 뒤로가기/스와이프를 가로채는 훅.
 *
 * `useBlocker`는 SPA 내부 라우팅만 막을 수 있어, OAuth처럼 외부 origin이
 * 히스토리에 끼어 있는 경우 뒤로가기가 가로채지지 않는다.
 * `pushState`로 더미 항목을 쌓고 `popstate`에서 복원해 같은 페이지에 머무르게 한다.
 */
export const useBrowserBackTrap = ({
  enabled,
  onBack,
}: UseBrowserBackTrapOptions) => {
  const onBackRef = useRef(onBack);
  const isExitAllowedRef = useRef(false);

  useEffect(() => {
    onBackRef.current = onBack;
  }, [onBack]);

  useLayoutEffect(() => {
    if (!enabled) return;

    const pushTrapState = () => {
      window.history.pushState(
        { [TRAP_STATE_KEY]: true },
        '',
        window.location.href
      );
    };

    pushTrapState();

    const handlePopState = (event: PopStateEvent) => {
      if (isExitAllowedRef.current) return;

      // React Router가 popstate를 처리해 OAuth callback 등으로 이동하는 것을 차단
      event.stopImmediatePropagation();
      pushTrapState();
      onBackRef.current();
    };

    window.addEventListener('popstate', handlePopState, true);

    return () => {
      window.removeEventListener('popstate', handlePopState, true);
    };
  }, [enabled]);

  const allowExit = useCallback(() => {
    isExitAllowedRef.current = true;
  }, []);

  return { allowExit };
};
