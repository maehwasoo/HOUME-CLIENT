import { useMutation } from '@tanstack/react-query';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';

export const postCarouselHate = async (carouselId: number): Promise<void> => {
  return request({
    method: HTTPMethod.POST,
    url: API_ENDPOINT.GENERATE.CAROUSELS_HATE,
    query: { carouselId },
  });
};

export const usePostCarouselHateMutation = () => {
  return useMutation({
    mutationFn: postCarouselHate,
  });
};
