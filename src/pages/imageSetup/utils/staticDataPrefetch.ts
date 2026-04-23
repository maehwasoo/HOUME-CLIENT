import { queryKeys } from '@constants/queryKey';

import { getActivities } from '../apis/queries/useActivitiesQuery';
import { getFurnitureCategories } from '../apis/queries/useFurnitureCategoriesQuery';
import { getHousingOptions } from '../apis/queries/useHousingOptionsQuery';
import { getMoodBoardImage } from '../apis/queries/useMoodBoardQuery';
import { MOOD_BOARD_CONSTANTS } from '../types/apis/interiorStyle';

import type { QueryClient } from '@tanstack/react-query';

/**
 * 앱 시작 시점에 미리 로딩할 데이터들을 prefetch하는 함수
 */
export const prefetchStaticData = (queryClient: QueryClient) => {
  // 주거 옵션 데이터 (주거 형태, 구조, 평형)
  queryClient.prefetchQuery({
    queryKey: queryKeys.imageSetup.housingOptions(),
    queryFn: getHousingOptions,
    staleTime: Infinity, // 정적 데이터이므로 무한 캐싱
    gcTime: 1000 * 60 * 60 * 24, // 24시간 가비지 컬렉션
  });

  // 주요활동 데이터 (활동 목록 + 활동별 필수 가구)
  queryClient.prefetchQuery({
    queryKey: queryKeys.imageSetup.activities(),
    queryFn: getActivities,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
  });

  // 가구 카테고리 데이터 (카테고리 + 카테고리별 가구)
  queryClient.prefetchQuery({
    queryKey: queryKeys.imageSetup.furnitureCategories(),
    queryFn: getFurnitureCategories,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
  });

  // 도면 이미지 데이터: roomType에 따라 다르므로 prefetch하지 않음
  // FloorPlan 컴포넌트에서 도면 요청

  // 무드보드 이미지 데이터
  queryClient.prefetchQuery({
    queryKey: queryKeys.imageSetup.moodBoard(
      MOOD_BOARD_CONSTANTS.DEFAULT_LIMIT
    ),
    queryFn: () => getMoodBoardImage(),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
  });
};
