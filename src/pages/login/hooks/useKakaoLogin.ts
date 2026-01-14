/**
 * 카카오 로그인 React Query 훅
 *
 * 카카오 OAuth 로그인을 처리하는 TanStack Query mutation 훅입니다.
 * 로그인 성공 시 액세스 토큰을 로컬 스토리지에 저장하고 홈페이지로 이동합니다.
 *
 * @returns useMutation - 로그인 상태와 함수를 반환
 *
 * @example
 * ```typescript
 * const { mutate: login, isPending, isError } = useKakaoLoginMutation();
 *
 * // 카카오 인가 코드와 환경 정보로 로그인
 * login({ code: 'authorization_code', env: 'local' });
 * ```
 */
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/routes/paths';
import { useUserStore } from '@/store/useUserStore';

import { getKakaoOAuthCallback } from '../apis/kakaoOAuthCallback';

import type { LoginApiResponse } from '../types/auth';
import type { AuthEnvironment } from '../types/environment';

export const useKakaoLoginMutation = () => {
  const navigate = useNavigate();
  const setAccessToken = useUserStore((state) => state.setAccessToken);

  return useMutation<
    LoginApiResponse,
    Error,
    { code: string; env: AuthEnvironment }
  >({
    mutationFn: ({ code, env }) => getKakaoOAuthCallback(code, env),
    onSuccess: (response) => {
      // 신규 회원: signupToken 기반으로 회원가입 진행
      if (response.data.isNewUser) {
        const signupToken = response.data.signupToken;
        if (!signupToken) {
          console.error(
            '[useKakaoLoginMutation] 신규 회원 응답에 signupToken이 없습니다.'
          );
          return;
        }

        sessionStorage.setItem('signupToken', signupToken);

        navigate(ROUTES.SIGNUP, {
          state: {
            signupToken,
            prefill: response.data.prefill,
          },
        });
        return;
      }

      // 기존 회원: access-token 헤더로 로그인 완료
      if (response.accessToken) {
        // zustand에 저장 (localStorage 동시 저장)
        setAccessToken(response.accessToken);
      }

      navigate(ROUTES.HOME);
    },
    onError: () => {
      // 오류 처리는 KakaoCallback 컴포넌트에서 useErrorHandler로 처리
    },
  });
};
