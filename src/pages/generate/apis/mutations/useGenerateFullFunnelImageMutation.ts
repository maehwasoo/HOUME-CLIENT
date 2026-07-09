import { useMutation } from '@tanstack/react-query';

import type { GeneratedImagePayload } from '@pages/generate/types/generate';
import { useGenerateStore } from '@pages/generate/v2/stores/useGenerateStore';

import type {
  GenerateImageV4Response,
  GenerateImageV4Request,
} from '@apis/__generated__/data-contracts';
import { queryClient } from '@apis/config/queryClient';
import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

import { toGeneratedImagePayload } from './toGeneratedImagePayload';

export const postGenerateFullFunnelImage = async (
  requestData: GenerateImageV4Request
): Promise<GeneratedImagePayload> => {
  const response = await request<GenerateImageV4Response>({
    method: HTTPMethod.POST,
    url: API_ENDPOINT.GENERATE.IMAGE_V4,
    body: requestData,
  });

  return toGeneratedImagePayload(response);
};

export const useGenerateFullFunnelImageMutation = () => {
  const { setApiCompleted, setNavigationData, resetGenerate } =
    useGenerateStore();

  return useMutation<GeneratedImagePayload, Error, GenerateImageV4Request>({
    mutationFn: postGenerateFullFunnelImage,
    onSuccess: (data) => {
      resetGenerate();
      setNavigationData(data);
      setApiCompleted(true);
      queryClient.invalidateQueries({ queryKey: queryKeys.generate.image() });
      queryClient.invalidateQueries({ queryKey: queryKeys.mypage.images() });
      queryClient.invalidateQueries({ queryKey: queryKeys.mypage.user() });
      // 모든 생성 경로는 도면 선택이 필수 → 생성 성공 시 '최근 생성한 도면' 갱신
      queryClient.invalidateQueries({
        queryKey: queryKeys.imageSetup.recentFloorPlan(),
      });
    },
  });
};
