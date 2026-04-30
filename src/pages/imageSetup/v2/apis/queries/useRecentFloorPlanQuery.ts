import { useQuery } from '@tanstack/react-query';

import type { RecentFloorPlanResponse } from '@apis/__generated__/data-contracts';
import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

export const getRecentFloorPlan =
  async (): Promise<RecentFloorPlanResponse> => {
    return request<RecentFloorPlanResponse>({
      method: HTTPMethod.GET,
      url: API_ENDPOINT.IMAGE_SETUP.RECENT_FLOOR_PLAN,
    });
  };

export const useRecentFloorPlanQuery = () => {
  return useQuery({
    queryKey: queryKeys.imageSetup.recentFloorPlan(),
    queryFn: getRecentFloorPlan,
  });
};
