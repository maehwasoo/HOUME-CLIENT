import { RESPONSE_MESSAGE, HTTP_STATUS } from '@/shared/constants/response';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import axiosInstance from '@shared/apis/axiosInstance';

import type { KakaoLoginResponse, LoginApiResponse } from '../types/auth';
import type { AuthEnvironment } from '../types/environment';
import type { BaseResponse } from '@shared/types/apis';

/**
 * 카카오 OAuth 로그인 콜백 API 함수
 *
 * 카카오 인증 서버에서 받은 인가 코드(code)와 환경(env)을 백엔드 콜백 API로 전달합니다.
 * 백엔드는 인가 코드를 검증하고 신규/기존 사용자 여부와 임시 signupToken(신규 회원) 등을 반환합니다.
 *
 * 이 함수는 KakaoCallback 컴포넌트에서 URL 파라미터로부터 파싱한 인가 코드와
 * 환경 정보를 백엔드 `/oauth/kakao/callback` API로 전달하는 역할을 합니다.
 *
 * @param code - 카카오 인증 서버에서 받은 인가 코드 (URL 파라미터에서 파싱)
 * @param env - 환경 정보 ('local' | 'preview' | 'dev')
 * @returns Promise<LoginApiResponse> - 사용자 여부 정보 + (기존 회원일 때만) 액세스 토큰
 *
 * @example
 * ```typescript
 * // KakaoCallback 컴포넌트에서:
 * const code = new URL(window.location.href).searchParams.get('code');
 * const env = window.location.hostname === 'localhost' ? 'local' : 'dev';
 * const response = await getKakaoOAuthCallback(code, env);
 * console.log(response.data.isNewUser); // 신규 회원 여부
 * console.log(response.data.signupToken); // 신규 회원 임시 토큰(신규 회원일 때만)
 * console.log(response.accessToken); // 액세스 토큰(기존 회원일 때만)
 * ```
 */

export const getKakaoOAuthCallback = async (
  code: string,
  env: AuthEnvironment
): Promise<LoginApiResponse> => {
  // AxiosInstance를 사용해서 서버에 요청 (code와 env 쿼리 파라미터 전달)
  const response = await axiosInstance.get<BaseResponse<KakaoLoginResponse>>(
    API_ENDPOINT.AUTH.KAKAO_CALLBACK,
    { params: { code, env } }
  );

  // console.log('[kakaoOAuthCallback] 응답 헤더:', response.headers);
  // console.log('[kakaoOAuthCallback] 응답 데이터:', response.data);

  const data = response.data.data;

  // 서버 응답 헤더에서 액세스 토큰 추출 (기존 회원만)
  const accessToken = response.headers['access-token'];
  if (!data.isNewUser && !accessToken) {
    throw new Error(
      RESPONSE_MESSAGE[HTTP_STATUS.UNAUTHORIZED] || '액세스 토큰이 없습니다.'
    );
  }

  if (data.isNewUser && !data.signupToken) {
    throw new Error(
      RESPONSE_MESSAGE[HTTP_STATUS.BAD_REQUEST] ||
        '회원가입 임시 토큰(signupToken)이 없습니다.'
    );
  }

  return {
    data,
    accessToken: accessToken || undefined,
  };
};
