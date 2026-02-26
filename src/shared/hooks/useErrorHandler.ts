import { useCallback, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { logLoginSocialViewToastLoginError } from '@pages/login/utils/analytics';

import { ROUTES } from '@routes/paths';

import type { ErrorType, PageContext } from '@shared/types/error';
import { ERROR_MESSAGES } from '@shared/types/error';
import { TOAST_TYPE } from '@shared/types/toast';

import { useToast } from '@components/toast/useToast';

/**
 * 중앙화된 에러 핸들러 훅
 *
 * @param context 현재 페이지 컨텍스트
 * @returns handleError 함수
 */
export const useErrorHandler = (context: PageContext) => {
  const navigate = useNavigate();
  const { notify } = useToast();

  // 토스트 중복 방지를 위한 ref
  const lastErrorRef = useRef<{ message: string; timestamp: number } | null>(
    null
  );
  const TOAST_COOLDOWN = 3000; // 3초 내 같은 에러 메시지 중복 방지

  /**
   * 컨텍스트와 에러 타입에 따른 리다이렉트 경로 반환
   */
  const getRedirectPath = useCallback(
    (context: PageContext, type: ErrorType): string => {
      const redirectMap: Record<
        PageContext,
        Partial<Record<ErrorType, string>>
      > = {
        home: {
          loading: ROUTES.HOME,
          api: ROUTES.HOME,
          network: ROUTES.HOME,
        },
        imageSetup: {
          loading: ROUTES.HOME,
          api: ROUTES.HOME,
          network: ROUTES.HOME,
          auth: ROUTES.LOGIN,
        },
        generate: {
          loading: ROUTES.HOME,
          api: ROUTES.HOME,
          network: ROUTES.HOME,
          auth: ROUTES.LOGIN,
        },
        mypage: {
          loading: ROUTES.HOME,
          api: ROUTES.HOME,
          network: ROUTES.HOME,
          auth: ROUTES.LOGIN,
        },
        login: {
          loading: ROUTES.HOME,
          api: ROUTES.HOME,
          network: ROUTES.HOME,
          auth: ROUTES.LOGIN,
        },
      };

      return redirectMap[context]?.[type] || ROUTES.HOME;
    },
    []
  );

  /**
   * 에러 처리 함수
   *
   * @param error 발생한 에러 객체
   * @param type 에러 타입
   * @param customMessage 커스텀 에러 메시지 (선택적)
   */
  const handleError = useCallback(
    (error: Error | unknown, type: ErrorType, customMessage?: string) => {
      // SESSION_EXPIRED는 queryClient의 globalErrorHandler에서 전역 처리
      if (error instanceof Error && error.message === 'SESSION_EXPIRED') {
        return;
      }

      // 에러 로깅
      console.error(`[${context}] ${type} error:`, error);

      // 토스트 알림
      const message = customMessage || ERROR_MESSAGES[type];
      const now = Date.now();

      // 같은 메시지가 쿨다운 시간 내에 이미 표시되었다면 무시
      if (
        lastErrorRef.current &&
        lastErrorRef.current.message === message &&
        now - lastErrorRef.current.timestamp < TOAST_COOLDOWN
      ) {
        return;
      }

      lastErrorRef.current = { message, timestamp: now };

      // 로그인 컨텍스트에서 에러 토스트 표시 시 GA 이벤트 전송
      if (context === 'login') {
        logLoginSocialViewToastLoginError();
      }

      notify({
        text: message,
        type: TOAST_TYPE.WARNING,
      });

      // 리다이렉트
      const redirectPath = getRedirectPath(context, type);

      // 약간의 지연을 두어 사용자가 토스트를 볼 수 있도록 함
      setTimeout(() => {
        navigate(redirectPath);
      }, 1000);
    },
    [context, navigate, notify, getRedirectPath]
  );

  return { handleError };
};
