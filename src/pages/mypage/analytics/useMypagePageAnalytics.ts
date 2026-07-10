import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  trackMypageBtnBackClick,
  trackMypageBtnSettingClick,
  trackMypageTabGenImgClick,
  trackMypageTabSavedItemClick,
} from '@pages/mypage/analytics/mypageAnalytics';
import type { MypageMenuTab } from '@pages/mypage/MyPage';

import { ROUTES } from '@routes/paths';

interface UseMypagePageAnalyticsOptions {
  activeMenuTab: MypageMenuTab;
  setActiveMenuTab: (tab: MypageMenuTab) => void;
}

export const useMypagePageAnalytics = ({
  activeMenuTab,
  setActiveMenuTab,
}: UseMypagePageAnalyticsOptions) => {
  const navigate = useNavigate();

  const handleTabChange = useCallback(
    (tab: MypageMenuTab) => {
      if (tab === 'savedItems' && activeMenuTab !== 'savedItems') {
        trackMypageTabSavedItemClick();
      }
      if (tab === 'generatedImages' && activeMenuTab !== 'generatedImages') {
        trackMypageTabGenImgClick();
      }
      setActiveMenuTab(tab);
    },
    [activeMenuTab, setActiveMenuTab]
  );

  const handleBackClick = useCallback(() => {
    trackMypageBtnBackClick();
    navigate(-1);
  }, [navigate]);

  const handleSettingClick = useCallback(() => {
    trackMypageBtnSettingClick();
    navigate(ROUTES.SETTING);
  }, [navigate]);

  return {
    handleTabChange,
    handleBackClick,
    handleSettingClick,
  };
};
