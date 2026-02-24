import { useQuery } from '@tanstack/react-query';

import type { FactorsResponse } from '@pages/generate/types/generate';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

export const getPreferFactors = async (isLike: boolean) => {
  const res = await request<FactorsResponse>({
    method: HTTPMethod.GET,
    url: API_ENDPOINT.GENERATE.FACTORS,
    query: { isLike },
  });
  return res?.factors || [];
};

export const useFactorsQuery = (
  isLike: boolean,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: queryKeys.generate.factors(isLike),
    queryFn: () => getPreferFactors(isLike),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
