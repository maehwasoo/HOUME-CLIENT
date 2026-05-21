import { useCallback, useEffect, useRef, useState } from 'react';

import type { SelectedProduct } from '@pages/home/types/productTab';

import { useToast } from '@components/toast/useToast';

/**
 * 상품 선택 상한값 - 최대 6개 선택
 */
export const MAX_SELECTED_PRODUCTS = 6;

/**
 * 상품 선택 상태 전용 훅
 * - 선택/해제
 * - 최대 개수 제한
 * - 선택 관련 토스트
 * 를 한 곳에서 관리
 */
const useProductSelection = () => {
  /** 현재 선택된 상품 목록 */
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );
  const selectedProductsRef = useRef<SelectedProduct[]>([]);
  const { notify } = useToast();

  useEffect(() => {
    selectedProductsRef.current = selectedProducts;
  }, [selectedProducts]);

  /**
   * 상품 선택 핸들러
   * - 중복 선택 방지
   * - 최대 개수 초과 시 추가하지 않고 토스트 안내
   */
  const handleSelectProduct = useCallback(
    (product: SelectedProduct) => {
      const currentSelected = selectedProductsRef.current;
      if (currentSelected.some((item) => item.id === product.id)) return;
      if (currentSelected.length >= MAX_SELECTED_PRODUCTS) {
        notify({
          text: `상품은 최대 ${MAX_SELECTED_PRODUCTS}개까지만 선택할 수 있어요`,
        });
        return;
      }

      setSelectedProducts((prev) => {
        if (prev.some((item) => item.id === product.id)) return prev;
        if (prev.length >= MAX_SELECTED_PRODUCTS) return prev;
        return [...prev, product];
      });
    },
    [notify]
  );

  /** 선택된 상품 1개 제거 */
  const handleRemoveSelectedProduct = useCallback((id: number) => {
    setSelectedProducts((prev) => prev.filter((product) => product.id !== id));
  }, []);

  /** "꾸미기" CTA 클릭 시 최소 1개 선택 검증 */
  const handleDecorateWithProductsClick = useCallback(() => {
    if (selectedProducts.length === 0) {
      notify({ text: '상품을 1개 이상 선택해주세요' });
    }
  }, [notify, selectedProducts.length]);

  /** ProductTab에서 사용할 공개 값 */
  return {
    selectedProducts,
    handleSelectProduct,
    handleRemoveSelectedProduct,
    handleDecorateWithProductsClick,
  };
};

export { useProductSelection };
