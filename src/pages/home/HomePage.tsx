import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useMyPageUserQuery } from '@pages/mypage/apis/queries/useMyPageUserQuery';

import { ROUTES } from '@routes/paths';

import { useUserStore } from '@store/useUserStore';

import MenuTab from '@components/v2/menuTab/MenuTab';
import LogoNavBar from '@components/v2/navBar/LogoNavBar';

import ExploreTab from './components/explore/ExploreTab';
import ProductTab from './components/product/ProductTab';
import * as styles from './HomePage.css';
import {
  logLandingClickBtnCTA,
  logLandingClickBtnMypage,
  logLandingScrollDepthTreshold,
} from './utils/analytics';

export type HomeMenuTab = 'explore' | 'product';

const HomePage = () => {
  const navigate = useNavigate();
  const accessToken = useUserStore((state) => state.accessToken);
  const isLoggedIn = !!accessToken;
  const [activeMenuTab, setActiveMenuTab] = useState<HomeMenuTab>('explore');

  const scrollDepth50Sent = useRef(false);
  const scrollDepth100Sent = useRef(false);

  const { isLoading: isUserDataLoading } = useMyPageUserQuery({
    enabled: isLoggedIn,
  });

  // 스크롤 깊이 추적
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercentage =
        scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      // 50% 도달 시 이벤트 전송 (초기 1회)
      if (scrollPercentage >= 50 && !scrollDepth50Sent.current) {
        logLandingScrollDepthTreshold(50);
        scrollDepth50Sent.current = true;
      }

      // 100% 도달 시 이벤트 전송 (초기 1회)
      if (
        (scrollPercentage >= 99.5 ||
          scrollTop + window.innerHeight >=
            document.documentElement.scrollHeight - 10) &&
        !scrollDepth100Sent.current
      ) {
        logLandingScrollDepthTreshold(100);
        scrollDepth100Sent.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /**
   * 플로팅 버튼 클릭 핸들러
   * - 로그인 안됨: 로그인 페이지로 이동
   * - 로그인됨: imageSetup 이미지 생성 플로우로 이동 (크레딧 체크는 ActivityInfo에서 수행)
   */
  const handleGenerate = () => {
    logLandingClickBtnCTA();

    if (!isLoggedIn) {
      navigate(ROUTES.LOGIN);
      return;
    }

    if (isUserDataLoading) return;

    // 크레딧 체크 없이 무조건 퍼널 진입 허용
    navigate(ROUTES.IMAGE_SETUP);
  };

  // 프로필 버튼 클릭 핸들러 (마이페이지 버튼 클릭 이벤트 전송)
  const handleProfile = () => {
    if (isLoggedIn) {
      logLandingClickBtnMypage();
    }
    navigate(ROUTES.MYPAGE);
  };

  const handleLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <main className={styles.page}>
      <LogoNavBar
        page="home"
        showGenerateButton
        authSlot={isLoggedIn ? 'profile' : 'login'}
        onGenerateClick={handleGenerate}
        onProfileClick={handleProfile}
        onLoginClick={handleLogin}
      />
      <MenuTab
        tabs={[
          { value: 'explore', label: '탐색' },
          { value: 'product', label: '상품' },
        ]}
        activeTab={activeMenuTab}
        onTabChange={setActiveMenuTab}
      />
      {activeMenuTab === 'explore' && <ExploreTab />}
      {activeMenuTab === 'product' && <ProductTab />}
    </main>
  );
};

export default HomePage;
