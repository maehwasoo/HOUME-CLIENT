import { useMutation } from '@tanstack/react-query';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';

export const deleteResultPreference = async (
  imageId: number
): Promise<void> => {
  return request({
    method: HTTPMethod.DELETE,
    url: `${API_ENDPOINT.GENERATE.IMAGE_PREFERENCE}/${imageId}/preference`,
  });
};

export const useDeleteResultPreferenceMutation = () => {
  return useMutation({
    mutationFn: (imageId: number) => deleteResultPreference(imageId),
  });
};
