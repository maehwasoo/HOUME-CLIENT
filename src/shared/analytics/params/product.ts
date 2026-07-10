/** 상품 카드 — trigger_context */
export const TRIGGER_CONTEXT = {
  DEFAULT: 'default',
  SEARCH_RESULT: 'search_result',
  FILTER_RESULT: 'filter_result',
  SEARCH_FILTER_RESULT: 'search_filter_result',
  EMPTY_RESULT: 'empty_result',
  DETAIL_VIEW: 'detail_view',
  SAVED_PRODUCT: 'saved_product',
  IMAGE_RESULT_CURATION: 'image_result_curation',
  /** 노션 Event Code 그대로 (List 대문자 L) */
  IMAGE_RESULT_LIST_SIMILAR: 'image_result_List_similar',
} as const;

export type TriggerContext =
  (typeof TRIGGER_CONTEXT)[keyof typeof TRIGGER_CONTEXT];

/** 상품 카드, 찜 — save_status (DB 전송 값) */
export type SaveStatus = boolean;
