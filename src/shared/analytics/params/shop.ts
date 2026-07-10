/** 인터랙션 — sheet_expansion_status */
export const SHEET_EXPANSION_STATUS = {
  DEFAULT: 'default',
  EXPANDED: 'expanded',
} as const;

export type SheetExpansionStatus =
  (typeof SHEET_EXPANSION_STATUS)[keyof typeof SHEET_EXPANSION_STATUS];

/** 인터랙션 — count_trigger_event */
export const COUNT_TRIGGER_EVENT = {
  ADD_CLICK: 'add_click',
  REMOVE_CLICK: 'remove_click',
} as const;

export type CountTriggerEvent =
  (typeof COUNT_TRIGGER_EVENT)[keyof typeof COUNT_TRIGGER_EVENT];

/** 상품 탭 필터 칩 카테고리 — shop_filterList_click `filter_type` 값 */
export const SHOP_FILTER_CATEGORY = {
  FURNITURE: 'furniture',
  PRICE: 'price',
  COLOR: 'color',
} as const;

export type ShopFilterCategory =
  (typeof SHOP_FILTER_CATEGORY)[keyof typeof SHOP_FILTER_CATEGORY];

/** 상품 탭 — 검색·필터·선택 시트 파라미터 */
export interface ShopParams {
  search_keyword?: string | null;
  selected_shop_keyword_filters?: string | null;
  filter_shop_furniture_type?: string | null;
  filter_shop_price?: string | null;
  filter_shop_color?: string | null;
  alternative_product_count?: number;
  /** ex. "385, 394, 208" */
  alternative_product_ids?: string;
  product_count?: number;
  product_count_viewed?: number;
  selected_count?: number;
  /** ex. "345, 369, 102" */
  selected_product_ids?: string | null;
  /** ex. "chair, table, lighting" */
  selected_sub_category_types?: string | null;
  count_trigger_event?: CountTriggerEvent;
  sheet_expansion_status?: SheetExpansionStatus;
}
