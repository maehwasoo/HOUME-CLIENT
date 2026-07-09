import { useQuery } from '@tanstack/react-query';

import type { ActivityFurnitureMappingsResponse } from '@apis/__generated__/data-contracts';
import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

import { STATIC_DATA_QUERY_OPTIONS } from '../../constants/cache';

export const getActivities =
  async (): Promise<ActivityFurnitureMappingsResponse> => {
    return request<ActivityFurnitureMappingsResponse>({
      method: HTTPMethod.GET,
      url: API_ENDPOINT.IMAGE_SETUP.ACTIVITIES,
    });
  };

export const useActivitiesQuery = () => {
  return useQuery({
    queryKey: queryKeys.imageSetup.activities(),
    queryFn: getActivities,
    ...STATIC_DATA_QUERY_OPTIONS,
  });
};
