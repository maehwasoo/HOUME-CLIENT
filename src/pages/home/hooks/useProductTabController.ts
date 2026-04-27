import { useCallback, useState } from 'react';

import { useProductFilterState } from '@pages/home/hooks/useProductFilterState';
import {
  MAX_SELECTED_PRODUCTS,
  useProductSelection,
} from '@pages/home/hooks/useProductSelection';
import type { ProductFilterChipCategory } from '@pages/home/types/productTab';

/**
 * 필터 상단 칩 선택 상태 기본값
 * - 어떤 칩도 펼쳐지지 않은 상태를 의미
 */
const INITIAL_CHIP_SELECTED: Record<ProductFilterChipCategory, boolean> = {
  furniture: false,
  price: false,
  color: false,
};

/**
 * 상품 탭 UI 오케스트레이션 훅
 * - 필터 상태(useProductFilterState)
 * - 상품 선택 상태(useProductSelection)
 * 를 조합해 ProductTab이 바로 쓰는 핸들러/props 제공
 */
const useProductTabController = () => {
  /** 바텀시트/칩 UI 상태 */
  const [sheetExpanded, setSheetExpanded] = useState(false);
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
    toggleDraftChip,
    applyDraft,
    removeAppliedChip,
    isChipSelected,
    productListQueryParams,
  } = useProductFilterState();

  /** 상품 선택 도메인 상태 */
  const {
    selectedProducts,
    handleSelectProduct,
    handleRemoveSelectedProduct,
    handleDecorateWithProductsClick,
  } = useProductSelection();

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
