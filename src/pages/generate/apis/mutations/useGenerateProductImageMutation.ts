import { useMutation } from '@tanstack/react-query';

import type { GeneratedImagePayload } from '@pages/generate/types/generate';
import { useGenerateStore } from '@pages/generate/v2/stores/useGenerateStore';

import type {
  GenerateImageV4Response,
  ProductGenerateImageRequest,
} from '@apis/__generated__/data-contracts';
import { queryClient } from '@apis/config/queryClient';
import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

import { toGeneratedImagePayload } from './toGeneratedImagePayload';

export const postGenerateProductImage = async (
  requestData: ProductGenerateImageRequest
): Promise<GeneratedImagePayload> => {
  const response = await request<GenerateImageV4Response>({
    method: HTTPMethod.POST,
    url: API_ENDPOINT.GENERATE.IMAGE_PRODUCT,
    body: requestData,
  });

  return toGeneratedImagePayload(response);
};

export const useGenerateProductImageMutation = () => {
  const { setApiCompleted, setNavigationData, resetGenerate } =
    useGenerateStore();

  return useMutation<GeneratedImagePayload, Error, ProductGenerateImageRequest>(
    {
      mutationFn: postGenerateProductImage,
      onSuccess: (data) => {
        resetGenerate();
        setNavigationData(data);
        setApiCompleted(true);
        queryClient.invalidateQueries({ queryKey: queryKeys.generate.image() });
        queryClient.invalidateQueries({ queryKey: queryKeys.mypage.images() });
        queryClient.invalidateQueries({ queryKey: queryKeys.mypage.user() });
      },
    }
  );
};
