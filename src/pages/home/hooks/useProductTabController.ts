import { useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useProductFilterState } from '@pages/home/hooks/useProductFilterState';
import {
  MAX_SELECTED_PRODUCTS,
  useProductSelection,
} from '@pages/home/hooks/useProductSelection';
import type {
  ProductFilterChipCategory,
  SelectedProduct,
} from '@pages/home/types/productTab';
import { useFunnelStore } from '@pages/imageSetup/stores/useFunnelStore';

import { ROUTES } from '@routes/paths';

import { ENTRY_ROUTE, useImageFlowStore } from '@store/useImageFlowStore';
import { useUserStore } from '@store/useUserStore';

import { useToast } from '@components/toast/useToast';

import { setLoginRedirect } from '@utils/loginRedirect';

/**
 * 필터 상단 칩 선택 상태 기본값
 * - 어떤 칩도 펼쳐지지 않은 상태를 의미
 */
const INITIAL_CHIP_SELECTED: Record<ProductFilterChipCategory, boolean> = {
  furniture: false,
  price: false,
  color: false,
};

interface UseProductTabControllerOptions {
  /** mount 시 selectedProducts 초기값 - 외부로부터 상품 탭 진입(로그인 복귀/ResultPage의 상품 재선택)에서 복원 */
  initialSelectedProducts?: SelectedProduct[];
  /** mount 시 바텀시트 확장 상태 초기값 — ResultPage로부터 상품 탭 진입 시 바텀시트가 확장된 상태로 진입 */
  initialSheetExpanded?: boolean;
  /** mount 시 상품 탭 필터(applied/draft) 모두 초기 상태로 리셋 — 외부로부터 상품 탭 진입 시 필터 칩 모두 해제 (기획 요구사항) */
  resetFiltersOnMount?: boolean;
}

/**
 * 상품 탭 UI 오케스트레이션 훅
 * - 필터 상태(useProductFilterState)
 * - 상품 선택 상태(useProductSelection)
 * 를 조합해 ProductTab이 바로 쓰는 핸들러/props 제공
 */
const useProductTabController = ({
  initialSelectedProducts,
  initialSheetExpanded = false,
  resetFiltersOnMount = false,
}: UseProductTabControllerOptions = {}) => {
  const navigate = useNavigate();
  const { notify } = useToast();

  /** 바텀시트/칩 UI 상태 */
  const [sheetExpanded, setSheetExpanded] = useState(initialSheetExpanded);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [chipSelected, setChipSelected] = useState<
    Record<ProductFilterChipCategory, boolean>
  >(INITIAL_CHIP_SELECTED);

  /** 필터 도메인 상태 */
  const {
    furnitureOptions,
    priceOptions,
    colorOptions,
    appliedFilterChips,
    syncDraftFromApplied,
    resetDraft,
    clearAllFilters,
    toggleDraftChip,
    applyDraft,
    removeAppliedChip,
    isChipSelected,
    productListQueryParams,
  } = useProductFilterState();

  /** 상품 선택 도메인 상태 */
  const { selectedProducts, handleSelectProduct, handleRemoveSelectedProduct } =
    useProductSelection({ initialSelectedProducts });

  /** 외부 진입 시 필터 초기화 (applied + draft 모두) — mount 1회만 실행 */
  useEffect(() => {
    if (resetFiltersOnMount) {
      clearAllFilters();
      resetDraft();
    }
    // mount 시 1회. resetFiltersOnMount는 부모가 mount 시점에 결정한 값
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 상단 필터칩 클릭: 시트 열기/닫기 및 draft 동기화 */
  const handleFilterChipClick = useCallback(
    (category: ProductFilterChipCategory) => {
      if (chipSelected[category]) {
        setFilterSheetOpen(false);
        setChipSelected({ ...INITIAL_CHIP_SELECTED });
        return;
      }

      syncDraftFromApplied();
      setFilterSheetOpen(true);
      setChipSelected({
        furniture: category === 'furniture',
        price: category === 'price',
        color: category === 'color',
      });
    },
    [chipSelected, syncDraftFromApplied]
  );

  /** 필터 시트 닫기 + 칩 UI 초기화 */
  const handleFilterSheetClose = useCallback(() => {
    setFilterSheetOpen(false);
    setChipSelected({ ...INITIAL_CHIP_SELECTED });
  }, []);

  /** 필터 적용 확정 */
  const handleFilterApply = useCallback(() => {
    applyDraft();
    handleFilterSheetClose();
  }, [applyDraft, handleFilterSheetClose]);

  /** 상단 적용칩 제거(X) */
  const handleRemoveAppliedChip = useCallback(
    (category: ProductFilterChipCategory, _id: string) => {
      removeAppliedChip(category);
      if (filterSheetOpen) {
        syncDraftFromApplied();
      }
    },
    [filterSheetOpen, removeAppliedChip, syncDraftFromApplied]
  );

  /** 필터 시트 내부 초기화 */
  const handleFilterResetClick = useCallback(() => {
    resetDraft();
  }, [resetDraft]);

  /**
   * "이 상품들로 우리 집 꾸미기" CTA 핸들러
   * - 기능: 선택된 가구 0개 가드, 도면 선택 퍼널 진입 전 funnel reset, entryRoute/preset 세팅 후 로그인 게이트 분기
   * - StyleDetailPage.handleCta 패턴과 동일 구조 (setFlow → 로그인 분기)
   */
  const handleDecorateWithProductsClick = useCallback(() => {
    if (selectedProducts.length === 0) {
      notify({ text: '상품을 1개 이상 선택해주세요' });
      return;
    }

    // 이전 풀퍼널 잔재(floorPlan)가 살아있으면 도면 선택 없이 LoadingPage 진입 위험
    // → 항상 새로 도면 선택을 거치도록 reset
    useFunnelStore.getState().reset();

    useImageFlowStore.getState().setFlow({
      entryRoute: ENTRY_ROUTE.PRODUCT_SELECTION,
      preset: {
        type: 'product',
        productIds: selectedProducts.map((p) => p.id),
        productsToBeRestored: selectedProducts,
      },
    });

    const isLoggedIn = !!useUserStore.getState().accessToken;
    if (!isLoggedIn) {
      setLoginRedirect(ROUTES.HOME);
      navigate(ROUTES.LOGIN);
      return;

      // 이후 로그인 복귀 시 HOME으로 이동 -> HomePage가 preset.productsToBeRestored 감지해 상품 탭으로 이동, ProductTab이 store 값을 useState 초기값으로 복원
    }

    navigate(ROUTES.IMAGE_SETUP);
  }, [navigate, notify, selectedProducts]);

  /** ProductTab에서 사용할 공개 값 */
  return {
    sheetExpanded,
    setSheetExpanded,
    filterSheetOpen,
    chipSelected,
    appliedFilterChips,
    selectedProducts,
    filterSheetProps: {
      furnitureOptions,
      priceOptions,
      colorOptions,
      isChipSelected,
      onChipClick: toggleDraftChip,
    },
    productListQueryParams,
    handleFilterChipClick,
    handleRemoveAppliedChip,
    handleSelectProduct,
    handleRemoveSelectedProduct,
    handleDecorateWithProductsClick,
    handleFilterSheetClose,
    handleFilterApply,
    handleFilterResetClick,
  };
};

export { MAX_SELECTED_PRODUCTS, useProductTabController };
