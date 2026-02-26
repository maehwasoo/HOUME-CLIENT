import { useMutation } from '@tanstack/react-query';

import { useABTest } from '@pages/generate/hooks/useABTest';
import { useGenerateStore } from '@pages/generate/stores/useGenerateStore';
import type {
  GenerateImageAResponse,
  GenerateImageBResponse,
  GenerateImageData,
  GenerateImageRequest,
} from '@pages/generate/types/generate';

import { queryClient } from '@apis/config/queryClient';
import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

export const postGenerateImages = async (
  requestData: GenerateImageRequest
): Promise<GenerateImageAResponse['data']> => {
  return request<GenerateImageAResponse['data']>({
    method: HTTPMethod.POST,
    url: API_ENDPOINT.GENERATE.IMAGE_V3,
    body: requestData,
  });
};

export const postGenerateImage = async (
  requestData: GenerateImageRequest
): Promise<GenerateImageBResponse['data']> => {
  return request<GenerateImageBResponse['data']>({
    method: HTTPMethod.POST,
    url: API_ENDPOINT.GENERATE.IMAGE_V2,
    body: requestData,
  });
};

export const useGenerateImageMutation = () => {
  const { setApiCompleted, setNavigationData, resetGenerate } =
    useGenerateStore();
  const { isMultipleImages } = useABTest();

  const generateImageRequest = useMutation<
    { imageInfoResponses: GenerateImageData[] },
    Error,
    GenerateImageRequest
  >({
    mutationFn: async (userInfo: GenerateImageRequest) => {
      if (isMultipleImages) {
        const res = await postGenerateImages(userInfo);
        return res;
      } else {
        const res = await postGenerateImage(userInfo);
        return { imageInfoResponses: [res] };
      }
    },
    onSuccess: (data) => {
      resetGenerate();
      setNavigationData(data);
      setApiCompleted(true);
      queryClient.invalidateQueries({ queryKey: queryKeys.generate.image() });
      queryClient.invalidateQueries({ queryKey: queryKeys.mypage.images() });
      queryClient.invalidateQueries({ queryKey: queryKeys.mypage.user() });
    },
  });

  return generateImageRequest;
};
