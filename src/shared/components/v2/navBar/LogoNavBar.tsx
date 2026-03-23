import imgProfile from '@assets/v2/images/ImgProfile.svg';
import logotypeBlack from '@assets/v2/images/LogotypeBlack.svg';
import logotypeWhite from '@assets/v2/images/LogotypeWhite.svg';

import * as styles from './LogoNavBar.css';
import TextButton from '../btnText/TextButton';

type AuthSlot = 'none' | 'login' | 'profile';
type Page = 'landing' | 'home';

interface LogoNavBarProps extends React.ComponentProps<'nav'> {
  page?: Page;
  showGenerateButton?: boolean;
  authSlot?: AuthSlot;
  onGenerateClick?: () => void;
  onLoginClick?: () => void;
  onProfileClick?: () => void;
}

const LogoNavBar = ({
  page = 'home',
  showGenerateButton = false,
  authSlot = 'none',
  onGenerateClick,
  onLoginClick,
  onProfileClick,
  ...props
}: LogoNavBarProps) => {
  const logoSrc = page === 'home' ? logotypeBlack : logotypeWhite;
  const hasAction = showGenerateButton || authSlot !== 'none';

  return (
    <nav className={styles.container} {...props}>
      <div className={styles.leftContainer}>
        <img src={logoSrc} alt="Houme" className={styles.logoImage} />
      </div>
      <div className={styles.rightContainer({ hasAction })}>
        {showGenerateButton && (
          // TODO: 공컴 button으로 교체
          <button
            type="button"
            className={styles.generateButton}
            onClick={onGenerateClick}
          >
            <span className={styles.generateLabel}>이미지 생성</span>
          </button>
        )}
        {authSlot === 'login' && (
          <div className={styles.actionContainer}>
            <TextButton color="primary" size="s" onClick={onLoginClick}>
              로그인
            </TextButton>
          </div>
        )}
        {authSlot === 'profile' && (
          <div className={styles.actionContainer}>
            <button
              type="button"
              aria-label="프로필"
              className={styles.profileButton}
              onClick={onProfileClick}
            >
              <img
                src={imgProfile}
                alt=""
                aria-hidden="true"
                className={styles.profileImage}
              />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LogoNavBar;
