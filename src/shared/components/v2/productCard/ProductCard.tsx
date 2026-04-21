import { useCallback, useEffect, useState } from 'react';

import { overlay } from 'overlay-kit';

import type {
  LinkInfo,
  PriceInfo,
  ProductInfo,
  SaveInfo,
} from '@shared/types/productCard';

import CardImage from '@assets/images/cardExImg.svg?url';

import {
  createCardClickHandler,
  getColorChips,
  getPriceTexts,
  type CardClickArea,
} from '@utils/productCardUtils';

import * as styles from './ProductCard.css';
import ActionButton from '../button/actionButton/ActionButton';
import IconButton from '../button/IconButton';
import Icon from '../icon/Icon';
import Popup from '../popup/Popup';

type CardType = 'default' | 'shopping';

interface ProductCardProps {
  cardType?: CardType;
  product: ProductInfo;
  price?: PriceInfo;
  save: SaveInfo;
  link?: LinkInfo;
  disabled?: boolean;
  onCardClick?: (area?: CardClickArea) => void;
  enableWholeCardLink?: boolean;
  shoppingAction?: {
    label?: string;
    onClick: () => void;
    disabled?: boolean;
  };
}

const ProductCard = ({
  cardType = 'default',
  product,
  price,
  save,
  link,
  disabled = false,
  onCardClick,
  enableWholeCardLink = false,
  shoppingAction,
}: ProductCardProps) => {
  const isDefault = cardType === 'default';
  const [isLoaded, setIsLoaded] = useState(false);
  const linkHref = link?.href;

  useEffect(() => {
    setIsLoaded(false);
  }, [product.imageUrl]);

  const { visibleColors, extraColorCount } = getColorChips(product.colorHexes);
  const { originalPriceText, discountPriceText, discountRateText } =
    getPriceTexts(price?.original, price?.discount, price?.discountRate);

  const { handleWrapperClick, handleWrapperKeyDown } = createCardClickHandler({
    onCardClick,
    enableWholeCardLink,
    linkHref,
  });

  const handleShoppingViewDetailClick = useCallback(() => {
    overlay.open(({ unmount }) => (
      <Popup
        btnStyle="solid"
        btnText={shoppingAction?.label ?? '선택'}
        confirmDisabled={shoppingAction?.disabled}
        onClose={unmount}
        onCancel={save.onToggle}
        onConfirm={() => {
          shoppingAction?.onClick();
          unmount();
        }}
        showCloseButton
        sideIconName={save.isSaved ? 'HeartFillGray' : 'HeartStrokeGray'}
        content={
          <div className={styles.popupPreviewCard}>
            <div className={styles.popupPreviewImageWrap}>
              <img
                className={styles.popupPreviewImage}
                src={product.imageUrl || CardImage}
                alt={product.title}
              />
              {linkHref ? (
                <div
                  className={styles.linkBtnContainer()}
                  onClick={(event) => event.stopPropagation()}
                  onKeyDown={(event) => event.stopPropagation()}
                  role="presentation"
                >
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
              (typeof save.count === 'number' &&
                Number.isFinite(save.count)) ? (
                <div className={styles.popupPreviewMetaRow}>
                  <div className={styles.colorRow}>
                    {visibleColors.map((hex, index) => (
                      <div className={styles.colorChipContainer} key={index}>
                        <span
                          key={`${hex}-${index}`}
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
                  {typeof save.count === 'number' &&
                  Number.isFinite(save.count) ? (
                    <div className={styles.popupPreviewLikeRow}>
                      <Icon name="HeartFillGray" size="14" />
                      <span className={styles.popupPreviewLikeCount}>
                        {save.count.toLocaleString('ko-KR')}
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
                  {originalPriceText && (
                    <p className={styles.popupPreviewOriginalPrice}>
                      {originalPriceText}
                    </p>
                  )}
                  <div className={styles.popupPreviewDiscountRow}>
                    {discountRateText && (
                      <span className={styles.popupPreviewDiscountRate}>
                        {discountRateText}
                      </span>
                    )}
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
        }
      />
    ));
  }, [
    discountPriceText,
    discountRateText,
    extraColorCount,
    originalPriceText,
    product.brand,
    product.imageUrl,
    product.title,
    link,
    linkHref,
    save.count,
    save.isSaved,
    save.onToggle,
    shoppingAction,
    visibleColors,
  ]);

  return (
    <div
      className={`${styles.wrapper()} ${
        enableWholeCardLink ? styles.clickable : ''
      }`}
      onClick={handleWrapperClick}
      onKeyDown={handleWrapperKeyDown}
      role={enableWholeCardLink && linkHref ? 'link' : undefined}
      tabIndex={enableWholeCardLink && linkHref ? 0 : undefined}
      aria-label={
        enableWholeCardLink ? `${product.title} 상품 링크로 이동` : undefined
      }
    >
      <section className={styles.imgSection()} data-click-area="image">
        {!isLoaded && <div className={styles.skeleton} />}
        <img
          className={styles.cardImage({ loaded: isLoaded })}
          src={product.imageUrl || CardImage}
          alt="카드 이미지"
          onLoad={() => setIsLoaded(true)}
        />

        <div
          className={styles.linkBtnContainer()}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
          role="presentation"
        >
          {isDefault && linkHref && (
            <ActionButton
              variant="solid"
              color="inverse"
              size="XS"
              leftIcon="Link"
              aria-label={'공식 사이트로 이동'}
              onClick={link?.onClick}
            >
              {link?.label || '사이트'}
            </ActionButton>
          )}
        </div>

        <div
          className={styles.saveBtnOverlay}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
          role="presentation"
        >
          {isDefault ? (
            <IconButton
              name={save.isSaved ? 'HeartFillColor' : 'HeartStrokeWhite'}
              size="S"
              disabled={disabled}
              onClick={save.onToggle}
            />
          ) : (
            <IconButton
              name="ViewDetail"
              size="S"
              disabled={disabled}
              onClick={handleShoppingViewDetailClick}
            />
          )}
        </div>
      </section>

      <section className={styles.infoSection}>
        {/* 색상 정보 */}
        {(visibleColors.length > 0 || extraColorCount > 0) && isDefault && (
          <div className={styles.colorRow}>
            {visibleColors.map((hex, index) => (
              <div className={styles.colorChipContainer} key={index}>
                <span
                  key={`${hex}-${index}`}
                  className={styles.colorChip}
                  style={{ backgroundColor: hex }}
                  aria-hidden
                />
              </div>
            ))}
            {extraColorCount > 0 && (
              <span className={styles.colorChipCount}>+{extraColorCount}</span>
            )}
          </div>
        )}

        <div className={styles.middleInfoSection({ cardType })}>
          {/* 브랜드, 상품 이름 */}
          <div className={styles.productInfo} data-click-area="title">
            {isDefault && !!product.brand && (
              <p className={styles.brandText}>{product.brand}</p>
            )}
            <p className={styles.productText}>{product.title}</p>
          </div>

          {/* 가격 정보 */}
          {(originalPriceText || discountPriceText) && (
            <div className={styles.priceSection}>
              {discountRateText ? (
                // 할인 있을 때
                <>
                  {originalPriceText && (
                    <p className={styles.originalPriceText}>
                      {originalPriceText}
                    </p>
                  )}
                  {discountPriceText && (
                    <div className={styles.discountRow}>
                      {discountRateText && (
                        <span className={styles.discountRateText}>
                          {discountRateText}
                        </span>
                      )}
                      <span className={styles.discountPriceText}>
                        {discountPriceText}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                // 할인 없을 때
                originalPriceText && (
                  <span className={styles.discountPriceText}>
                    {originalPriceText}
                  </span>
                )
              )}
            </div>
          )}
        </div>

        {/* 저장(하트) 정보 */}
        {isDefault ? (
          typeof save.count === 'number' &&
          Number.isFinite(save.count) && (
            <div className={styles.saveCountRow}>
              <Icon name="HeartFillGray" size="14" />

              <span className={styles.saveCountText}>
                {save.count.toLocaleString('ko-KR')}
              </span>
            </div>
          )
        ) : (
          <ActionButton
            variant="outlined"
            color="inverse"
            size="S"
            fullWidth
            disabled={shoppingAction?.disabled}
            onClick={shoppingAction?.onClick}
          >
            {shoppingAction?.label ?? '선택'}
          </ActionButton>
        )}
      </section>
    </div>
  );
};
export default ProductCard;
