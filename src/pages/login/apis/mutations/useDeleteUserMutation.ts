import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@routes/paths';

import { useUserStore } from '@store/useUserStore';

import { queryClient } from '@apis/config/queryClient';
import { HTTPMethod, request } from '@apis/config/request';

import { useToast } from '@components/toast/useToast';

import { API_ENDPOINT } from '@constants/apiEndpoints';

import { TOAST_TYPE } from '@/shared/types/toastLegacy';

export type DeleteUserResponse = string;

export const deleteUser = async (): Promise<DeleteUserResponse> => {
  return request<DeleteUserResponse>({
    method: HTTPMethod.DELETE,
    url: API_ENDPOINT.USER.DELETE,
  });
};

export const useDeleteUserMutation = () => {
  const navigate = useNavigate();
  const { notify } = useToast();

  return useMutation<DeleteUserResponse, Error, void>({
    mutationFn: deleteUser,
    retry: false,
    onSuccess: () => {
      notify({
        text: '탈퇴되었습니다',
        type: TOAST_TYPE.INFO,
        options: { autoClose: 2500 },
      });

      navigate(ROUTES.HOME, { replace: true });

      setTimeout(() => {
        useUserStore.getState().clearUser();
        queryClient.clear();
      }, 100);
    },
    onError: (error) => {
      console.error('회원탈퇴 실패:', error);

      notify({
        text: '탈퇴에 실패했습니다. 다시 시도해주세요.',
        type: TOAST_TYPE.WARNING,
        options: { autoClose: 2500 },
      });
    },
  });
};
