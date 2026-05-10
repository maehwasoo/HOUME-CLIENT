import { useMutation } from '@tanstack/react-query';

import type { EditProfileRequest } from '@pages/mypage/types/apis/userData';

import type { MyPageProfileResponse } from '@apis/__generated__/data-contracts';
import { queryClient } from '@apis/config/queryClient';
import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

export const patchProfile = async (
  body: EditProfileRequest
): Promise<MyPageProfileResponse> => {
  return request<MyPageProfileResponse>({
    method: HTTPMethod.PATCH,
    url: API_ENDPOINT.USER.MYPAGE_PROFILE_EDIT,
    body: body,
  });
};

export const useEditProfileMutation = () => {
  return useMutation<MyPageProfileResponse, Error, EditProfileRequest>({
    mutationFn: patchProfile,
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(queryKeys.mypage.user(), updatedProfile);
      queryClient.invalidateQueries({
        queryKey: queryKeys.mypage.user(),
      });
    },
  });
};
