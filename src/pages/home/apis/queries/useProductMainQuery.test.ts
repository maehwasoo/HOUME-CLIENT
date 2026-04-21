import { describe, expect, it } from 'vitest';

import {
  getMockProductMainResponse,
  toSearchSectionProducts,
} from './useProductMainQuery';

describe('useProductMainQuery mock', () => {
  // 검색/필터 파라미터가 응답 데이터와 appliedFilters에 함께 반영되는지 검증
  it('types, colors, price, keyword를 조합해 필터링하고 appliedFilters를 반환', () => {
    const response = getMockProductMainResponse({
      keyword: '수납장',
      types: [3],
      minPrice: 500000,
      maxPrice: 2500000,
      colors: [1],
      size: 20,
    });

    expect(response.code).toBe(200);
    expect(response.msg).toBe('응답 성공');
    expect(response.data.products.length).toBeGreaterThan(0);
    expect(
      response.data.products.every(
        (product) => product.categoryName === '수납/장식장'
      )
    ).toBe(true);
    expect(response.data.meta.appliedFilters).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category: 'type',
          id: '3',
          label: '수납/장식장',
        }),
        expect.objectContaining({
          category: 'color',
          id: '1',
          label: '화이트',
          value: '#FFFFFF',
        }),
      ])
    );
  });

  // 커서 기반 페이지네이션에서 다음 페이지가 이전 페이지보다 작은 id 구간으로 내려오는지 검증
  it('cursor, size 기준으로 페이지네이션 메타를 계산한다', () => {
    const firstPage = getMockProductMainResponse({ size: 3 });
    expect(firstPage.data.products).toHaveLength(3);
    expect(firstPage.data.meta.hasNext).toBe(true);
    expect(firstPage.data.meta.nextCursor).not.toBeNull();

    const secondPage = getMockProductMainResponse({
      size: 3,
      cursor: firstPage.data.meta.nextCursor ?? undefined,
    });
    expect(secondPage.data.products).toHaveLength(3);
    expect(secondPage.data.products[0].id).toBeLessThan(
      firstPage.data.products[firstPage.data.products.length - 1].id
    );
  });

  // UI(ProductCard 리스트)에서 바로 사용할 수 있는 뷰 모델로 변환되는지 검증
  it('SearchSection에서 바로 쓸 수 있는 카드 모델로 매핑', () => {
    const response = getMockProductMainResponse({ size: 1 });
    const cards = toSearchSectionProducts(response);

    expect(cards).toHaveLength(1);
    expect(cards[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        originalPrice: expect.any(Number),
        discountPrice: expect.any(Number),
        linkUrl: expect.any(String),
      })
    );
  });
});
