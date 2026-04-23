import { useQuery } from '@tanstack/react-query';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

import type { FurnitureCategoriesResponse } from '../../types/apis/activityInfo';

export const getFurnitureCategories =
  async (): Promise<FurnitureCategoriesResponse> => {
    return request<FurnitureCategoriesResponse>({
      method: HTTPMethod.GET,
      url: API_ENDPOINT.IMAGE_SETUP.FURNITURE_CATEGORIES,
    });
  };

export const useFurnitureCategoriesQuery = () => {
  return useQuery({
    queryKey: queryKeys.imageSetup.furnitureCategories(),
    queryFn: getFurnitureCategories,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
  });
};
