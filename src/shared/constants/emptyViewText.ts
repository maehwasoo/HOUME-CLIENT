export const EMPTY_VIEW_TEXT = {
  searchSection: {
    loadError: '상품 목록을 불러올 수 없습니다',
    empty: '선택한 필터에 맞는 상품이 없어요.',
    emptyDescription:
      '조금 더 넓은 조건으로 검색하면\n더 많은 상품을 만날 수 있어요.',
  },
  listResult: {
    selected: {
      loadError: '선택한 상품을 불러올 수 없습니다',
      empty: '선택한 상품 정보가 없어요',
      emptyDescription: '상품 탭에서 다시 선택해보세요.',
      partial: '일부 상품 정보를 표시할 수 없어요',
      partialDescription: '다시 시도해주세요.',
    },
    similar: {
      loadError: '비슷한 상품을 불러올 수 없습니다',
      partial: '비슷한 상품 정보를 표시할 수 없어요',
      partialDescription: '다시 시도해주세요.',
    },
    related: {
      loadError: '관련 이미지를 불러올 수 없습니다',
      partial: '표시할 수 있는 관련 이미지가 없어요',
      partialDescription: '다시 시도해주세요.',
      titleWithName: (name: string) =>
        `${name}님이 고른 아이템이 포함된 이미지`,
      titleFallback: '비슷한 구성의 이미지',
    },
  },
  curationResult: {
    categories: {
      loadError: '추천 카테고리를 불러올 수 없습니다',
      empty: '추천 정보를 표시할 수 없어요',
    },
    products: {
      loadError: '추천 상품을 불러올 수 없습니다',
      empty: '이 카테고리의 추천 상품이 없어요',
      emptyDescription: '다른 카테고리를 선택해보세요.',
      partial: '일부 상품 정보를 표시할 수 없어요',
      partialDescription: '다시 시도해주세요.',
    },
  },
} as const;
