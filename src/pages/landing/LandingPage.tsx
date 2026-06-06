import { useNavigate } from 'react-router-dom';

import type { HomeLocationState } from '@pages/home/HomePage';
import { useLandingQuery } from '@pages/landing/apis/queries/useLandingQuery';
import { LANDING_CTA_BY_VARIANT } from '@pages/landing/constants/landingCtaAbTest';
import { useDissolveAnimation } from '@pages/landing/hooks/useDissolveAnimation';

import { ROUTES } from '@routes/paths';

import ActionButton from '@shared/components/v2/button/actionButton/ActionButton';
import LogoNavBar from '@shared/components/v2/navBar/LogoNavBar';

import OptimizedImage from '@components/image/OptimizedImage';

import { useABTest } from '@hooks/useABTest';

import { IMAGE_SIZES } from '@utils/imageVariant';

import * as styles from './LandingPage.css';

const DISSOLVE_INTERVAL_MS = 4000;

const LandingPage = () => {
  const navigate = useNavigate();
  const { variant } = useABTest();
  const { data: landingData } = useLandingQuery();
  const landingItems = landingData?.landings ?? [];
  const { currentIndex } = useDissolveAnimation({
    itemCount: landingItems.length,
    intervalMs: DISSOLVE_INTERVAL_MS,
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

  const ctaStyle = LANDING_CTA_BY_VARIANT[variant];

  return (
    <main className={styles.page}>
      {landingItems.map((item, index) =>
        item.imageUrl ? (
          <OptimizedImage
            key={item.bannerId ?? index}
            src={item.imageUrl}
            sizes={IMAGE_SIZES.full}
            alt="랜딩 배경 이미지"
            aria-hidden
            loading={index === 0 ? 'eager' : 'lazy'}
            className={`${styles.backgroundImage}${
              index === currentIndex ? ` ${styles.backgroundImageVisible}` : ''
            }`}
          />
        ) : null
      )}
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
          <ActionButton
            variant={ctaStyle.buttonVariant}
            color={ctaStyle.color}
            size="L"
            leftIcon={ctaStyle.leftIcon}
            onClick={handleNavigateHome}
          >
            우리 집 바꾸러 가기
          </ActionButton>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
