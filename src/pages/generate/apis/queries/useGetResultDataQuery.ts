import { useQuery } from '@tanstack/react-query';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

export const getResultData = async (houseId: number) => {
  return request({
    method: HTTPMethod.GET,
    url: `${API_ENDPOINT.GENERATE.IMAGE_GENERATION}/${houseId}/preference`,
  });
};

export const useGetResultDataQuery = (
  houseId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: queryKeys.generate.result(houseId),
    queryFn: () => getResultData(houseId),
    ...options,
  });
};
