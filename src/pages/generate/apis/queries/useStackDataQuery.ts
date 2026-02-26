import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import type {
  CarouselItem,
  ImageStackResponse,
} from '@pages/generate/types/generate';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

export const getStackData = async (page: number): Promise<CarouselItem[]> => {
  const res = await request<ImageStackResponse>({
    method: HTTPMethod.GET,
    url: API_ENDPOINT.GENERATE.CAROUSELS,
    query: { page },
  });
  return res.carouselResponseDTOS ?? [];
};

export const useStackDataQuery = (
  page: number,
  options: {
    enabled: boolean;
    onSuccess?: (data: CarouselItem[]) => void;
    onError?: (err: unknown) => void;
  }
) => {
  const query = useQuery<CarouselItem[], unknown>({
    queryKey: queryKeys.generate.stack(page),
    queryFn: () => getStackData(page),
    staleTime: 2 * 60 * 1000,
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
