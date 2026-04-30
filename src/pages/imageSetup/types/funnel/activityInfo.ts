// ActivityInfo 스텝 폼 데이터 타입 (사용자 입력값)
export type ActivityInfoFormData = {
  activity?: string;
  furnitureIds?: number[];
};

// 가구 카테고리별 선택 모드
// - single: 하나만 선택 가능 (재선택 시 해제)
// - multiple: 여러 개 선택 가능
export type CategorySelectionMode = 'single' | 'multiple';

// 가구 카테고리별 선택 모드 매핑 (API 응답의 nameEng를 키로 사용)
export const CATEGORY_SELECTION_MODE: Record<string, CategorySelectionMode> = {
  BED: 'single',
  SOFA: 'multiple',
  STORAGE: 'multiple',
  TABLE: 'multiple',
  SELECTIVE: 'multiple',
  LIGHTING: 'multiple',
};
