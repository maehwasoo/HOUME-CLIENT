import * as styles from './MoodboardCard.css';

interface MoodboardCardProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'children' | 'type'> {
  src: string;
  alt: string;
  selectOrder?: number;
}

const MoodboardCard = ({
  src,
  alt,
  selectOrder = 0,
  disabled = false,
  className,
  ...rest
}: MoodboardCardProps) => {
  const isSelected = selectOrder > 0;

  // 카드 컨테이너 스타일 상태 (disabled가 우선)
  const cardState = disabled ? 'disabled' : isSelected ? 'selected' : 'default';
  // 체크박스(index 동그라미) 스타일 상태 (선택 여부만 반영)
  const checkState = isSelected ? 'selected' : 'default';

  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={isSelected}
      className={`${styles.card({ state: cardState })}${className ? ` ${className}` : ''}`}
      {...rest}
    >
      <img src={src} alt={alt} className={styles.image} draggable={false} />
      {!disabled && (
        <span className={styles.checkbox({ state: checkState })}>
          <span className={styles.circle({ state: checkState })}>
            {isSelected ? selectOrder : ''}
          </span>
        </span>
      )}
    </button>
  );
};

export default MoodboardCard;
