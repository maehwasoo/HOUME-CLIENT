import { useMutation } from '@tanstack/react-query';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';

export const postResultPreference = async (
  imageId: number,
  isLike: boolean
): Promise<void> => {
  return request({
    method: HTTPMethod.POST,
    url: `${API_ENDPOINT.GENERATE.IMAGE_PREFERENCE}/${imageId}/preference`,
    body: { isLike },
  });
};

export const useResultPreferenceMutation = () => {
  return useMutation({
    mutationFn: ({ imageId, isLike }: { imageId: number; isLike: boolean }) =>
      postResultPreference(imageId, isLike),
  });
};
