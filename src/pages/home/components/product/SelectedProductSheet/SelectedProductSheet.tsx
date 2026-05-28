import { useCallback } from 'react';

import { overlay } from 'overlay-kit';

import ProductDetailOverlay from '@pages/home/components/product/ProductPopup/ProductDetailOverlay';
import type { SelectedProduct } from '@pages/home/types/productTab';

import IconButton from '@shared/components/v2/button/IconButton';
import Icon from '@shared/components/v2/icon/Icon';

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
  const formatPrice = (price: number) => price.toLocaleString('ko-KR');

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
            <div key={product.id} className={styles.selectedCardContainer}>
              <div
                className={styles.selectedCard}
                role="button"
                tabIndex={0}
                onClick={() => handleSelectedCardClick(product)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleSelectedCardClick(product);
                  }
                }}
              >
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
            <div key={product.id} className={styles.compactSlotContainer}>
              <div
                className={styles.compactSlotFilled}
                role="button"
                tabIndex={0}
                aria-label={`${product.title} 상세 보기`}
                onClick={() => handleSelectedCardClick(product)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleSelectedCardClick(product);
                  }
                }}
              >
                <div className={styles.compactImageWrap}>
                  {product.imageUrl ? (
                    <img
                      className={styles.compactImage}
                      src={product.imageUrl}
                      alt=""
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
