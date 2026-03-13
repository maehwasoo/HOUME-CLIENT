import type { ReactNode } from 'react';

import LogoNavBar from '@components/navBar/LogoNavBar';
import TitleNavBar from '@components/navBar/TitleNavBar';

import * as styles from './PageLayout.css';

type HeaderConfig =
  | {
      type: 'title';
      title: string;
      showBackButton?: boolean;
      onBackClick?: () => void;
      showLoginButton?: boolean;
      showSettingButton?: boolean;
    }
  | {
      type: 'logo';
      buttonType?: 'login' | 'profile' | null;
      onProfileClick?: () => void;
    }
  | { type: 'none' };

interface PageLayoutProps {
  header: HeaderConfig;
  children: ReactNode;
  className?: string;
}

const PageLayout = ({ header, children, className }: PageLayoutProps) => {
  const renderHeader = () => {
    switch (header.type) {
      case 'title':
        return (
          <TitleNavBar
            title={header.title}
            isBackIcon={header.showBackButton ?? true}
            onBackClick={header.onBackClick}
            isLoginBtn={header.showLoginButton ?? false}
            isSettingBtn={header.showSettingButton ?? false}
          />
        );
      case 'logo':
        return (
          <LogoNavBar
            buttonType={header.buttonType ?? null}
            onProfileClick={header.onProfileClick}
          />
        );
      case 'none':
        return null;
    }
  };

  return (
    <div className={`${styles.layout} ${className ? ` ${className}` : ''}`}>
      {renderHeader()}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default PageLayout;
