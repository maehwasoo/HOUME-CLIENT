import { useCallback, useEffect, useMemo, useRef } from 'react';

import {
  COUNT_TRIGGER_EVENT,
  getShopListContextParams,
  getShopListProductScrollParams,
  trackShopFilterListClick,
  trackShopFilterSheetResetClick,
  trackShopFilterSheetSubmit,
  trackShopFilterSheetView,
  trackShopSearchBarClick,
  trackShopSearchClear,
  trackShopSearchSubmit,
  trackShopSelectSheetAddItemClick,
  trackShopSelectSheetCtaClick,
  trackShopSelectSheetItemClick,
  trackShopSelectSheetItemCountChange,
  trackShopSelectSheetRemoveClick,
  trackShopSelectSheetSwipe,
  trackShopSelectSheetView,
} from '@pages/home/analytics/shopAnalytics';
import { useShopAnalyticsContext } from '@pages/home/analytics/useShopAnalyticsContext';
import {
  MAX_SELECTED_PRODUCTS,
  type ProductTabController,
} from '@pages/home/hooks/useProductTabController';
import type { SelectedProduct } from '@pages/home/types/productTab';
import { useRecentFloorPlanQuery } from '@pages/imageSetup/v2/apis/queries/useRecentFloorPlanQuery';

import { GA_EVENTS } from '@shared/analytics/events';
import {
  useAnalyticsPageView,
  useScrollDepthTrack,
} from '@shared/analytics/hooks';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { resolveShopImageEntryRoute } from '@shared/analytics/utils/shop/resolveShopEntryRoute';

interface UseProductShopAnalyticsOptions {
  productCountViewed: number;
  onProductViewedCountChange: (count: number) => void;
}

/**
 * 상품 탭 GA — controller 비즈니스 핸들러에 이벤트 전송을 래핑
 */
const useProductShopAnalytics = (
  controller: ProductTabController,
  {
    productCountViewed,
    onProductViewedCountChange,
  }: UseProductShopAnalyticsOptions
) => {
  const { data: recentFloorPlanData } = useRecentFloorPlanQuery();
  const hasTrackedSelectSheetViewRef = useRef(false);

  const {
    sheetExpanded,
    setSheetExpanded: setSheetExpandedState,
    filterSheetOpen,
    selectedProducts,
    keyword,
    handleFilterChipClick,
    handleFilterApply,
    handleFilterResetClick,
    handleSelectProduct,
    handleRemoveSelectedProduct,
    handleDecorateWithProductsClick,
    handleSearchKeywordChange,
  } = controller;

  const {
    productCountViewedRef,
    selectedProductsRef,
    enrichProductSubCategory,
    getShopListContext,
    getSelectSheetContext,
    getSelectSheetContextRef,
    shopListContext,
  } = useShopAnalyticsContext({ controller, productCountViewed });

  const listProductScrollParams = useMemo(
    () => getShopListProductScrollParams(shopListContext),
    [shopListContext]
  );

  const shopPageParams = useMemo(
    () =>
      getShopListContextParams(shopListContext, {
        includeLoginStatus: true,
        includeTriggerContext: true,
      }),
    [shopListContext]
  );

  useAnalyticsPageView(
    GA_EVENTS.shop.PAGE_VIEW,
    SCREEN_NAME.SHOP,
    shopPageParams
  );

  const pageScrollParams = useMemo(
    () =>
      getShopListContextParams(shopListContext, {
        includeLoginStatus: true,
        includeProductCountViewed: true,
      }),
    [shopListContext]
  );

  useScrollDepthTrack(GA_EVENTS.shop.PAGE_SCROLL, SCREEN_NAME.SHOP, {
    extraParams: pageScrollParams,
  });

  useScrollDepthTrack(GA_EVENTS.shop.LIST_PRODUCT_SCROLL, SCREEN_NAME.SHOP, {
    extraParams: listProductScrollParams,
  });

  // 선택 바텀시트(DragHandleBottomSheet open={!filterSheetOpen}) 최초 노출 시 1회
  useEffect(() => {
    if (filterSheetOpen) return;
    if (hasTrackedSelectSheetViewRef.current) return;

    hasTrackedSelectSheetViewRef.current = true;
    trackShopSelectSheetView(getSelectSheetContext());
  }, [filterSheetOpen, getSelectSheetContext]);

  const trackSelectSheetCountChange = useCallback(
    (
      nextProducts: SelectedProduct[],
      countTriggerEvent: (typeof COUNT_TRIGGER_EVENT)[keyof typeof COUNT_TRIGGER_EVENT]
    ) => {
      trackShopSelectSheetItemCountChange(
        getSelectSheetContext({
          selectedProducts: nextProducts,
          countTriggerEvent,
        })
      );
    },
    [getSelectSheetContext]
  );

  const setSheetExpanded = useCallback(
    (nextExpanded: boolean) => {
      setSheetExpandedState((prev) => {
        if (prev === nextExpanded) return prev;

        trackShopSelectSheetSwipe(
          nextExpanded
            ? GA_EVENTS.shop.SELECT_SHEET_SWIPE_UP
            : GA_EVENTS.shop.SELECT_SHEET_SWIPE_DOWN,
          getSelectSheetContextRef.current({ sheetExpanded: nextExpanded })
        );

        return nextExpanded;
      });
    },
    [setSheetExpandedState]
  );

  const handleProductListRender = useCallback(
    (count: number) => {
      productCountViewedRef.current = count;
      onProductViewedCountChange(count);
    },
    [onProductViewedCountChange]
  );

  const handleFilterChipClickWithAnalytics = useCallback(
    (category: Parameters<typeof handleFilterChipClick>[0]) => {
      const wasOpen = controller.chipSelected[category];

      trackShopFilterListClick(category);
      handleFilterChipClick(category);

      if (!wasOpen) {
        trackShopFilterSheetView(getShopListContext(), sheetExpanded);
      }
    },
    [
      controller.chipSelected,
      getShopListContext,
      handleFilterChipClick,
      sheetExpanded,
    ]
  );

  const handleFilterApplyWithAnalytics = useCallback(() => {
    // apply 직후 appliedValues는 아직 stale → 방금 적용한 값을 명시 전달해 filterSht_submit이 올바른 필터를 기록
    const applied = handleFilterApply();
    trackShopFilterSheetSubmit(getShopListContext(applied), sheetExpanded);
  }, [getShopListContext, handleFilterApply, sheetExpanded]);

  const handleFilterResetClickWithAnalytics = useCallback(() => {
    handleFilterResetClick();
    trackShopFilterSheetResetClick(getShopListContext(), sheetExpanded);
  }, [getShopListContext, handleFilterResetClick, sheetExpanded]);

  const handleSelectProductWithAnalytics = useCallback(
    (product: SelectedProduct) => {
      const enrichedProduct = enrichProductSubCategory(product);
      const prev = selectedProductsRef.current;
      if (prev.some((item) => item.id === enrichedProduct.id)) return;

      handleSelectProduct(enrichedProduct);

      if (prev.length >= MAX_SELECTED_PRODUCTS) return;

      trackSelectSheetCountChange(
        [...prev, enrichedProduct],
        COUNT_TRIGGER_EVENT.ADD_CLICK
      );
    },
    [enrichProductSubCategory, handleSelectProduct, trackSelectSheetCountChange]
  );

  const handleRemoveSelectedProductWithAnalytics = useCallback(
    (id: number) => {
      const nextProducts = selectedProductsRef.current.filter(
        (product) => product.id !== id
      );
      const removedProduct = selectedProductsRef.current.find(
        (product) => product.id === id
      );

      if (removedProduct) {
        trackShopSelectSheetRemoveClick(
          getSelectSheetContext(),
          enrichProductSubCategory(removedProduct)
        );
      }

      trackSelectSheetCountChange(
        nextProducts,
        COUNT_TRIGGER_EVENT.REMOVE_CLICK
      );
      handleRemoveSelectedProduct(id);
    },
    [
      enrichProductSubCategory,
      getSelectSheetContext,
      handleRemoveSelectedProduct,
      trackSelectSheetCountChange,
    ]
  );

  const handleAddProductClickWithAnalytics = useCallback(() => {
    if (selectedProducts.length === 0) {
      trackShopSelectSheetAddItemClick(getSelectSheetContext());
    }
    setSheetExpanded(false);
  }, [getSelectSheetContext, selectedProducts.length, setSheetExpanded]);

  const handleSearchBarClick = useCallback(() => {
    trackShopSearchBarClick();
  }, []);

  const handleSearchSubmit = useCallback(() => {
    trackShopSearchSubmit({
      ...getShopListContext(),
      searchKeyword: keyword,
    });
  }, [getShopListContext, keyword]);

  const handleSearchClear = useCallback(() => {
    trackShopSearchClear(getShopListContext());
    handleSearchKeywordChange('');
  }, [getShopListContext, handleSearchKeywordChange]);

  const handleDecorateWithProductsClickWithAnalytics = useCallback(() => {
    if (selectedProducts.length === 0) {
      handleDecorateWithProductsClick();
      return;
    }

    trackShopSelectSheetCtaClick({
      ...getShopListContext(),
      sheetExpanded,
      selectedProducts,
      imageEntryRoute: resolveShopImageEntryRoute(),
      // 상품 탭 CTA의 return screen은 항상 shop 고정 (진입 경로는 image_entry_route로 별도 계산)
      returnScreenName: SCREEN_NAME.SHOP,
      hasPreviousSpace: recentFloorPlanData?.hasRecentImage === true,
      hasPreviousImage: recentFloorPlanData?.hasRecentImage === true,
    });

    handleDecorateWithProductsClick();
  }, [
    getShopListContext,
    handleDecorateWithProductsClick,
    recentFloorPlanData,
    selectedProducts,
    sheetExpanded,
  ]);

  const handleSelectSheetItemClick = useCallback(
    (product: SelectedProduct) => {
      trackShopSelectSheetItemClick(
        getSelectSheetContext(),
        enrichProductSubCategory(product)
      );
    },
    [enrichProductSubCategory, getSelectSheetContext]
  );

  return {
    shopListContext,
    setSheetExpanded,
    handleProductListRender,
    handleFilterChipClick: handleFilterChipClickWithAnalytics,
    handleFilterApply: handleFilterApplyWithAnalytics,
    handleFilterResetClick: handleFilterResetClickWithAnalytics,
    handleSelectProduct: handleSelectProductWithAnalytics,
    handleSelectProductFromDetailModal: handleSelectProduct,
    handleRemoveSelectedProduct: handleRemoveSelectedProductWithAnalytics,
    handleAddProductClick: handleAddProductClickWithAnalytics,
    handleDecorateWithProductsClick:
      handleDecorateWithProductsClickWithAnalytics,
    handleSearchBarClick,
    handleSearchSubmit,
    handleSearchClear,
    handleSelectSheetItemClick,
  };
};

export { useProductShopAnalytics };
