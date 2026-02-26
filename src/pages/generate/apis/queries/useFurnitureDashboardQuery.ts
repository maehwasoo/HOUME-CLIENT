import { useQuery } from '@tanstack/react-query';

import type { FurnitureAndActivityResponse } from '@pages/generate/types/furniture';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

export const getFurnitureDashboardInfo =
  async (): Promise<FurnitureAndActivityResponse> => {
    return request<FurnitureAndActivityResponse>({
      method: HTTPMethod.GET,
      url: API_ENDPOINT.GENERATE.CURATION_DASHBOARD,
    });
  };

export const useFurnitureDashboardQuery = () => {
  return useQuery<FurnitureAndActivityResponse>({
    queryKey: queryKeys.furniture.dashboard(),
    queryFn: getFurnitureDashboardInfo,
    staleTime: 5 * 60 * 1000,
  });
};
