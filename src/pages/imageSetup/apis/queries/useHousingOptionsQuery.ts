import { useQuery } from '@tanstack/react-query';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

import type { HousingOptionsResponse } from '../../types/apis/houseInfo';

export const getHousingOptions = async (): Promise<HousingOptionsResponse> => {
  return request<HousingOptionsResponse>({
    method: HTTPMethod.GET,
    url: API_ENDPOINT.IMAGE_SETUP.HOUSE_OPTIONS,
  });
};

export const useHousingOptionsQuery = () => {
  return useQuery({
    queryKey: queryKeys.imageSetup.housingOptions(),
    queryFn: getHousingOptions,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
  });
};
