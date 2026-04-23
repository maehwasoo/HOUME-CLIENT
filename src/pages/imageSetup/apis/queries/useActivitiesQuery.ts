import { useQuery } from '@tanstack/react-query';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

import type { ActivitiesResponse } from '../../types/apis/activityInfo';

export const getActivities = async (): Promise<ActivitiesResponse> => {
  return request<ActivitiesResponse>({
    method: HTTPMethod.GET,
    url: API_ENDPOINT.IMAGE_SETUP.ACTIVITIES,
  });
};

export const useActivitiesQuery = () => {
  return useQuery({
    queryKey: queryKeys.imageSetup.activities(),
    queryFn: getActivities,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
  });
};
