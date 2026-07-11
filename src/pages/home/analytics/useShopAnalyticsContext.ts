import { useCallback, useEffect, useMemo, useRef } from 'react';

import {
  type ShopListContext,
  type ShopSelectSheetContext,
} from '@pages/home/analytics/shopAnalytics';
import type { ProductTabController } from '@pages/home/hooks/useProductTabController';
import type { SelectedProduct } from '@pages/home/types/productTab';
import { withProductSubCategory } from '@pages/home/utils/productFilterUtils';

interface UseShopAnalyticsContextParams {
  controller: ProductTabController;
  productCountViewed: number;
}

/**
 * 상품 탭 GA context 빌더 — 필터/검색/선택 상태를 ShopListContext·SelectSheetContext로 조립.
 * ref 최신화까지 담당해, useProductShopAnalytics는 이벤트 래핑에만 집중한다.
 */
export const useShopAnalyticsContext = ({
  controller,
  productCountViewed,
}: UseShopAnalyticsContextParams) => {
  const {
    sheetExpanded,
    selectedProducts,
    debouncedKeyword,
    appliedValues,
    appliedFilterChips,
    furnitureLabels,
    furnitureSubCategoryByNameKr,
    priceLabels,
    colorLabels,
    productCount,
  } = controller;

  const productCountViewedRef = useRef(productCountViewed);
  const selectedProductsRef = useRef(selectedProducts);
  const furnitureSubCategoryByNameKrRef = useRef(furnitureSubCategoryByNameKr);

  useEffect(() => {
    productCountViewedRef.current = productCountViewed;
  }, [productCountViewed]);

  useEffect(() => {
    selectedProductsRef.current = selectedProducts;
  }, [selectedProducts]);

  useEffect(() => {
    furnitureSubCategoryByNameKrRef.current = furnitureSubCategoryByNameKr;
  }, [furnitureSubCategoryByNameKr]);

  const enrichProductSubCategory = useCallback(
    (product: SelectedProduct) =>
      withProductSubCategory(product, furnitureSubCategoryByNameKrRef.current),
    []
  );

  const getShopListContext = useCallback(
    (
      overrides?: Pick<
        ShopListContext,
        'appliedValues' | 'appliedFilterChips' | 'productCount'
      >
    ): ShopListContext => ({
      searchKeyword: debouncedKeyword,
      appliedValues: overrides?.appliedValues ?? appliedValues,
      appliedFilterChips: overrides?.appliedFilterChips ?? appliedFilterChips,
      furnitureLabels,
      priceLabels,
      colorLabels,
      productCount:
        overrides && 'productCount' in overrides
          ? overrides.productCount
          : productCount,
      productCountViewed: productCountViewedRef.current,
    }),
    [
      appliedFilterChips,
      appliedValues,
      colorLabels,
      debouncedKeyword,
      furnitureLabels,
      priceLabels,
      productCount,
    ]
  );

  const getSelectSheetContext = useCallback(
    (overrides?: Partial<ShopSelectSheetContext>): ShopSelectSheetContext => ({
      ...getShopListContext(),
      sheetExpanded: overrides?.sheetExpanded ?? sheetExpanded,
      selectedProducts:
        overrides?.selectedProducts ?? selectedProductsRef.current,
      countTriggerEvent: overrides?.countTriggerEvent,
    }),
    [getShopListContext, sheetExpanded]
  );

  const getSelectSheetContextRef = useRef(getSelectSheetContext);
  useEffect(() => {
    getSelectSheetContextRef.current = getSelectSheetContext;
  }, [getSelectSheetContext]);

  const shopListContext = useMemo(
    () => ({
      ...getShopListContext(),
      productCountViewed,
    }),
    [getShopListContext, productCountViewed]
  );

  return {
    productCountViewedRef,
    selectedProductsRef,
    enrichProductSubCategory,
    getShopListContext,
    getSelectSheetContext,
    getSelectSheetContextRef,
    shopListContext,
  };
};
