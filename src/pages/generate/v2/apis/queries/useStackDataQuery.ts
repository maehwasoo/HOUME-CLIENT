import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

import type { GetCarouselV2ListResponseDTO } from '@/shared/apis/__generated__/data-contracts';

export const getStackData = async (
  cursor?: number
): Promise<GetCarouselV2ListResponseDTO> => {
  const query = cursor === undefined ? undefined : { cursor };

  const res = await request<GetCarouselV2ListResponseDTO>({
    method: HTTPMethod.GET,
    url: API_ENDPOINT.GENERATE.CAROUSELS_V2,
    query: query,
  });
  return res;
};

export const useStackDataQuery = (
  cursor: number | undefined,
  options: {
    enabled: boolean;
    onSuccess?: (data: GetCarouselV2ListResponseDTO) => void;
    onError?: (err: unknown) => void;
  }
) => {
  const query = useQuery<GetCarouselV2ListResponseDTO, unknown>({
    queryKey: queryKeys.generate.stack(cursor),
    queryFn: () => getStackData(cursor),
    staleTime: cursor === undefined ? 0 : 2 * 60 * 1000,
    gcTime: cursor === undefined ? 0 : 1000 * 60 * 60 * 24,
    retry: 2,
    enabled: options.enabled,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      options.onSuccess?.(query.data);
    }
  }, [query.isSuccess, query.data]);

  useEffect(() => {
    if (query.isError) {
      options.onError?.(query.error);
    }
  }, [query.isError, query.error]);

  return query;
};
