import type { ReactNode } from 'react';

import type { ScreenName } from '@shared/analytics/screenNames';

import LogoNavBar from '@components/v2/navBar/LogoNavBar';
import TitleNavBar from '@components/v2/navBar/TitleNavBar';

import * as styles from './PageLayout.css';

type HeaderConfig =
  | {
      type: 'title';
      title: string;
      backLabel?: string;
      onBackClick?: () => void;
    }
  | {
      type: 'logo';
      screenName: ScreenName;
      page?: 'landing' | 'home';
      showGenerateButton?: boolean;
      authSlot?: 'none' | 'login' | 'profile';
      onGenerateClick?: () => void;
      onLoginClick?: () => void;
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
            backLabel={header.backLabel}
            onBackClick={header.onBackClick}
          />
        );
      case 'logo':
        return (
          <LogoNavBar
            screenName={header.screenName}
            page={header.page}
            showGenerateButton={header.showGenerateButton}
            authSlot={header.authSlot}
            onGenerateClick={header.onGenerateClick}
            onLoginClick={header.onLoginClick}
            onProfileClick={header.onProfileClick}
          />
        );
      case 'none':
        return null;
    }
  };

  return (
    <div className={`${styles.layout}${className ? ` ${className}` : ''}`}>
      {renderHeader()}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default PageLayout;
