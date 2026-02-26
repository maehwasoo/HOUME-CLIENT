import { useMutation } from '@tanstack/react-query';

import { useSavedItemsStore } from '@store/useSavedItemsStore';

import type { SaveItemsRequest, SaveItemsResponse } from '@shared/types/jjym';

import { queryClient } from '@apis/config/queryClient';
import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

import type { AxiosError } from 'axios';

export const postJjym = async (
  jjymData: SaveItemsRequest
): Promise<SaveItemsResponse> => {
  return request<SaveItemsResponse>({
    method: HTTPMethod.POST,
    url: API_ENDPOINT.GENERATE.JJYM(jjymData.recommendFurnitureId),
  });
};

export const useJjymMutation = () => {
  const toggleSaveProduct = useSavedItemsStore((s) => s.toggleSaveProduct);

  return useMutation<SaveItemsResponse, AxiosError, number>({
    mutationKey: ['jjym'],
    mutationFn: (recommendFurnitureId) => postJjym({ recommendFurnitureId }),

    onMutate: async (recommendFurnitureId) => {
      toggleSaveProduct(recommendFurnitureId);
      return { recommendFurnitureId };
    },

    onSuccess: (data, recommendFurnitureId) => {
      const isSavedNow = useSavedItemsStore
        .getState()
        .savedProductIds.has(recommendFurnitureId);

      if (isSavedNow !== data.favorited) {
        toggleSaveProduct(recommendFurnitureId);
      }

      queryClient.invalidateQueries({ queryKey: queryKeys.jjym.list() });
    },

    onError: (error, recommendFurnitureId) => {
      toggleSaveProduct(recommendFurnitureId);
      if (import.meta.env.DEV)
        console.log('찜하기 토글 변경 중 에러 발생', error);
    },
  });
};
