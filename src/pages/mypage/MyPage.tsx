import { useEffect, useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/routes/paths';
import FeatureErrorFallback from '@/shared/components/errorFallback/FeatureErrorFallback';
import InlineError from '@/shared/components/inlineError/InlineError';
import Loading from '@/shared/components/loading/Loading';
import TitleNavBar from '@/shared/components/navBar/TitleNavBar';
import { useUserStore } from '@/store/useUserStore';

import TabNavBar from './components/navBar/TabNavBar';
import GeneratedImagesSection from './components/section/generatedImages/GeneratedImagesSection';
import ProfileSection from './components/section/profile/ProfileSection';
import SavedItemsSection from './components/section/savedItems/SavedItemsSection';
import { useMyPageUser } from './hooks/useMypage';
import * as styles from './MyPage.css';

const MyPage = () => {
  const navigate = useNavigate();

  // sessionStorage에서 탭 정보 가져오기
  const initialTab =
    (sessionStorage.getItem('activeTab') as 'savedItems' | 'generatedImages') ||
    'generatedImages';
  const [activeTab, setActiveTab] = useState<'savedItems' | 'generatedImages'>(
    initialTab
  );

  useEffect(() => {
    // 탭 정보 사용 후 제거
    sessionStorage.removeItem('activeTab');
  }, []);

  // 로그인 상태 확인
  const accessToken = useUserStore((state) => state.accessToken);
  const isLoggedIn = !!accessToken;

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    refetch,
  } = useMyPageUser({
    enabled: isLoggedIn,
  });

  useEffect(() => {
    // 로그인되지 않았으면 로그인 페이지로 리디렉션
    if (!isLoggedIn) {
      navigate(ROUTES.LOGIN);
    }
  }, [isLoggedIn, navigate]);

  // 로그인되지 않았으면 아무것도 렌더링하지 않음 (리디렉션 중)
  if (!isLoggedIn) {
    return null;
  }

  const profileName = userData?.name || '사용자';
  const profileCredit = userData?.CreditCount ?? 0;

  return (
    <div className={styles.contentWrapper}>
      <TitleNavBar
        title="마이페이지"
        isBackIcon
        isSettingBtn
        isLoginBtn={false}
        onBackClick={() => navigate(ROUTES.HOME)}
      />

      {isUserError ? (
        <InlineError onRetry={refetch} />
      ) : (
        <ErrorBoundary FallbackComponent={FeatureErrorFallback}>
          <ProfileSection
            userName={profileName}
            credit={profileCredit}
            maxCredit={5}
          />

          <TabNavBar activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === 'savedItems' ? (
            <SavedItemsSection />
          ) : (
            <GeneratedImagesSection userProfile={userData} />
          )}
        </ErrorBoundary>
      )}

      {isUserLoading && <Loading />}
    </div>
  );
};

export default MyPage;
