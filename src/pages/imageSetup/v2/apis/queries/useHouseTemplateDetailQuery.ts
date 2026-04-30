import { useQuery } from '@tanstack/react-query';

import type { ExploreHouseTemplateDetailResponse } from '@apis/__generated__/data-contracts';
import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

export const getHouseTemplateDetail = async (
  floorPlanId: number
): Promise<ExploreHouseTemplateDetailResponse> => {
  return request<ExploreHouseTemplateDetailResponse>({
    method: HTTPMethod.GET,
    url: API_ENDPOINT.IMAGE_SETUP.HOUSE_TEMPLATE_DETAIL(floorPlanId),
  });
};

export const useHouseTemplateDetailQuery = (floorPlanId: number | null) => {
  return useQuery({
    queryKey: queryKeys.imageSetup.houseTemplateDetail(floorPlanId ?? -1),
    queryFn: () => getHouseTemplateDetail(floorPlanId as number),
    enabled: floorPlanId !== null,
  });
};
