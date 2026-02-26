import { useMutation } from '@tanstack/react-query';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';

import type { UserAddressRequest } from '../../types/apis/bottomSheetAddress.types';

const postAddress = async (body: UserAddressRequest): Promise<void> => {
  return request({
    method: HTTPMethod.POST,
    url: API_ENDPOINT.IMAGE_SETUP.POST_ADDRESS,
    body,
  });
};

export const useUserAddressMutation = () => {
  return useMutation({
    mutationFn: (body: UserAddressRequest) => postAddress(body),
  });
};
