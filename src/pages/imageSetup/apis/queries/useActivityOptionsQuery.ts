import { useQuery } from '@tanstack/react-query';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

import type { ActivityOptionsResponse } from '../../types/apis/activityInfo';

export const getActivityOptions =
  async (): Promise<ActivityOptionsResponse> => {
    return request<ActivityOptionsResponse>({
      method: HTTPMethod.GET,
      url: API_ENDPOINT.IMAGE_SETUP.ACTIVITY_OPTIONS,
    });
  };

export const useActivityOptionsQuery = () => {
  return useQuery({
    queryKey: queryKeys.imageSetup.activityOptions(),
    queryFn: getActivityOptions,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
  });
};
