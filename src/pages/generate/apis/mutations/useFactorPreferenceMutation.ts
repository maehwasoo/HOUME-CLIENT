import { useMutation } from '@tanstack/react-query';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';

export const postFactorPreference = async (
  imageId: number,
  factorId: number
): Promise<void> => {
  return request({
    method: HTTPMethod.POST,
    url: API_ENDPOINT.GENERATE.FACTOR_PREFERENCE(imageId, factorId),
  });
};

export const useFactorPreferenceMutation = () => {
  return useMutation({
    mutationFn: ({
      imageId,
      factorId,
    }: {
      imageId: number;
      factorId: number;
    }) => postFactorPreference(imageId, factorId),
  });
};
