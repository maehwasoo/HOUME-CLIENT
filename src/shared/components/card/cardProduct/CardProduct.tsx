import { useEffect, useState } from 'react';

import HeartGrayXSIcon from '@assets/icons/icnHeartGrayXS.svg?react';
import CardImage from '@assets/images/cardExImg.svg?url';
import LinkButton from '@components/button/linkButton/LinkButton';
import SaveButton from '@components/button/saveButton/SaveButton';

import * as styles from './CardProduct.css';

type CardSize = 'small' | 'large';

type CardClickArea = 'card' | 'image' | 'title';

interface CardProductProps {
  size: CardSize;
  title: string;
  brand?: string;
  imageUrl?: string;
  isSaved: boolean;
  onToggleSave: () => void;
  linkHref?: string;
  linkLabel?: string;
  disabled?: boolean;
  onLinkClick?: () => void;
  onCardClick?: (area?: CardClickArea) => void;
  enableWholeCardLink?: boolean;
  originalPrice?: number;
  discountRate?: number;
  discountPrice?: number;
  colorHexes?: string[];
  saveCount?: number;
}

const CardProduct = ({
  size,
  title,
  brand,
  imageUrl,
  isSaved,
  onToggleSave,
  linkHref,
  linkLabel = '사이트',
  disabled = false,
  onLinkClick,
  onCardClick,
  enableWholeCardLink = false,
  originalPrice,
  discountRate,
  discountPrice,
  colorHexes,
  saveCount,
}: CardProductProps) => {
  const isLarge = size === 'large';
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [imageUrl]);

  const formatKrw = (value?: number) => {
    if (typeof value !== 'number' || !Number.isFinite(value)) return null;
    return `${value.toLocaleString('ko-KR')}원`;
  };

  const originalPriceText = formatKrw(originalPrice);
  const discountPriceText = formatKrw(discountPrice);
  const discountRateText =
    typeof discountRate === 'number' && Number.isFinite(discountRate)
      ? `${discountRate}%`
      : null;

  const visibleColors = Array.isArray(colorHexes)
    ? colorHexes.filter(Boolean).slice(0, 3)
    : [];
  const extraColorCount =
    Array.isArray(colorHexes) && colorHexes.length > 3
      ? colorHexes.length - 3
      : 0;

  const handleWrapperClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    const areaElement = target?.closest?.('[data-click-area]') as HTMLElement;
    const area = areaElement?.dataset?.clickArea as CardClickArea | undefined;
    const resolvedArea: CardClickArea =
      area === 'image' || area === 'title' ? area : 'card';

    onCardClick?.(resolvedArea);

    if (!enableWholeCardLink) return;
    if (!linkHref) return;
    if (typeof window === 'undefined') return;

    window.open(linkHref, '_blank', 'noopener,noreferrer');
  };

  const handleWrapperKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!enableWholeCardLink) return;
    if (!linkHref) return;
    if (typeof window === 'undefined') return;
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    onCardClick?.('card');
    window.open(linkHref, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`${styles.wrapper({ size })} ${
        enableWholeCardLink ? styles.clickable : ''
      }`}
      onClick={handleWrapperClick}
      onKeyDown={handleWrapperKeyDown}
      role={enableWholeCardLink && linkHref ? 'link' : undefined}
      tabIndex={enableWholeCardLink && linkHref ? 0 : undefined}
      aria-label={enableWholeCardLink ? `${title} 상품 링크로 이동` : undefined}
    >
      <section className={styles.imgSection({ size })} data-click-area="image">
        {!isLoaded && <div className={styles.skeleton} />}
        <img
          className={styles.cardImage({ loaded: isLoaded })}
          src={imageUrl || CardImage}
          alt="카드 이미지"
          onLoad={() => setIsLoaded(true)}
        />

        <div
          className={styles.linkBtnContainer({ size })}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
          role="presentation"
        >
          {linkHref && (
            <LinkButton
              href={linkHref}
              typeVariant={isLarge ? 'withText' : 'onlyIcon'}
              aria-label={isLarge ? undefined : '공식 사이트로 이동'}
              onClick={onLinkClick}
            >
              {isLarge && linkLabel}
            </LinkButton>
          )}
        </div>

        {isLarge && (
          <div
            className={styles.saveBtnOverlay}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
            role="presentation"
          >
            <SaveButton
              disabled={disabled}
              isSelected={isSaved}
              onClick={onToggleSave}
            />
          </div>
        )}
      </section>

      {isLarge ? (
        <section className={styles.infoSection}>
          {(visibleColors.length > 0 || extraColorCount > 0) && (
            <div className={styles.colorRow}>
              {visibleColors.map((hex, index) => (
                <span
                  key={`${hex}-${index}`}
                  className={styles.colorChip}
                  aria-hidden
                >
                  <span
                    className={styles.colorChipInner}
                    style={{ backgroundColor: hex }}
                  />
                </span>
              ))}
              {extraColorCount > 0 && (
                <span className={styles.colorChipCount}>
                  +{extraColorCount}
                </span>
              )}
            </div>
          )}

          <div className={styles.productInfo} data-click-area="title">
            {!!brand && <p className={styles.brandTextLarge}>{brand}</p>}
            <p className={styles.productTextLarge}>{title}</p>
          </div>

          {(originalPriceText || discountPriceText) && (
            <div className={styles.priceSection}>
              {originalPriceText && (
                <p className={styles.originalPriceText}>{originalPriceText}</p>
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
            </div>
          )}

          {typeof saveCount === 'number' && Number.isFinite(saveCount) && (
            <div className={styles.saveCountRow}>
              <span className={styles.saveCountIcon} aria-hidden>
                <HeartGrayXSIcon />
              </span>
              <span className={styles.saveCountText}>
                {saveCount.toLocaleString('ko-KR')}
              </span>
            </div>
          )}
        </section>
      ) : (
        <section className={styles.bottomSection}>
          <div className={styles.textContainer}>
            <p className={styles.productText}>{title}</p>
            {!!brand && <p className={styles.brandText}>{brand}</p>}
          </div>
          <div className={styles.saveBtnContainer}>
            <div
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
              role="presentation"
            >
              <SaveButton
                disabled={disabled}
                isSelected={isSaved}
                onClick={onToggleSave}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
export default CardProduct;
