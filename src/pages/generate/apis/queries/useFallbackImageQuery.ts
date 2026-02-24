import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useGenerateStore } from '@pages/generate/stores/useGenerateStore';
import type { GenerateImageBResponse } from '@pages/generate/types/generate';

import { ROUTES } from '@routes/paths';

import { queryClient } from '@apis/config/queryClient';
import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { ERROR_CODES, FALLBACK_TRIGGER_CODES } from '@constants/apiErrorCode';
import { queryKeys } from '@constants/queryKey';

export const getFallbackImage = async (
  houseId: number
): Promise<GenerateImageBResponse['data']> => {
  return request<GenerateImageBResponse['data']>({
    method: HTTPMethod.GET,
    url: `${API_ENDPOINT.GENERATE.IMAGE_STATUS}?houseId=${houseId}`,
  });
};

export const useFallbackImageQuery = (
  houseId: number,
  enabled: boolean,
  onError?: (error: unknown) => void
) => {
  const navigate = useNavigate();
  const { resetGenerate, setApiCompleted, setNavigationData } =
    useGenerateStore();

  const query = useQuery({
    queryKey: queryKeys.generate.fallback(houseId),
    queryFn: () => getFallbackImage(houseId),
    enabled,

    retry: (failureCount, error: any) => {
      const status = error?.response?.status;
      const code = error?.response?.data?.code;

      if (failureCount >= 10) {
        console.error('폴백 API 최대 재시도 횟수 초과 (10회)');
        return false;
      }

      if (
        status === ERROR_CODES.HTTP_RATE_LIMITED ||
        FALLBACK_TRIGGER_CODES.has(code)
      ) {
        return true;
      }

      return false;
    },
    retryDelay: 5000,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      resetGenerate();
      setNavigationData(query.data);
      setApiCompleted(true);
      queryClient.invalidateQueries({ queryKey: queryKeys.generate.image() });
      queryClient.invalidateQueries({ queryKey: queryKeys.mypage.images() });
    }
  }, [query.isSuccess, query.data]);

  useEffect(() => {
    if (query.isError) {
      if (onError) {
        onError(query.error);
      } else {
        navigate(ROUTES.HOME);
      }
    }
  }, [query.isError, query.error, onError]);

  return query;
};
