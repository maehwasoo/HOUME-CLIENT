import ActionButton from '@shared/components/v2/button/actionButton/ActionButton';
import Icon from '@shared/components/v2/icon/Icon';
import * as styles from '@shared/components/v2/productCard/ProductCard.css';
import type {
  LinkInfo,
  PriceInfo,
  ProductInfo,
} from '@shared/types/productCard';

import CardImage from '@assets/images/cardExImg.svg?url';

import { getColorChips, getPriceTexts } from '@utils/productCardUtils';

export interface ProductDetailCardProps {
  product: ProductInfo;
  price?: PriceInfo;
  saveCount?: number;
  link?: LinkInfo;
  linkHrefOverride?: string;
}

const ProductDetailCard = ({
  product,
  price,
  saveCount,
  link,
  linkHrefOverride,
}: ProductDetailCardProps) => {
  const { visibleColors, extraColorCount } = getColorChips(product.colorHexes);
  const { originalPriceText, discountPriceText, discountRateText } =
    getPriceTexts(price?.original, price?.discount, price?.discountRate);

  const linkHref = linkHrefOverride ?? link?.href;
  const hasDiscount =
    typeof price?.discountRate === 'number' &&
    Number.isFinite(price.discountRate) &&
    price.discountRate > 0;

  return (
    <div className={styles.popupPreviewCard}>
      <div className={styles.popupPreviewImageWrap}>
        <img
          className={styles.popupPreviewImage}
          src={product.imageUrl || CardImage}
          alt={product.title}
        />
        {linkHref ? (
          <div className={styles.linkBtnContainer()}>
            <ActionButton
              variant="solid"
              color="inverse"
              size="XS"
              leftIcon="Link"
              aria-label="공식 사이트로 이동"
              onClick={() => {
                if (link?.onClick) {
                  link.onClick();
                  return;
                }
                window.open(linkHref, '_blank', 'noopener,noreferrer');
              }}
            >
              {link?.label || '사이트'}
            </ActionButton>
          </div>
        ) : null}
      </div>
      <div className={styles.popupPreviewInfo}>
        {visibleColors.length > 0 ||
        extraColorCount > 0 ||
        (typeof saveCount === 'number' && Number.isFinite(saveCount)) ? (
          <div className={styles.popupPreviewMetaRow}>
            {visibleColors.length > 0 || extraColorCount > 0 ? (
              <div className={styles.colorRow}>
                {visibleColors.map((hex, index) => (
                  <div
                    className={styles.colorChipContainer}
                    key={`${hex}-${index}`}
                  >
                    <span
                      className={styles.colorChip}
                      style={{ backgroundColor: hex }}
                      aria-hidden
                    />
                  </div>
                ))}
                {extraColorCount > 0 ? (
                  <span className={styles.colorChipCount}>
                    +{extraColorCount}
                  </span>
                ) : null}
              </div>
            ) : null}
            {typeof saveCount === 'number' && Number.isFinite(saveCount) ? (
              <div className={styles.popupPreviewLikeRow}>
                <Icon name="HeartFillGray" size="14" />
                <span className={styles.popupPreviewLikeCount}>
                  {saveCount.toLocaleString('ko-KR')}
                </span>
              </div>
            ) : null}
          </div>
        ) : null}
        {!!product.brand && (
          <p className={styles.popupPreviewBrand}>{product.brand}</p>
        )}
        <p className={styles.popupPreviewTitle}>{product.title}</p>
        {(originalPriceText || discountPriceText) && (
          <div className={styles.popupPreviewPriceSection}>
            {hasDiscount && originalPriceText ? (
              <p className={styles.popupPreviewOriginalPrice}>
                {originalPriceText}
              </p>
            ) : null}
            <div className={styles.popupPreviewDiscountRow}>
              {hasDiscount && discountRateText ? (
                <span className={styles.popupPreviewDiscountRate}>
                  {discountRateText}
                </span>
              ) : null}
              {discountPriceText && (
                <span className={styles.popupPreviewDiscountPrice}>
                  {discountPriceText}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailCard;
