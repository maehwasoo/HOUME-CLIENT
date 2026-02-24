import { describe, expect, it } from 'vitest';

import { normalizeFurnitureProductsResponse } from './furnitureProductsResponseNormalizer';

describe('normalizeFurnitureProductsResponse', () => {
  it('maps PR #417 fields into card-compatible legacy fields', () => {
    const response = normalizeFurnitureProductsResponse({
      userName: 'tester',
      products: [
        {
          id: 11,
          baseFurnitureImageUrl: 'https://img/base.jpg',
          furnitureProductImageUrl: 'https://img/product.jpg',
          furnitureProductSiteUrl: 'https://shop/item',
          furnitureProductName: 'Modern Sofa',
          furnitureProductMallName: 'MallName',
          furnitureProductId: 1001,
          similarity: 0.91,
          clientColors: ['#112233', '#445566'],
          colors: ['#aabbcc'],
          listPrice: 300000,
          discountRate: 15,
          discountPrice: 255000,
          brandName: 'BrandName',
          jjymCount: 27,
        },
      ],
    });

    expect(response.userName).toBe('tester');
    expect(response.products).toHaveLength(1);
    expect(response.products[0]).toMatchObject({
      id: 11,
      furnitureProductId: 1001,
      furnitureProductOriginalPrice: 300000,
      furnitureProductDiscountRate: 15,
      furnitureProductDiscountPrice: 255000,
      furnitureProductSaveCount: 27,
      furnitureProductMallName: 'MallName',
      brandName: 'BrandName',
      clientColors: ['#112233', '#445566'],
      colors: ['#aabbcc'],
    });
    expect(response.products[0]?.furnitureProductColorHexes).toBeUndefined();
  });

  it('flattens naver/raw source arrays into products', () => {
    const response = normalizeFurnitureProductsResponse({
      userName: 'tester',
      naverProducts: [
        {
          furnitureProductImageUrl: 'https://img/naver.jpg',
          furnitureProductSiteUrl: 'https://shop/naver',
          furnitureProductName: 'Naver Product',
          furnitureProductMallName: 'Naver Mall',
          furnitureProductId: 1,
          similarity: 0.8,
        },
      ],
      rawProducts: [
        {
          furnitureProductImageUrl: 'https://img/raw.jpg',
          furnitureProductSiteUrl: 'https://shop/raw',
          furnitureProductName: 'Raw Product',
          furnitureProductMallName: 'Raw Mall',
          furnitureProductId: 2,
          similarity: 0.7,
          jjymCount: 3,
        },
      ],
    });

    expect(response.products).toHaveLength(2);
    expect(response.products.map((item) => item.furnitureProductId)).toEqual([
      1, 2,
    ]);
    expect(response.products[1]?.furnitureProductSaveCount).toBe(3);
  });

  it('returns stable fallback shape for invalid payloads', () => {
    const response = normalizeFurnitureProductsResponse(null);

    expect(response).toEqual({
      userName: '',
      products: [],
    });
  });

  it('keeps nullable numeric fields as undefined instead of coercing to 0', () => {
    const response = normalizeFurnitureProductsResponse({
      userName: 'tester',
      products: [
        {
          id: null,
          baseFurnitureImageUrl: 'https://img/base.jpg',
          furnitureProductImageUrl: 'https://img/product.jpg',
          furnitureProductSiteUrl: 'https://shop/item',
          furnitureProductName: 'Modern Sofa',
          furnitureProductMallName: 'MallName',
          furnitureProductId: null,
          similarity: 0.91,
          listPrice: null,
          discountRate: '',
          discountPrice: undefined,
          jjymCount: null,
          furnitureProductSaveCount: '',
        },
      ],
    });

    expect(response.products[0]).toMatchObject({
      id: undefined,
      furnitureProductId: undefined,
      furnitureProductOriginalPrice: undefined,
      furnitureProductDiscountRate: undefined,
      furnitureProductDiscountPrice: undefined,
      furnitureProductSaveCount: undefined,
      jjymCount: undefined,
    });
  });
});
