import { useMutation } from '@tanstack/react-query';

import { useGenerateStore } from '@pages/generate/v2/stores/useGenerateStore';

import type {
  GenerateImageV4Response,
  GenerateImageV4Request,
} from '@apis/__generated__/data-contracts';
import { queryClient } from '@apis/config/queryClient';
import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

export const postGenerateFullFunnelImage = async (
  requestData: GenerateImageV4Request
): Promise<GenerateImageV4Response> => {
  const response = await request<GenerateImageV4Response>({
    method: HTTPMethod.POST,
    url: API_ENDPOINT.GENERATE.IMAGE_V4,
    body: requestData,
  });

  // 응답은 200이지만 imageId가 오지 않는 예외 고려 (실제 발생 가능성은 낮음, 토끼 추천)
  if (typeof response.imageId !== 'number') {
    throw new Error('이미지 생성 응답에 imageId가 누락되었습니다');
  }

  return response;
};

export const useGenerateFullFunnelImageMutation = () => {
  const { setApiCompleted, setNavigationData, resetGenerate } =
    useGenerateStore();

  return useMutation<GenerateImageV4Response, Error, GenerateImageV4Request>({
    mutationFn: postGenerateFullFunnelImage,
    onSuccess: (data) => {
      resetGenerate();
      setNavigationData(data);
      setApiCompleted(true);
      queryClient.invalidateQueries({ queryKey: queryKeys.generate.image() });
      queryClient.invalidateQueries({ queryKey: queryKeys.mypage.images() });
      queryClient.invalidateQueries({ queryKey: queryKeys.mypage.user() });
    },
  });
};
