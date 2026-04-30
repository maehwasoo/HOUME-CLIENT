import { useNavigate } from 'react-router-dom';

import { useABTest } from '@pages/generate/hooks/useABTest';
import type { HomeLocationState } from '@pages/home/HomePage';
import { useLandingQuery } from '@pages/landing/apis/queries/useLandingQuery';
import { useDissolveAnimation } from '@pages/landing/hooks/useDissolveAnimation';

import { ROUTES } from '@routes/paths';

import ActionButton from '@shared/components/v2/button/actionButton/ActionButton';
import LogoNavBar from '@shared/components/v2/navBar/LogoNavBar';

import * as styles from './LandingPage.css';

const DISSOLVE_INTERVAL_MS = 4000;
const DISSOLVE_DURATION_MS = 300;

const LandingPage = () => {
  const navigate = useNavigate();
  const { variant, isLoading } = useABTest();
  const { data: landingData } = useLandingQuery();
  const landingItems = landingData?.landings ?? [];
  const { currentIndex, previousIndex } = useDissolveAnimation({
    itemCount: landingItems.length,
    intervalMs: DISSOLVE_INTERVAL_MS,
    durationMs: DISSOLVE_DURATION_MS,
  });
  const selectedLanding = landingItems[currentIndex] ?? landingItems[0];

  const handleNavigateHome = () => {
    const bannerId = selectedLanding?.bannerId;
    const state: HomeLocationState = {
      activeTab: 'explore',
      ...(typeof bannerId === 'number' && bannerId > 0
        ? { exploreSeedBannerId: bannerId }
        : {}),
    };
    navigate(ROUTES.HOME, { state });
  };

  /** A/B: single → solid inverse CTA, multiple → ghost + 아이콘 CTA */
  const isGhostCta = !isLoading && variant === 'multiple';

  return (
    <main className={styles.page}>
      {previousIndex !== null && landingItems[previousIndex]?.imageUrl ? (
        <img
          src={landingItems[previousIndex].imageUrl}
          alt="랜딩 배경 이미지"
          aria-hidden
          className={`${styles.backgroundImage} ${styles.backgroundImagePrevious}`}
        />
      ) : null}
      {selectedLanding?.imageUrl ? (
        <img
          key={selectedLanding.bannerId ?? currentIndex}
          src={selectedLanding.imageUrl}
          alt="랜딩 배너 이미지"
          aria-hidden
          className={`${styles.backgroundImage} ${styles.backgroundImageCurrent}`}
        />
      ) : null}
      <LogoNavBar page="landing" />
      <section className={styles.mainSection}>
        <div className={styles.contentBlock}>
          <div className={styles.textContainer}>
            <p className={styles.title}>
              {selectedLanding?.name}
              <br />
              나를 위한 맞춤형 인테리어는?
            </p>
            <p className={styles.text}>
              집 구조, 취향, 생활 방식까지 반영하는 AI 홈 스타일링
            </p>
          </div>
          {isGhostCta ? (
            <ActionButton
              variant="ghost"
              color="primary"
              size="L"
              leftIcon="DoubleStar"
              onClick={handleNavigateHome}
            >
              우리 집 바꾸러 가기
            </ActionButton>
          ) : (
            <ActionButton
              variant="solid"
              color="inverse"
              size="L"
              onClick={handleNavigateHome}
            >
              우리 집 바꾸러 가기
            </ActionButton>
          )}
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
