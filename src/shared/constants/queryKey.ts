import type { FurnitureCategoryCode } from '@shared/detection/furnitureCategoryMapping';

// Furniture Query Variables
export interface CategoriesQueryVariables {
  groupId: number | null;
  imageId: number | null;
  detectionSignature: string;
  codes: FurnitureCategoryCode[];
}

export interface ProductsQueryVariables {
  groupId: number | null;
  imageId: number | null;
  categoryId: number | null;
}

// Query Key Factory
export const queryKeys = {
  // 랜딩
  landing: {
    all: ['landing'] as const,
    history: () => [...queryKeys.landing.all, 'history'] as const,
  },

  // 이미지 설정 (온보딩 퍼널)
  imageSetup: {
    all: ['imageSetup'] as const,
    housingOptions: () =>
      [...queryKeys.imageSetup.all, 'housingOptions'] as const,
    floorPlan: () => [...queryKeys.imageSetup.all, 'floorPlan'] as const,
    activities: () => [...queryKeys.imageSetup.all, 'activities'] as const,
    furnitureCategories: () =>
      [...queryKeys.imageSetup.all, 'furnitureCategories'] as const,
    moodBoard: (limit?: number) =>
      [...queryKeys.imageSetup.all, 'moodBoard', limit] as const,
  },

  // 이미지 생성
  generate: {
    all: ['generate'] as const,
    stack: (page: number) =>
      [...queryKeys.generate.all, 'stack', page] as const,
    result: (houseId: number) =>
      [...queryKeys.generate.all, 'result', houseId] as const,
    fallback: (houseId: number) =>
      [...queryKeys.generate.all, 'fallback', houseId] as const,
    factors: (isLike: boolean) =>
      [...queryKeys.generate.all, 'factors', isLike] as const,
    image: () => [...queryKeys.generate.all, 'image'] as const,
  },

  // 가구 큐레이션
  furniture: {
    all: ['furniture'] as const,
    dashboard: () => [...queryKeys.furniture.all, 'dashboard'] as const,
    categoriesGroup: (vars: CategoriesQueryVariables) =>
      [...queryKeys.furniture.all, 'categoriesGroup', vars] as const,
    categories: (vars: CategoriesQueryVariables) =>
      [...queryKeys.furniture.all, 'categories', vars] as const,
    productsGroup: (vars: ProductsQueryVariables) =>
      [...queryKeys.furniture.all, 'productsGroup', vars] as const,
    products: (vars: ProductsQueryVariables) =>
      [...queryKeys.furniture.all, 'products', vars] as const,
  },

  // 마이페이지
  mypage: {
    all: ['mypage'] as const,
    user: () => [...queryKeys.mypage.all, 'user'] as const,
    images: () => [...queryKeys.mypage.all, 'images'] as const,
    imageDetail: (houseId: number) =>
      [...queryKeys.mypage.all, 'imageDetail', houseId] as const,
  },

  // 찜 목록
  jjym: {
    all: ['jjym'] as const,
    list: () => [...queryKeys.jjym.all, 'list'] as const,
  },
} as const;
