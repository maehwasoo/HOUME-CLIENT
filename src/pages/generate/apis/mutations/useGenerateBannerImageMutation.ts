import { useMutation } from '@tanstack/react-query';

import { useGenerateStore } from '@pages/generate/v2/stores/useGenerateStore';

import type {
  BannerGenerateImageRequest,
  BannerGenerateImageResponse,
} from '@apis/__generated__/data-contracts';
import { queryClient } from '@apis/config/queryClient';
import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

export const postGenerateBannerImage = async (
  requestData: BannerGenerateImageRequest
): Promise<BannerGenerateImageResponse> => {
  const response = await request<BannerGenerateImageResponse>({
    method: HTTPMethod.POST,
    url: API_ENDPOINT.GENERATE.IMAGE_BANNER,
    body: requestData,
  });

  // 응답은 200이지만 imageId가 오지 않는 예외 고려 (실제 발생 가능성은 낮음)
  if (typeof response.imageId !== 'number') {
    throw new Error('이미지 생성 응답에 imageId가 누락되었습니다');
  }

  return response;
};

export const useGenerateBannerImageMutation = () => {
  const { setApiCompleted, setNavigationData, resetGenerate } =
    useGenerateStore();

  return useMutation<
    BannerGenerateImageResponse,
    Error,
    BannerGenerateImageRequest
  >({
    mutationFn: postGenerateBannerImage,
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
