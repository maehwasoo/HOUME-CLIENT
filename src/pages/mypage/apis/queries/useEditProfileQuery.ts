import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { MyPageProfileResponse } from '@apis/__generated__/data-contracts';
import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

// 마이페이지 프로필 조회
type UseMyPageUserOptions = Omit<
  UseQueryOptions<MyPageProfileResponse, Error, MyPageProfileResponse>,
  'queryKey' | 'queryFn'
>;

export const getMyPageProfile = async (): Promise<MyPageProfileResponse> => {
  return request<MyPageProfileResponse>({
    method: HTTPMethod.GET,
    url: API_ENDPOINT.USER.MYPAGE_PROFILE,
  });
};

export const useMyPageProfileQuery = (options?: UseMyPageUserOptions) => {
  return useQuery<MyPageProfileResponse>({
    queryKey: queryKeys.mypage.profile(),
    queryFn: getMyPageProfile,
    refetchOnWindowFocus: false,
    ...options,
  });
};
