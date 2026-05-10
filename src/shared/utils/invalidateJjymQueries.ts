import { queryKeys } from '@constants/queryKey';

import type { QueryClient } from '@tanstack/react-query';

// 찜 토글과 관련된 쿼리키 무효화하는 함수
export const invalidateJjymRelatedQueries = (queryClient: QueryClient) => {
  const relatedKeys = [queryKeys.mypage.jjymList(), queryKeys.mypage.images()];

  relatedKeys.forEach((key) => {
    queryClient.invalidateQueries({ queryKey: key });
  });
};
