import { useCallback } from 'react';

import { overlay } from 'overlay-kit';

import ProductDetailOverlay from '@pages/home/components/product/ProductPopup/ProductDetailOverlay';
import type { ProductSearchCardItem } from '@pages/home/hooks/useProductSearch';
import type { SelectedProduct } from '@pages/home/types/productTab';

import ProductCard from '@shared/components/v2/productCard/ProductCard';

import * as styles from './RecommendSection.css';

interface RecommendSectionProps {
  products: ProductSearchCardItem[];
  selectedProductIds: number[];
  onSelectProduct: (product: SelectedProduct) => void;
}

const RecommendSection = ({
  products,
  selectedProductIds,
  onSelectProduct,
}: RecommendSectionProps) => {
  const handleSaveToggleNoop = useCallback(() => {}, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} aria-label="추천 상품">
      <h2 className={styles.title}>이런 상품은 어떠세요?</h2>
      <div className={styles.productGrid}>
        {products.map(
          ({
            id,
            title,
            brand,
            imageUrl,
            discountRate,
            originalPrice,
            discountPrice,
            colorHexes,
            saveCount,
            linkUrl,
          }) => {
            const isSelected = selectedProductIds.includes(id);
            const cardProduct = {
              title,
              brand,
              imageUrl,
              colorHexes,
            };
            const cardPrice = {
              original: originalPrice,
              discountRate,
              discount: discountPrice,
            };
            const cardSave = {
              isSaved: false as const,
              onToggle: handleSaveToggleNoop,
              count: saveCount,
            };
            const cardLink = { href: linkUrl };
            const cardShoppingAction = {
              label: '선택' as const,
              disabled: isSelected,
              onClick: () =>
                onSelectProduct({
                  id,
                  title,
                  brand,
                  imageUrl,
                  originalPrice,
                  discountPrice,
                  discountRate,
                }),
            };

            return (
              <ProductCard
                key={id}
                cardType="shopping"
                product={cardProduct}
                price={cardPrice}
                save={cardSave}
                link={cardLink}
                shoppingAction={cardShoppingAction}
                onShoppingViewDetailClick={() => {
                  overlay.open(({ unmount }) => (
                    <ProductDetailOverlay
                      unmount={unmount}
                      id={id}
                      link={cardLink}
                      price={cardPrice}
                      product={cardProduct}
                      save={cardSave}
                      shoppingAction={cardShoppingAction}
                    />
                  ));
                }}
              />
            );
          }
        )}
      </div>
    </section>
  );
};

export default RecommendSection;
