import Icon from '@components/v2/icon/Icon';

import * as styles from './TitleNavBar.css';

interface TitleNavBarProps extends React.ComponentProps<'nav'> {
  title: string;
  backLabel?: string;
  onBackClick?: () => void;
}

const TitleNavBar = ({
  title,
  backLabel,
  onBackClick,
  ...props
}: TitleNavBarProps) => {
  const backAriaLabel = backLabel ?? '뒤로가기';

  return (
    <nav className={styles.container} {...props}>
      <div className={styles.leftSlot}>
        {/* TODO: 공통 컴포넌트로 수정 */}
        <button
          type="button"
          aria-label={backAriaLabel}
          className={styles.backButton}
          onClick={onBackClick}
        >
          <Icon name="ArrowLeft" size="16" />
          <span className={styles.label}>{backLabel}</span>
        </button>
      </div>
      <h1 className={styles.title}>{title}</h1>
    </nav>
  );
};

export default TitleNavBar;
