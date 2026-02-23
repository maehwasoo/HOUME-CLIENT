import { describe, expect, it } from 'vitest';

import {
  RESULT_CARD_UI_FALLBACK,
  normalizeProductsForCard,
} from './curationProducts';

describe('normalizeProductsForCard', () => {
  it('uses clientColors first and maps server fields for card props', () => {
    const products = normalizeProductsForCard([
      {
        id: 9,
        baseFurnitureImageUrl: 'https://img/base.jpg',
        furnitureProductImageUrl: 'https://img/product.jpg',
        furnitureProductSiteUrl: 'https://shop/item',
        furnitureProductName: 'chair',
        furnitureProductMallName: 'legacy mall',
        furnitureProductId: 300,
        similarity: 0.8,
        clientColors: ['#123456', '#abcdef'],
        colors: ['#111111'],
        listPrice: 150000,
        discountPrice: 99000,
        discountRate: 34,
        brandName: 'new brand',
        jjymCount: 33,
      },
    ]);

    expect(products[0]).toMatchObject({
      id: 9,
      furnitureProductId: 300,
      furnitureProductBrandName: 'new brand',
      furnitureProductOriginalPrice: 150000,
      furnitureProductDiscountPrice: 99000,
      furnitureProductDiscountRate: 34,
      furnitureProductColorHexes: ['#123456', '#abcdef'],
      furnitureProductSaveCount: 33,
    });
  });

  it('falls back to colors then legacy colorHexes when clientColors are unusable', () => {
    const products = normalizeProductsForCard([
      {
        baseFurnitureImageUrl: '',
        furnitureProductImageUrl: '',
        furnitureProductSiteUrl: 'https://shop/item',
        furnitureProductName: 'lamp',
        furnitureProductMallName: 'mall',
        furnitureProductId: 1,
        similarity: 0,
        clientColors: ['오프화이트'],
        colors: ['#fedcba'],
        furnitureProductColorHexes: ['#333333'],
      },
      {
        baseFurnitureImageUrl: '',
        furnitureProductImageUrl: '',
        furnitureProductSiteUrl: 'https://shop/item-2',
        furnitureProductName: 'table',
        furnitureProductMallName: 'mall',
        furnitureProductId: 2,
        similarity: 0,
        clientColors: ['오프화이트'],
        colors: ['ivory'],
        furnitureProductColorHexes: ['#222222'],
      },
    ]);

    expect(products[0]?.furnitureProductColorHexes).toEqual(['#fedcba']);
    expect(products[1]?.furnitureProductColorHexes).toEqual(['#222222']);
  });

  it('maps korean color names to hex values', () => {
    const products = normalizeProductsForCard([
      {
        baseFurnitureImageUrl: '',
        furnitureProductImageUrl: '',
        furnitureProductSiteUrl: 'https://shop/item',
        furnitureProductName: 'sofa',
        furnitureProductMallName: 'mall',
        furnitureProductId: 1,
        similarity: 0,
        clientColors: ['화이트', '네이비', '골드'],
      },
    ]);

    expect(products[0]?.furnitureProductColorHexes).toEqual([
      '#FFFFFF',
      '#000080',
      '#FFD700',
    ]);
  });

  it('uses fallback values when ids or optional fields are absent', () => {
    const products = normalizeProductsForCard([
      {
        baseFurnitureImageUrl: '',
        furnitureProductImageUrl: '',
        furnitureProductSiteUrl: '',
        furnitureProductName: '',
        furnitureProductMallName: '',
        furnitureProductId: 'not-number',
        similarity: 0,
      },
    ]);

    expect(products[0]?.id).toBeUndefined();
    expect(products[0]).toMatchObject({
      id: undefined,
      furnitureProductId: 'fallback-1',
      furnitureProductName: RESULT_CARD_UI_FALLBACK.productName,
      furnitureProductBrandName: RESULT_CARD_UI_FALLBACK.mallName,
      furnitureProductOriginalPrice: RESULT_CARD_UI_FALLBACK.originalPrice,
      furnitureProductDiscountPrice: RESULT_CARD_UI_FALLBACK.discountPrice,
      furnitureProductDiscountRate: RESULT_CARD_UI_FALLBACK.discountRate,
      furnitureProductSaveCount: RESULT_CARD_UI_FALLBACK.saveCount,
      furnitureProductColorHexes: RESULT_CARD_UI_FALLBACK.colorHexes,
    });
  });

  it('creates unique string fallback ids that do not collide with real numeric ids', () => {
    const products = normalizeProductsForCard([
      {
        baseFurnitureImageUrl: '',
        furnitureProductImageUrl: '',
        furnitureProductSiteUrl: '',
        furnitureProductName: '',
        furnitureProductMallName: '',
        furnitureProductId: 1,
        similarity: 0,
      },
      {
        baseFurnitureImageUrl: '',
        furnitureProductImageUrl: '',
        furnitureProductSiteUrl: '',
        furnitureProductName: '',
        furnitureProductMallName: '',
        furnitureProductId: 0,
        similarity: 0,
      },
    ]);

    expect(products[0]?.furnitureProductId).toBe(1);
    expect(products[0]?.isRecommendId).toBe(false);
    expect(products[1]?.furnitureProductId).toBe('fallback-2');
    expect(products[1]?.isRecommendId).toBe(false);
  });
});
