import { useCallback } from 'react';

import { overlay } from 'overlay-kit';

import ProductDetailOverlay from '@pages/home/components/product/ProductPopup/ProductDetailOverlay';
import type { SelectedProduct } from '@pages/home/types/productTab';

import Icon from '@shared/components/v2/icon/Icon';

import ProductSheetCard from './ProductSheetCard';
import * as styles from './SelectedProductSheet.css';

interface SelectedProductSheetProps {
  expanded: boolean;
  selectedProducts: SelectedProduct[];
  onRemoveProduct: (id: number) => void;
  onAddProductClick?: () => void;
  maxCount?: number;
}

const SelectedProductSheet = ({
  expanded,
  selectedProducts,
  onRemoveProduct,
  onAddProductClick,
  maxCount = 6,
}: SelectedProductSheetProps) => {
  const selectedCount = selectedProducts.length;
  const emptyCount = Math.max(maxCount - selectedCount, 0);
  const visibleProducts = selectedProducts.slice(0, maxCount);

  const handleRemoveProductClick = useCallback(
    (id: number) => {
      onRemoveProduct(id);
    },
    [onRemoveProduct]
  );

  /** 상품 목록 찜 API 미연동 — ProductDetailOverlay `SaveInfo`용 no-op */
  const handleSaveToggleNoop = useCallback(() => {}, []);

  const handleSelectedCardClick = useCallback(
    (product: SelectedProduct) => {
      overlay.open(({ unmount }) => (
        <ProductDetailOverlay
          unmount={unmount}
          id={product.id}
          product={{
            title: product.title,
            brand: product.brand,
            imageUrl: product.imageUrl,
          }}
          price={{
            original: product.originalPrice,
            discountRate: product.discountRate,
            discount: product.discountPrice,
          }}
          save={{
            isSaved: false,
            onToggle: handleSaveToggleNoop,
          }}
          shoppingAction={{
            label: '선택',
            disabled: true,
            onClick: () => {},
          }}
        />
      ));
    },
    [handleSaveToggleNoop]
  );

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <Icon name={expanded ? 'ChevronUp' : 'ChevronDown'} size="16" />
        <p className={styles.title}>선택한 상품</p>
        <span className={styles.count}>
          (<span className={styles.selectedCount}>{selectedCount}</span>/
          {maxCount})
        </span>
      </div>

      {expanded ? (
        <div className={styles.expandedGrid}>
          {visibleProducts.map((product) => (
            <ProductSheetCard
              key={product.id}
              layout="expanded"
              product={product}
              onCardClick={handleSelectedCardClick}
              onRemoveClick={handleRemoveProductClick}
            />
          ))}
          {Array.from({ length: emptyCount }).map((_, index) => (
            <div key={`empty-${index}`} className={styles.expandedGridSlot}>
              <div className={styles.addCardSquare} onClick={onAddProductClick}>
                <div className={styles.addCardContent} aria-hidden>
                  <Icon name="PlusFill" size="20" />
                  <p className={styles.addLabel}>상품 추가하기</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.compactRow} aria-label="선택한 상품 미리보기">
          {visibleProducts.map((product) => (
            <ProductSheetCard
              key={product.id}
              layout="compact"
              product={product}
              onCardClick={handleSelectedCardClick}
              onRemoveClick={handleRemoveProductClick}
            />
          ))}
          {Array.from({ length: emptyCount }).map((_, index) => (
            <div key={`empty-${index}`} className={styles.compactSlot} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectedProductSheet;
