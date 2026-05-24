import { useEffect, useMemo, useRef, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useMyPageUserQuery } from '@pages/mypage/apis/queries/useMyPageUserQuery';

import { ROUTES } from '@routes/paths';

import { useImageFlowStore, ENTRY_ROUTE } from '@store/useImageFlowStore';
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

export type HomeLocationState = {
  activeTab?: HomeMenuTab;
  exploreSeedBannerId?: number;
};

const HomePage = () => {
  const navigate = useNavigate();
  const accessToken = useUserStore((state) => state.accessToken);
  const isLoggedIn = !!accessToken;
  const location = useLocation();
  const homeState = location.state as HomeLocationState | undefined;

  // 외부 진입(로그인 복귀/ResultPage 재선택) 흐름 감지:
  // useImageFlowStore.preset.type === 'product'이고 productsToBeRestored이 비어있지 않으면
  // -> 사용자가 '이 상품들로 우리 집 꾸미기' CTA를 거쳐서 돌아오는 중. 따라서 '상품' 탭으로 이동
  // HomePage mount 시 1회만 평가 (preset은 ProductTab mount 직후 clearPreset으로 비워지므로 다음 진입엔 영향 없음)
  const presetHasProductsToBeRestored = useMemo(() => {
    const preset = useImageFlowStore.getState().preset;
    return preset?.type === 'product' && preset.productsToBeRestored.length > 0;
  }, []);

  const [activeMenuTab, setActiveMenuTab] = useState<HomeMenuTab>(
    homeState?.activeTab ??
      (presetHasProductsToBeRestored ? 'product' : 'explore')
  );

  const scrollDepth50Sent = useRef(false);
  const scrollDepth100Sent = useRef(false);

  // TODO: v1에서 로그인 확인용으로 사용, v2 구현 과정에서 임시 미사용 처리함
  useMyPageUserQuery({ enabled: isLoggedIn });

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

  const handleGenerate = () => {
    logLandingClickBtnCTA();
    useImageFlowStore
      .getState()
      .setFlow({ entryRoute: ENTRY_ROUTE.GENERATE_BUTTON });
    navigate(ROUTES.IMAGE_SETUP);
  };

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
        sticky={activeMenuTab === 'explore'}
        onTabChange={setActiveMenuTab}
      />
      {activeMenuTab === 'explore' && (
        <ExploreTab exploreSeedBannerId={homeState?.exploreSeedBannerId} />
      )}
      {activeMenuTab === 'product' && <ProductTab />}
    </main>
  );
};

export default HomePage;
