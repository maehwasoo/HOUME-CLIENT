import type { ProductFilterValues } from '@pages/home/hooks/useProductFilterState';
import type {
  AppliedFilterChip,
  SelectedProduct,
} from '@pages/home/types/productTab';
import { ALL_FILTER_SENTINEL } from '@pages/home/utils/productFilterUtils';

import { getProductCardOnCardParams } from '@shared/analytics/params/builders/productCard';
import { type CountTriggerEvent } from '@shared/analytics/params/shop';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { toSheetExpansionStatus } from '@shared/analytics/utils/imageFlow';
import { loginStatusParams } from '@shared/analytics/utils/loginStatus';
import { resolveShopTriggerContext } from '@shared/analytics/utils/shop/resolveShopTriggerContext';

type FilterLabelMap = Record<string, string>;

export interface ShopListContext {
  searchKeyword?: string;
  appliedValues?: ProductFilterValues;
  appliedFilterChips?: AppliedFilterChip[];
  furnitureLabels?: FilterLabelMap;
  priceLabels?: FilterLabelMap;
  colorLabels?: FilterLabelMap;
  productCount?: number;
  productCountViewed?: number;
}

export interface ShopSelectSheetContext extends ShopListContext {
  sheetExpanded: boolean;
  selectedProducts: SelectedProduct[];
  countTriggerEvent?: CountTriggerEvent;
}

export const shopScreenParams = () => ({
  screen_name: SCREEN_NAME.SHOP,
});

const labelsFromIds = (ids: string[] | undefined, labels: FilterLabelMap) => {
  if (!ids?.length) return undefined;

  const formatted = ids
    .filter((id) => id !== ALL_FILTER_SENTINEL)
    .map((id) => labels[id] ?? id)
    .filter(Boolean)
    .join(', ');

  return formatted || undefined;
};

type ShopListParamsOptions = {
  includeLoginStatus?: boolean;
  includeTriggerContext?: boolean;
  includeProductCountViewed?: boolean;
  isEmptyList?: boolean;
  sheetExpanded?: boolean;
};

export const formatSelectedProductIds = (products: SelectedProduct[]) =>
  products.length > 0
    ? products.map((product) => product.id).join(', ')
    : undefined;

const formatSelectedSubCategoryTypes = (products: SelectedProduct[]) => {
  const subCategoryTypes = products
    .map((product) => product.subCategoryName)
    .filter(Boolean)
    .join(', ');

  return subCategoryTypes || undefined;
};

export const formatSelectedShopKeywordFilters = (
  appliedFilterChips?: AppliedFilterChip[]
) => {
  const selected = appliedFilterChips
    ?.filter((chip) => chip.applied)
    .map((chip) => chip.label)
    .join(', ');

  return selected || undefined;
};

export const getShopListContextParams = (
  {
    searchKeyword,
    appliedValues,
    appliedFilterChips,
    furnitureLabels = {},
    priceLabels = {},
    colorLabels = {},
    productCount,
    productCountViewed,
  }: ShopListContext = {},
  options?: ShopListParamsOptions
) => {
  return {
    ...(options?.includeLoginStatus ? loginStatusParams() : {}),
    ...shopScreenParams(),
    search_keyword: searchKeyword?.trim() || undefined,
    selected_shop_keyword_filters:
      formatSelectedShopKeywordFilters(appliedFilterChips),
    filter_shop_furniture_type: labelsFromIds(
      appliedValues?.furnitureTypeIds,
      furnitureLabels
    ),
    filter_shop_price: labelsFromIds(appliedValues?.priceRangeIds, priceLabels),
    filter_shop_color: labelsFromIds(appliedValues?.colorIds, colorLabels),
    product_count: productCount,
    ...(options?.includeProductCountViewed
      ? { product_count_viewed: productCountViewed }
      : {}),
    ...(options?.includeTriggerContext
      ? {
          trigger_context: resolveShopTriggerContext({
            searchKeyword,
            appliedValues,
            appliedFilterChips,
            isEmptyList: options.isEmptyList,
          }),
        }
      : {}),
    ...(options?.sheetExpanded !== undefined
      ? {
          sheet_expansion_status: toSheetExpansionStatus(options.sheetExpanded),
        }
      : {}),
  };
};

export const getShopListProductScrollParams = ({
  productCount,
  productCountViewed,
}: Pick<ShopListContext, 'productCount' | 'productCountViewed'> = {}) => ({
  ...shopScreenParams(),
  product_count: productCount,
  product_count_viewed: productCountViewed,
});

type ShopSelectSheetParamsOptions = {
  includeLoginStatus?: boolean;
  includeSelectedSubCategoryTypes?: boolean;
};

export const getShopSelectSheetBaseParams = (
  {
    sheetExpanded,
    selectedProducts,
    countTriggerEvent,
  }: Pick<
    ShopSelectSheetContext,
    'sheetExpanded' | 'selectedProducts' | 'countTriggerEvent'
  >,
  options?: ShopSelectSheetParamsOptions
) => {
  const selectedSubCategoryTypes =
    formatSelectedSubCategoryTypes(selectedProducts);

  return {
    ...(options?.includeLoginStatus ? loginStatusParams() : {}),
    ...shopScreenParams(),
    sheet_expansion_status: toSheetExpansionStatus(sheetExpanded),
    selected_count: selectedProducts.length,
    selected_product_ids: formatSelectedProductIds(selectedProducts),
    ...(options?.includeSelectedSubCategoryTypes && selectedSubCategoryTypes
      ? { selected_sub_category_types: selectedSubCategoryTypes }
      : {}),
    ...(countTriggerEvent ? { count_trigger_event: countTriggerEvent } : {}),
  };
};

export const getShopSelectSheetParams = (
  context: ShopSelectSheetContext,
  options?: ShopSelectSheetParamsOptions
) => getShopSelectSheetBaseParams(context, options);

export const getShopSelectedProductFields = (
  product: Pick<
    SelectedProduct,
    'id' | 'title' | 'discountPrice' | 'categoryName' | 'subCategoryName'
  >
) => ({
  product_id: product.id,
  product_name: product.title,
  ...(product.categoryName ? { product_category: product.categoryName } : {}),
  ...(product.subCategoryName
    ? { product_sub_category: product.subCategoryName }
    : {}),
  product_price: product.discountPrice,
});

export const getShopProductCardParams = (product: {
  id: number;
  title?: string;
  brand?: string;
  originalPrice?: number;
  discountPrice?: number;
  categoryName?: string;
}) =>
  getProductCardOnCardParams({
    productId: product.id,
    name: product.title,
    brand: product.brand,
    originalPrice: product.originalPrice,
    finalPrice: product.discountPrice,
    product_category: product.categoryName,
  });

export const formatNextSelectedProductIds = (
  productId: number,
  selectedProductIds?: string
) => {
  if (!selectedProductIds?.trim()) {
    return String(productId);
  }

  const ids = selectedProductIds.split(',').map((id) => id.trim());
  if (ids.includes(String(productId))) {
    return selectedProductIds;
  }

  return `${selectedProductIds}, ${productId}`;
};
