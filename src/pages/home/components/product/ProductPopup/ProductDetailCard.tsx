import ActionButton from '@shared/components/v2/button/actionButton/ActionButton';
import Icon from '@shared/components/v2/icon/Icon';
import type {
  LinkInfo,
  PriceInfo,
  ProductInfo,
} from '@shared/types/productCard';

import emptyImage from '@assets/v2/images/ImgEmpty.png';

import OptimizedImage from '@components/image/OptimizedImage';

import { useProductLink } from '@hooks/useProductLink';

import { getColorChips, getPriceTexts } from '@utils/productCardUtils';

import * as styles from './ProductDetailCard.css';

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
  const { openProductLink } = useProductLink();
  const { visibleColors, extraColorCount } = getColorChips(product.colorHexes);
  const { originalPriceText, discountPriceText, discountRateText } =
    getPriceTexts(price?.original, price?.discount, price?.discountRate);

  const linkHref = linkHrefOverride ?? link?.href;
  const hasDiscount =
    typeof price?.discountRate === 'number' &&
    Number.isFinite(price.discountRate) &&
    price.discountRate > 0;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <OptimizedImage
          className={styles.image}
          src={product.imageUrl || emptyImage}
          fallbackSrc={emptyImage}
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
              onClick={() => openProductLink(linkHref, link?.onClick)}
            >
              {link?.label || '사이트'}
            </ActionButton>
          </div>
        ) : null}
      </div>
      <div className={styles.info}>
        {visibleColors.length > 0 ||
        extraColorCount > 0 ||
        (typeof saveCount === 'number' && Number.isFinite(saveCount)) ? (
          <div className={styles.metaRow}>
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
              <div className={styles.likeRow}>
                <Icon name="HeartFillGray" size="14" />
                <span className={styles.likeCount}>
                  {saveCount.toLocaleString('ko-KR')}
                </span>
              </div>
            ) : null}
          </div>
        ) : null}
        {!!product.brand && <p className={styles.brand}>{product.brand}</p>}
        <p className={styles.title}>{product.title}</p>
        {(originalPriceText || discountPriceText) && (
          <div className={styles.priceSection}>
            {hasDiscount && originalPriceText ? (
              <p className={styles.originalPrice}>{originalPriceText}</p>
            ) : null}
            <div className={styles.discountRow}>
              {hasDiscount && discountRateText ? (
                <span className={styles.discountRate}>{discountRateText}</span>
              ) : null}
              {discountPriceText && (
                <span className={styles.discountPrice}>
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
