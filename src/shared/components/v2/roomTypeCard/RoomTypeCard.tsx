import type { ComponentProps } from 'react';

import clsx from 'clsx';

import emptyImage from '@assets/v2/images/ImgEmpty.png';

import OptimizedImage from '@components/image/OptimizedImage';

import { IMAGE_SIZES } from '@utils/imageVariant';

import * as styles from './RoomTypeCard.css';
import Icon from '../icon/Icon';

type ButtonProps = Omit<
  ComponentProps<'button'>,
  'children' | 'onClick' | 'type'
>;

type DivProps = Omit<ComponentProps<'div'>, 'children'>;

type RoomTypeOptionCardProps = ButtonProps & {
  type: 'default';
  size: 's' | 'm';
  label: string;
  imageSrc: string;
  showRecentBadge?: boolean;
  onClick?: () => void;
  imageLoading?: 'eager' | 'lazy';
};

type RoomTypePreviewCardProps = DivProps & {
  type: 'default';
  size: 'l';
  imageSrc: string;
  imageAlt?: string;
  imageLoading?: 'eager' | 'lazy';
  onPrevClick?: () => void;
  onNextClick?: () => void;
  prevButtonLabel?: string;
  nextButtonLabel?: string;
};

type RoomTypeMoreCardProps = ButtonProps & {
  type: 'more';
  size: 's';
  onClick?: () => void;
};

type RoomTypeCardProps =
  | RoomTypeOptionCardProps
  | RoomTypePreviewCardProps
  | RoomTypeMoreCardProps;

const RoomTypeOptionCard = ({
  type: _variant,
  className,
  size,
  label,
  imageSrc: initialImageSrc,
  showRecentBadge = false,
  onClick,
  imageLoading = 'lazy',
  ...rest
}: RoomTypeOptionCardProps) => {
  return (
    <button
      type="button"
      // clsx: 부모로부터 받은 클래스(className)를 기존 클래스에 합치는 역할
      className={clsx(styles.optionCard({ kind: 'default', size }), className)}
      onClick={onClick}
      {...rest}
    >
      <OptimizedImage
        src={initialImageSrc}
        sizes={IMAGE_SIZES.grid}
        fallbackSrc={emptyImage}
        alt=""
        aria-hidden="true"
        className={styles.image}
        placeholder="skeleton"
        loading={imageLoading}
        decoding="async" // 브라우저 이미지 디코딩 비동기 처리 -> 렌더링 성능. UX 개선
        draggable={false}
      />
      <div className={styles.gradient} aria-hidden="true" />
      <div className={styles.optionInfoRow}>
        <Icon name="DoubleStar" size="16" />
        <p className={styles.optionTitle}>{label}</p>
      </div>
      {size === 'm' && showRecentBadge && (
        <div className={styles.optionFooter}>
          <span className={styles.recentBadge}>최근에 생성됨</span>
        </div>
      )}
    </button>
  );
};

const RoomTypePreviewCard = ({
  type: _variant,
  className,
  imageSrc: initialImageSrc,
  imageAlt = '',
  imageLoading = 'lazy',
  onPrevClick,
  onNextClick,
  prevButtonLabel = '이전',
  nextButtonLabel = '다음',
  ...rest
}: RoomTypePreviewCardProps) => {
  return (
    <div className={clsx(styles.previewCard, className)} {...rest}>
      <OptimizedImage
        src={initialImageSrc}
        sizes={IMAGE_SIZES.full}
        fallbackSrc={emptyImage}
        alt={imageAlt}
        className={styles.image}
        placeholder="color"
        loading={imageLoading}
        decoding="async"
        draggable={false}
      />
      {onPrevClick && (
        <button
          type="button"
          aria-label={prevButtonLabel}
          className={styles.previewNavButton}
          onClick={onPrevClick}
        >
          <Icon name="ArrowLeftFill" size="24" />
        </button>
      )}
      {onNextClick && (
        <button
          type="button"
          aria-label={nextButtonLabel}
          className={styles.previewNavButton}
          onClick={onNextClick}
        >
          <Icon name="ArrowRightFill" size="24" />
        </button>
      )}
    </div>
  );
};

const MoreCard = ({
  type: _variant,
  className,
  onClick,
  ...rest
}: RoomTypeMoreCardProps) => {
  return (
    <button
      type="button"
      aria-label="눌러서 공간 유형 더보기"
      className={clsx(
        styles.optionCard({ kind: 'more', size: 's' }),
        className
      )}
      onClick={onClick}
      {...rest}
    >
      <div className={styles.moreContent}>
        <Icon name="PlusFill" size="32" aria-hidden="true" />
        <div className={styles.moreLabelContainer}>
          <p className={styles.moreLabel}>{'눌러서\n공간 유형 더보기'}</p>
        </div>
      </div>
    </button>
  );
};

const RoomTypeCard = (props: RoomTypeCardProps) => {
  if (props.type === 'more') {
    return <MoreCard {...props} />;
  }

  if (props.size === 'l') {
    return <RoomTypePreviewCard {...props} />;
  }

  return <RoomTypeOptionCard {...props} />;
};

export default RoomTypeCard;
