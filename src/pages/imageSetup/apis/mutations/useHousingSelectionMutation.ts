import { useMutation } from '@tanstack/react-query';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';

import type {
  HousingSelectionRequest,
  HousingSelectionResponse,
} from '../../types/apis/houseInfo';

const postHousingSelection = async (
  requestData: HousingSelectionRequest
): Promise<HousingSelectionResponse> => {
  return request<HousingSelectionResponse>({
    method: HTTPMethod.POST,
    url: API_ENDPOINT.IMAGE_SETUP.HOUSE_INFO,
    body: requestData,
  });
};

export const useHousingSelectionMutation = () => {
  return useMutation({
    mutationFn: postHousingSelection,
  });
};
