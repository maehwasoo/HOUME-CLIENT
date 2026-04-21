import CloseBottomSheet from '@shared/components/v2/bottomSheet/CloseBottomSheet';
import DragHandleBottomSheet from '@shared/components/v2/bottomSheet/DragHandleBottomSheet';
import ActionButton from '@shared/components/v2/button/actionButton/ActionButton';

import IntroSection from './IntroSection/IntroSection';
import ProductFilterSheet from './ProductFilterSheet/ProductFilterSheet';
import * as styles from './ProductTab.css';
import SearchSection from './SearchSection/SearchSection';
import SelectedProductSheet from './SelectedProductSheet/SelectedProductSheet';
import {
  MAX_SELECTED_PRODUCTS,
  useProductTabState,
} from '../../hooks/useProductTabState';

const ProductTab = () => {
  const {
    sheetExpanded,
    setSheetExpanded,
    filterSheetOpen,
    chipSelected,
    appliedFilterChips,
    selectedProducts,
    productFilterSheetRef,
    handleFilterChipClick,
    handleRemoveAppliedChip,
    handleSelectProduct,
    handleRemoveSelectedProduct,
    handleDecorateWithProductsClick,
    handleFilterSheetClose,
    handleFilterApply,
    handleFilterResetClick,
  } = useProductTabState();

  return (
    <div className={styles.container}>
      <IntroSection />
      <SearchSection
        chipSelected={chipSelected}
        onFilterChipClick={handleFilterChipClick}
        appliedFilterChips={appliedFilterChips}
        onAppliedFilterChipRemove={handleRemoveAppliedChip}
        selectedProductIds={selectedProducts.map((product) => product.id)}
        onSelectProduct={handleSelectProduct}
      />

      <DragHandleBottomSheet
        open={!filterSheetOpen}
        collapsedHeight="24rem"
        onExpandedChange={setSheetExpanded}
        contentSlot={
          <SelectedProductSheet
            expanded={sheetExpanded}
            selectedProducts={selectedProducts}
            onRemoveProduct={handleRemoveSelectedProduct}
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
        contentSlot={<ProductFilterSheet ref={productFilterSheetRef} />}
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
