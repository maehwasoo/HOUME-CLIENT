import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import type { LogoutResponse } from '@pages/login/types/auth';

import { ROUTES } from '@routes/paths';

import { useUserStore } from '@store/useUserStore';

import { queryClient } from '@apis/config/queryClient';
import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';

export const postLogout = async (): Promise<LogoutResponse> => {
  return request<LogoutResponse>({
    method: HTTPMethod.POST,
    url: API_ENDPOINT.AUTH.LOGOUT,
  });
};

export const useLogoutMutation = () => {
  const navigate = useNavigate();

  return useMutation<LogoutResponse, Error, void>({
    mutationFn: postLogout,
    onSettled: () => {
      useUserStore.getState().clearUser();
      queryClient.clear();
      navigate(ROUTES.HOME, { replace: true });
    },
  });
};
