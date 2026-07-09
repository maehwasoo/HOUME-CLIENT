/** 경로 — section_name */
export const SECTION_NAME = {
  DEFAULT: 'default',
  SHOP_LIST: 'shop_list',
  SHOP_ALTERNATIVE: 'shop_alternative',
  PRODUCT_DETAIL_MODAL: 'product_detail_modal',
  MYPAGE_SAVED_PRODUCT: 'mypage_saved_product',
  RESULT_CURATION: 'result_curation',
  RESULT_LIST_SIMILAR: 'result_list_similar',
} as const;

export type SectionName = (typeof SECTION_NAME)[keyof typeof SECTION_NAME];
