import { useEffect, useRef } from 'react';

import { useImageFlowStore } from '@store/useImageFlowStore';

import { useToast } from '@components/toast/useToast';

import { useFunnelStore } from '../../stores/useFunnelStore';
import { useHouseTemplateDetailQuery } from '../apis/queries/useHouseTemplateDetailQuery';
import { useHouseTemplatesQuery } from '../apis/queries/useHouseTemplatesQuery';
import { useRecentFloorPlanQuery } from '../apis/queries/useRecentFloorPlanQuery';
import { FILTER_CATEGORIES } from '../constants/floorPlanFilters';
import { useFloorPlanStore } from '../stores/useFloorPlanStore';

import type {
  CompletedFloorPlanSelect,
  ImageSetupSteps,
} from '../../types/funnel/steps';

export const useFloorPlanSelect = (
  _context: ImageSetupSteps['FloorPlanSelect'],
  onNext: (data: CompletedFloorPlanSelect) => void
) => {
  const store = useFloorPlanStore();
  const { notify } = useToast();

  // 도면 전체 조회 (필터 변경 시 자동 refetch — queryKey에 appliedFilters 포함)
  const { data: houseTemplatesData } = useHouseTemplatesQuery(
    store.appliedFilters
  );
  const floorPlans = houseTemplatesData?.floorPlans ?? [];

  // 도면 상세 조회 (카드 선택 -> floorPlanId가 null이 아닐 때 쿼리 enabled)
  const { data: detailData } = useHouseTemplateDetailQuery(
    store.selectedFloorPlanId
  );
  const selectedFloorPlanName = detailData?.floorPlanName ?? '';
  const selectedEquilibrium = detailData?.equilibrium ?? '';
  const selectedDetailViews = detailData?.floorPlans ?? []; // [{imageUrl, view}]

  // 최근 사용 도면 조회 (RecentSheet 용도)
  const { data: recentFloorPlanData } = useRecentFloorPlanQuery();
  const recentFloorPlan = recentFloorPlanData?.hasRecentImage
    ? (recentFloorPlanData.floorPlan ?? null)
    : null;

  // 시트 자동 오픈 우선순위 (마운트 시 1회 평가):
  // 1순위: useFunnelStore.floorPlan 있음 → FloorPlanSheet 복원 (로그인 게이트 복귀)
  // 2순위: useImageFlowStore.preset.type === 'floorPlan' → FloorPlanSheet 오픈, 이후 바로 preset 소비 (LoadingPage에 preset이 불필요하므로 바로 null 처리)
  // 그 외: 자동 오픈 없음
  useEffect(() => {
    const savedFloorPlan = useFunnelStore.getState().floorPlan;
    if (savedFloorPlan) {
      store.restoreFloorPlan(
        savedFloorPlan.floorPlanId,
        savedFloorPlan.isMirror
      );
      store.openFloorPlanSheet();
      return;
    }

    const preset = useImageFlowStore.getState().preset;
    if (preset?.type === 'floorPlan') {
      store.selectNewFloorPlan(preset.floorPlanId);
      store.openFloorPlanSheet();
      // FLOOR_PLAN 경로는 풀퍼널이므로 LoadingPage가 preset을 사용하지 않음 → 시트 오픈 후 즉시 클리어
      useImageFlowStore.getState().clearPreset();
    }
    // 마운트 시 1회만 평가
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // RecentSheet 자동 오픈: FloorPlanSheet가 자동 오픈되지 않은 모든 경로에서 표시
  // recentFloorPlan이 캐시된 상태로 진입하면 위 useEffect와 같은 mount commit에서 함께 실행되는데,
  // 그때 `store` 변수는 첫 렌더의 snapshot이라 위 effect의 openFloorPlanSheet()가 반영되지 않음.
  // -> useFloorPlanStore.getState()로 zustand에서 동기적으로 최신값을 읽어 race condition 방지!
  const recentHandledRef = useRef(false);
  useEffect(() => {
    if (recentHandledRef.current) return;
    if (!recentFloorPlan) return;
    if (useFloorPlanStore.getState().isFloorPlanSheetOpen) return;

    recentHandledRef.current = true;
    store.openRecentSheet();
    notify({ text: '저장된 내 공간을 불러왔어요.' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentFloorPlan]);

  // 로그인 게이트 복귀 등으로 도면 상세가 새로 fetch될 때, funnelStore에 저장된 floorPlanView와
  // 일치하는 슬라이드 인덱스를 복원해 사용자가 이전에 보던 도면 view가 그대로 노출되도록 함
  // floorPlanId가 일치할 때만 복원 — 다른 도면이 같은 view 라벨을 가진 경우 의도치 않게 강제 복원되는 것을 방지
  useEffect(() => {
    const saved = useFunnelStore.getState().floorPlan;
    if (!saved?.floorPlanView || !detailData?.floorPlans) return;
    if (saved.floorPlanId !== detailData.floorPlanId) return;

    const idx = detailData.floorPlans.findIndex(
      (p) => p.view === saved.floorPlanView
    );
    if (idx >= 0) store.setViewIndex(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailData]);

  const handleCardClick = (floorPlanId: number) => {
    store.selectNewFloorPlan(floorPlanId);
    store.openFloorPlanSheet();
  };

  // 도면 선택 후 바텀시트 "공간 선택하기" CTA
  const handleConfirmFloorPlan = () => {
    if (store.selectedFloorPlanId === null) return;

    // 도면 swiper에서 사용자가 선택한 view(ex: 창가뷰)를 string으로 가져옴
    const floorPlanView =
      selectedDetailViews[store.selectedViewIndex]?.view ?? '';

    const floorPlanData: CompletedFloorPlanSelect['floorPlan'] = {
      floorPlanId: store.selectedFloorPlanId,
      isMirror: store.isMirror,
      floorPlanView,
    };
    useFunnelStore.getState().setFloorPlan(floorPlanData);
    onNext({ floorPlan: floorPlanData });
  };

  // 최근 생성 공간 바텀시트 "공간 선택하기" CTA
  const handleConfirmRecentFloorPlan = () => {
    if (!recentFloorPlan?.id) return;
    store.closeRecentSheet();

    const floorPlanData: CompletedFloorPlanSelect['floorPlan'] = {
      floorPlanId: recentFloorPlan.id,
      isMirror: store.isMirror,
      floorPlanView: recentFloorPlan.view ?? '',
    };
    useFunnelStore.getState().setFloorPlan(floorPlanData);
    onNext({ floorPlan: floorPlanData });
  };

  return {
    filterCategories: FILTER_CATEGORIES,
    floorPlans,
    selectedFloorPlanName,
    selectedEquilibrium,
    selectedDetailViews,
    recentFloorPlan,
    handleCardClick,
    handleConfirmFloorPlan,
    handleConfirmRecentFloorPlan,

    // 필터 그리드에서 사용하는 상태/액션
    grid: {
      appliedFilters: store.appliedFilters,
      onFilterChipClick: store.openFilterSheet,
      onFilterChipClear: store.clearAppliedFilter,
    },

    // FilterSheet props
    filterSheet: {
      open: store.isFilterSheetOpen,
      onClose: store.closeFilterSheet,
      pendingFilters: store.pendingFilters,
      onFilterChange: store.setPendingFilter,
      onApply: () => {
        store.applyFilters();
        store.closeFilterSheet();
      },
      onReset: store.resetFilters,
    },

    // FloorPlanSheet (도면 상세) props
    floorPlanSheet: {
      open: store.isFloorPlanSheetOpen,
      onClose: store.closeFloorPlanSheet,
    },

    // FloorPlanSheet (최근 공간) props
    recentSheet: {
      open: store.isRecentSheetOpen,
      onClose: store.closeRecentSheet,
    },
  };
};
