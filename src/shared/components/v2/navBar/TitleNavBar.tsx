import TextButton from '@shared/components/v2/btnText/TextButton';

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
        <TextButton
          color="secondary"
          size="m"
          aria-label={backAriaLabel}
          className={styles.backButton}
          leftIcon="ArrowLeft"
          onClick={onBackClick}
        >
          {backLabel}
        </TextButton>
      </div>
      <h1 className={styles.title}>{title}</h1>
    </nav>
  );
};

export default TitleNavBar;
