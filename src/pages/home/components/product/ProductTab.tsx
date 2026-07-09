import { useEffect, useMemo } from 'react';

import { overlay } from 'overlay-kit';

import ProductFilterSheet from '@pages/home/components/product/ProductFilterSheet/ProductFilterSheet';
import {
  MAX_SELECTED_PRODUCTS,
  useProductTabController,
} from '@pages/home/hooks/useProductTabController';
import { consumeReopenProduct } from '@pages/home/utils/productDetailOverlayReopen';

import { useImageFlowStore } from '@store/useImageFlowStore';

import CloseBottomSheet from '@shared/components/v2/bottomSheet/CloseBottomSheet';
import DragHandleBottomSheet from '@shared/components/v2/bottomSheet/DragHandleBottomSheet';
import ActionButton from '@shared/components/v2/button/actionButton/ActionButton';

import ProductDetailOverlay from './ProductPopup/ProductDetailOverlay';
import * as styles from './ProductTab.css';
import SearchSection from './SearchSection/SearchSection';
import SelectedProductSheet from './SelectedProductSheet/SelectedProductSheet';
import { PRODUCT_BOTTOM_SHEET_COLLAPSED_HEIGHT } from '../../constants/productTab';

const ProductTab = () => {
  /**
   * 외부 진입 시 ProductTab 상태 복원
   * - useImageFlowStore.preset.type === 'product'면 로그인 게이트 복귀 또는 ResultPage '상품 다시 선택하기' 흐름 이라는 의미
   * - mount 시 1회 캡처 (useMemo deps []) — 이후 사용자 편집은 controller의 selectedProducts로만 진행 !!
   * - mount effect에서 clearPreset를 호출해 sessionStorage stale 데이터 제거 !!
   */
  const productsToBeRestored = useMemo(() => {
    const preset = useImageFlowStore.getState().preset;
    return preset?.type === 'product' ? preset.productsToBeRestored : [];
    // mount 시 1회만 평가 (store는 ref 안정)
  }, []);
  const hasProductsToBeRestored = productsToBeRestored.length > 0;

  useEffect(() => {
    if (hasProductsToBeRestored) {
      useImageFlowStore.getState().clearPreset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    sheetExpanded,
    setSheetExpanded,
    filterSheetOpen,
    chipSelected,
    appliedFilterChips,
    selectedProducts,
    filterSheetProps,
    productListQueryParams,
    handleFilterChipClick,
    handleRemoveAppliedChip,
    handleSelectProduct,
    handleRemoveSelectedProduct,
    handleDecorateWithProductsClick,
    handleFilterSheetClose,
    handleFilterApply,
    handleFilterResetClick,
    handleAddProductClick,
  } = useProductTabController({
    initialSelectedProducts: productsToBeRestored,
    initialSheetExpanded: hasProductsToBeRestored,
    resetFiltersOnMount: hasProductsToBeRestored,
  });

  // 로그인 게이트로 상품 상세 모달이 닫힌 채 복귀한 경우, 저장된 정보로 그 모달을 다시 띄움
  // 리스트(검색/필터/무한스크롤) 상태에 의존하지 않으므로 깊은 페이지/검색 결과의 상품도 복원됨
  useEffect(() => {
    const reopen = consumeReopenProduct();
    if (!reopen) return;

    overlay.open(({ unmount }) => (
      <ProductDetailOverlay
        unmount={unmount}
        id={reopen.id}
        product={reopen.product}
        price={reopen.price}
        link={{ href: reopen.linkHref }}
        save={{ isSaved: false, onToggle: () => {} }}
        shoppingAction={{
          label: '선택',
          disabled: selectedProducts.some((p) => p.id === reopen.id),
          onClick: () =>
            handleSelectProduct({
              id: reopen.id,
              title: reopen.product.title,
              brand: reopen.product.brand ?? '',
              imageUrl: reopen.product.imageUrl,
              originalPrice: reopen.price?.original ?? 0,
              discountPrice: reopen.price?.discount ?? 0,
              discountRate: reopen.price?.discountRate ?? 0,
            }),
        }}
      />
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      {/* <IntroSection /> */}
      <SearchSection
        chipSelected={chipSelected}
        onFilterChipClick={handleFilterChipClick}
        appliedFilterChips={appliedFilterChips}
        onAppliedFilterChipRemove={handleRemoveAppliedChip}
        selectedProductIds={selectedProducts.map((product) => product.id)}
        onSelectProduct={handleSelectProduct}
        productListQueryParams={productListQueryParams}
      />

      <DragHandleBottomSheet
        open={!filterSheetOpen}
        collapsedHeight={PRODUCT_BOTTOM_SHEET_COLLAPSED_HEIGHT}
        expanded={sheetExpanded}
        onExpandedChange={setSheetExpanded}
        contentSlot={
          <SelectedProductSheet
            expanded={sheetExpanded}
            selectedProducts={selectedProducts}
            onRemoveProduct={handleRemoveSelectedProduct}
            onAddProductClick={handleAddProductClick}
            maxCount={MAX_SELECTED_PRODUCTS}
          />
        }
        primaryButton={
          <ActionButton
            size="2XL"
            fullWidth
            leftIcon="DoubleStar"
            visualDisabled={selectedProducts.length === 0}
            onClick={handleDecorateWithProductsClick}
          >
            이 상품들로 우리 집 꾸미기
          </ActionButton>
        }
      />

      <CloseBottomSheet
        open={filterSheetOpen}
        onClose={handleFilterSheetClose}
        titleAlign="left"
        titleSlot={<p className={styles.filterSheetTitle}>필터</p>}
        contentSlot={<ProductFilterSheet {...filterSheetProps} />}
        secondaryButton={
          <ActionButton
            variant="outlined"
            color="inverse"
            size="2XL"
            leftIcon="Refresh"
            onClick={handleFilterResetClick}
          >
            초기화
          </ActionButton>
        }
        primaryButton={
          <ActionButton size="2XL" fullWidth onClick={handleFilterApply}>
            필터 적용하기
          </ActionButton>
        }
      />
    </div>
  );
};

export default ProductTab;
