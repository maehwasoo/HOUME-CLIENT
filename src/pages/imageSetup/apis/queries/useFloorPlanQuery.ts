import { useQuery } from '@tanstack/react-query';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

import type { FloorPlanResponse } from '../../types/apis/floorPlan';

export const getFloorPlan = async (): Promise<FloorPlanResponse['data']> => {
  return request<FloorPlanResponse['data']>({
    method: HTTPMethod.GET,
    url: API_ENDPOINT.IMAGE_SETUP.FLOOR_PLAN,
  });
};

export const useFloorPlanQuery = () => {
  return useQuery({
    queryKey: queryKeys.imageSetup.floorPlan(),
    queryFn: getFloorPlan,
  });
};
