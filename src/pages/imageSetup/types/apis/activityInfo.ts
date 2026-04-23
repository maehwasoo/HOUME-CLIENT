// Activity 스텝 API 타입 정의

// 가구 단일 항목
export interface FurnitureOptionItem {
  id: number; // 7
  code: string; // DESK
  label: string; // 업무용 책상
}

// GET /api/v2/dashboard/activities — 주요활동 조회
export interface ActivityItem {
  code: string; // REMOTE_WORK
  label: string; // 재택근무형
  furnitures: FurnitureOptionItem[]; // 필수 가구
}

export interface ActivitiesResponse {
  activities: ActivityItem[];
}

// GET /api/v2/dashboard/categories — 가구 카테고리 조회
export interface FurnitureCategory {
  categoryId: number;
  nameKr: string;
  nameEng: string;
  furnitures: FurnitureOptionItem[];
}

export interface FurnitureCategoriesResponse {
  categories: FurnitureCategory[];
}
