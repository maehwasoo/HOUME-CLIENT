// 도면 바텀시트 전용 로직
// 도면 상세 바텀시트 안에서의 뷰 전환 + 좌우반전 로직 담당

import { useMemo } from 'react';

import { useFloorPlanStore } from '../stores/useFloorPlanStore';

import type { FloorPlanDetailView } from '../types/floorPlan';

export const useFloorPlanSheet = (detailViews: FloorPlanDetailView[]) => {
  const { selectedViewIndex, setViewIndex, isMirror, toggleMirror } =
    useFloorPlanStore();

  const isMultiView = detailViews.length > 1;

  const currentView = useMemo(
    () => detailViews[selectedViewIndex] ?? detailViews[0] ?? null,
    [detailViews, selectedViewIndex]
  );

  return {
    currentView, // 현재 보고 있는 뷰 (FloorPlanDetailView)
    selectedViewIndex, // 현재 뷰 인덱스
    setViewIndex, // 뷰 인덱스 직접 설정 (Swiper 연동)
    isMultiView, // 뷰 2개 이상 → prev/next 버튼 표시
    isMirror, // 좌우반전 상태
    toggleMirror, // 좌우반전 토글
  };
};
