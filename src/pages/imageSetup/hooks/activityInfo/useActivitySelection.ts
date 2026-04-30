import type { ActivityWithFurnitureResponse } from '@apis/__generated__/data-contracts';

/**
 * 주요활동 선택 로직을 담당하는 훅
 *
 * swagger 자동 생성 타입은 모든 필드를 optional로 표기하지만,
 * 백엔드 명세상 활동/가구 응답 필드는 모두 필수로 옴 → non-null assertion(!) 사용
 */
export const useActivitySelection = (
  activities: ActivityWithFurnitureResponse[] | undefined,
  selectedActivity: string | undefined
) => {
  // 현재 선택된 주요활동 객체
  const selectedActivityItem = selectedActivity
    ? activities?.find((activity) => activity.code === selectedActivity)
    : undefined;

  // 선택된 활동의 필수 가구 ID 리스트
  const getRequiredFurnitureIds = (): number[] => {
    if (!selectedActivityItem?.furnitures) return [];
    return selectedActivityItem.furnitures.map((furniture) => furniture.id!);
  };

  // 선택된 활동의 필수 가구 label 리스트 (토스트/안내 문구 용도)
  const getRequiredFurnitureLabels = (): string[] => {
    if (!selectedActivityItem?.furnitures) return [];
    return selectedActivityItem.furnitures.map((furniture) => furniture.label!);
  };

  return {
    selectedActivityItem,
    getRequiredFurnitureIds,
    getRequiredFurnitureLabels,
  };
};
