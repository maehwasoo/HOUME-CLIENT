import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/routes/paths';
import axiosInstance from '@/shared/apis/axiosInstance';
import { RESPONSE_MESSAGE, HTTP_STATUS } from '@/shared/constants/response';
import type { BaseResponse } from '@/shared/types/apis';
import { useUserStore } from '@/store/useUserStore';

import { API_ENDPOINT } from '@constants/apiEndpoints';

import type { SignupRequest, SignupResponse } from '../types/apis/signup';

/* 회원가입 API 함수 */
export const postSignup = async (
  data: SignupRequest
): Promise<SignupResponse> => {
  const response = await axiosInstance.post<BaseResponse<string>>(
    API_ENDPOINT.USER.SIGN_UP,
    data
  );

  const accessToken = response.headers['access-token'];
  if (!accessToken) {
    throw new Error(
      RESPONSE_MESSAGE[HTTP_STATUS.UNAUTHORIZED] || '액세스 토큰이 없습니다.'
    );
  }

  return {
    userName: response.data.data,
    accessToken,
  };
};

/* 회원가입 TanStack Query 훅 */
export const usePostSignupMutation = () => {
  const navigate = useNavigate();
  const setUserName = useUserStore((state) => state.setUserName);
  const setAccessToken = useUserStore((state) => state.setAccessToken);

  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: postSignup,
    retry: false,
    onSuccess: (response) => {
      setUserName(response.userName); // userName 전역 저장 (zustand)
      setAccessToken(response.accessToken);
      sessionStorage.removeItem('signupToken');
      navigate(ROUTES.GENERATE_START);
    },
    onError: (error) => {
      console.error('[usePostSignupMutation] 회원가입 실패:', error); // 에러는 useErrorHandler에서 처리
    },
  });
};
