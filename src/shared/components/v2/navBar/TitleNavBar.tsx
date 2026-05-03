import { useNavigate } from 'react-router-dom';

import TextButton from '@components/v2/btnText/TextButton';

import { ROUTES } from '@/routes/paths';

import * as styles from './TitleNavBar.css';

export type TitleNavBarBackground = 'transparent' | 'primary';
export type TitleNavBarPlacement = 'sticky' | 'overContent';

interface TitleNavBarProps extends React.ComponentProps<'nav'> {
  title?: string;
  backLabel?: string;
  isSettingBtn?: boolean;
  onBackClick?: () => void;
  background?: TitleNavBarBackground;
  placement?: TitleNavBarPlacement;
}

const TitleNavBar = ({
  title,
  backLabel,
  onBackClick,
  isSettingBtn = false,
  background = 'primary',
  placement = 'sticky',
  ...props
}: TitleNavBarProps) => {
  const backAriaLabel = backLabel ?? '뒤로가기';
  const navigate = useNavigate();
  const displayTitle = title?.trim();

  return (
    <nav className={styles.container({ background, placement })} {...props}>
      <div className={styles.leftSlot}>
        <TextButton
          color="secondary"
          size="m"
          aria-label={backAriaLabel}
          leftIcon="ArrowLeft"
          onClick={onBackClick}
        >
          {backLabel}
        </TextButton>
      </div>
      {displayTitle ? <h1 className={styles.title}>{displayTitle}</h1> : null}
      <div className={styles.rightSlot}>
        {isSettingBtn && (
          <TextButton
            size="m"
            onClick={() => navigate(ROUTES.SETTING)}
            aria-label="설정으로 이동"
          >
            설정
          </TextButton>
        )}
      </div>
    </nav>
  );
};

export default TitleNavBar;
