/** 목록형·추천형 — img_result_type */
export const IMG_RESULT_TYPE = {
  RECOMMEND: 'recommend',
  LIST: 'list',
} as const;

export type ImgResultType =
  (typeof IMG_RESULT_TYPE)[keyof typeof IMG_RESULT_TYPE];

/** 로딩 — load_preference_type */
export const LOAD_PREFERENCE_TYPE = {
  PREFERRED: 'preferred',
  NON_PREFERRED: 'non-preferred',
} as const;

export type LoadPreferenceType =
  (typeof LOAD_PREFERENCE_TYPE)[keyof typeof LOAD_PREFERENCE_TYPE];

/** 추천형 결과 — result_preference_type */
export const RESULT_PREFERENCE_TYPE = {
  PREFERRED: 'preferred',
  NON_PREFERRED: 'non-preferred',
} as const;

export type ResultPreferenceType =
  (typeof RESULT_PREFERENCE_TYPE)[keyof typeof RESULT_PREFERENCE_TYPE];

/** 결과·마이페이지·로딩 파라미터 */
export interface ResultParams {
  img_result_type?: ImgResultType;
  gen_img_title?: string;
  gen_img_ids?: string | null;
  gen_img_id?: number;
  mypage_img_count?: number;
  saved_item_ids?: string | null;
  saved_item_count?: number;
  load_preference_type?: LoadPreferenceType;
  loaded_product_ids?: string;
  look_around_product_ids?: string;
  others_img_ids?: string;
  others_img_id?: number;
  others_img_product_ids?: string;
  result_preference_type?: ResultPreferenceType;
  result_category_ids?: string;
  result_category_chip?: string;
  recommended_product_ids?: string;
  recommended_product_names?: string;
}
