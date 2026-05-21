import { useCallback } from 'react';

import IconButton from '@shared/components/v2/button/IconButton';
import Icon from '@shared/components/v2/icon/Icon';

import * as styles from './SelectedProductSheet.css';

interface SelectedProductItem {
  id: number;
  title: string;
  imageUrl?: string;
  originalPrice: number;
  discountPrice: number;
  discountRate: number;
}

interface SelectedProductSheetProps {
  expanded: boolean;
  selectedProducts: SelectedProductItem[];
  onRemoveProduct: (id: number) => void;
  maxCount?: number;
}

const SelectedProductSheet = ({
  expanded,
  selectedProducts,
  onRemoveProduct,
  maxCount = 6,
}: SelectedProductSheetProps) => {
  const selectedCount = selectedProducts.length;
  const hasSelectedProduct = selectedCount > 0;
  const emptyCount = Math.max(maxCount - selectedCount, 0);
  const visibleProducts = selectedProducts.slice(0, maxCount);
  const formatPrice = (price: number) => price.toLocaleString('ko-KR');

  const handleRemoveProductClick = useCallback(
    (id: number) => {
      onRemoveProduct(id);
    },
    [onRemoveProduct]
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
            <div key={product.id} className={styles.selectedCardContainer}>
              <div className={styles.selectedCard}>
                <div className={styles.selectedImageWrap}>
                  {product.imageUrl ? (
                    <img
                      className={styles.selectedImage}
                      src={product.imageUrl}
                      alt={product.title}
                    />
                  ) : (
                    <div className={styles.selectedImageFallback} aria-hidden>
                      <Icon name="PlusFill" size="20" />
                    </div>
                  )}
                </div>
                <div className={styles.selectedInfoSection}>
                  <p className={styles.selectedTitle}>{product.title}</p>
                  <div className={styles.selectedPriceRow}>
                    {product.discountRate > 0 && (
                      <span className={styles.selectedDiscountRate}>
                        {product.discountRate}%
                      </span>
                    )}
                    <span className={styles.selectedPrice}>
                      {formatPrice(product.discountPrice)}
                    </span>
                  </div>
                </div>
              </div>
              <IconButton
                name="CloseFillBlack"
                size="M"
                className={styles.closeButton({ layout: 'expanded' })}
                aria-label={`${product.title} 선택 해제`}
                onClick={() => handleRemoveProductClick(product.id)}
              />
            </div>
          ))}
          {Array.from({ length: emptyCount }).map((_, index) => (
            <div key={`empty-${index}`} className={styles.addCard}>
              {hasSelectedProduct ? (
                <>
                  <div className={styles.addImageWrap}>
                    <span className={styles.addCardContent} aria-hidden>
                      <Icon name="PlusFill" size="20" />
                    </span>
                  </div>
                  <div className={styles.addInfoPlaceholder}>
                    <p className={styles.addLabel}>상품 추가하기</p>
                  </div>
                </>
              ) : (
                <div className={styles.addCardSquare}>
                  <div className={styles.addCardContent} aria-hidden>
                    <Icon name="PlusFill" size="20" />
                    <p className={styles.addLabel}>상품 추가하기</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.compactRow} aria-label="선택한 상품 미리보기">
          {visibleProducts.map((product) => (
            <div key={product.id} className={styles.compactSlotContainer}>
              <div className={styles.compactSlotFilled}>
                <div className={styles.compactImageWrap}>
                  {product.imageUrl ? (
                    <img
                      className={styles.compactImage}
                      src={product.imageUrl}
                      alt={product.title}
                    />
                  ) : (
                    <div className={styles.compactImageFallback} aria-hidden>
                      <Icon name="PlusFill" size="14" />
                    </div>
                  )}
                </div>
              </div>
              <IconButton
                name="CloseFillBlack"
                size="S"
                className={styles.closeButton({ layout: 'compact' })}
                aria-label={`${product.title} 선택 해제`}
                onClick={() => handleRemoveProductClick(product.id)}
              />
            </div>
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
