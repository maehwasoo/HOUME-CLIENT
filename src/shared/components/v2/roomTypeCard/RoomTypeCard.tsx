import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';

import clsx from 'clsx';

import fallbackImage from '@assets/v2/images/CardRoomTypeFallback.svg';

import * as styles from './RoomTypeCard.css';
import IconButton from '../button/IconButton';
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

// TODO: API 연동 시 skeleton 등 적용

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
  // 이미지 로드 실패 시 fallback src를 유지하고,
  // 부모가 새 imageSrc를 내려주면 그 값으로 다시 동기화
  const [imageSrc, setImageSrc] = useState(initialImageSrc);

  useEffect(() => {
    setImageSrc(initialImageSrc);
  }, [initialImageSrc]);

  return (
    <button
      type="button"
      // clsx: 부모로부터 받은 클래스(className)를 기존 클래스에 합치는 역할
      className={clsx(styles.optionCard({ kind: 'default', size }), className)}
      onClick={onClick}
      {...rest}
    >
      <img
        src={imageSrc}
        alt=""
        aria-hidden="true"
        className={styles.image}
        loading={imageLoading}
        decoding="async" // 브라우저 이미지 디코딩 비동기 처리 -> 렌더링 성능. UX 개선
        draggable={false}
        onError={() => setImageSrc(fallbackImage)}
      />
      <div className={styles.gradient} aria-hidden="true" />
      <div className={styles.optionInfoRow({ size })}>
        <Icon name="DoubleStar" size="16" />
        <p className={styles.optionTitle({ size })}>{label}</p>
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
  const [imageSrc, setImageSrc] = useState(initialImageSrc);

  useEffect(() => {
    setImageSrc(initialImageSrc);
  }, [initialImageSrc]);

  return (
    <div className={clsx(styles.previewCard, className)} {...rest}>
      <img
        src={imageSrc}
        alt={imageAlt}
        className={styles.image}
        loading={imageLoading}
        decoding="async"
        draggable={false}
        onError={() => setImageSrc(fallbackImage)}
      />
      <button
        type="button"
        aria-label={prevButtonLabel}
        className={styles.previewNavButton}
        onClick={onPrevClick}
      >
        <IconButton name="ArrowLeft" size="M" />
      </button>
      <button
        type="button"
        aria-label={nextButtonLabel}
        className={styles.previewNavButton}
        onClick={onNextClick}
      >
        <IconButton name="ArrowRight" size="M" />
      </button>
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
