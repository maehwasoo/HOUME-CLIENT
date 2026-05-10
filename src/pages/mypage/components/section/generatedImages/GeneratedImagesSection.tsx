import { useCallback, useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useGetGeneratedImageListQuery } from '@pages/mypage/apis/queries/useMyPageImagesQuery';
import { useDetectionPrefetch } from '@pages/mypage/hooks/useDetectionPrefetch';
import type { GeneratedImageListItem } from '@pages/mypage/types/apis/generateList';
import type { MyPageUserData } from '@pages/mypage/types/apis/userData';
import { logMyPageClickBtnImgCard } from '@pages/mypage/utils/analytics';
import { formatDate } from '@pages/mypage/utils/formatting';
import { buildResultNavigationState } from '@pages/mypage/utils/resultNavigation';

import { ROUTES } from '@routes/paths';

import Loading from '@components/loading/Loading';

import * as styles from './GeneratedImagesSection.css';
import GenImgCard from '../../card/genImgCard/GenImgCard';
import EmptyStateSection from '../emptyState/EmptyStateSection';

// 프로필 섹션 (닉네임, 크레딧 개수)
interface GeneratedImagesSectionProps {
  userProfile?: MyPageUserData | null;
}

/**
 * 마이페이지 생성 이미지 목록 섹션
 * - 감지 데이터 프리패치와 네비게이션 상태 구성을 함께 처리
 */
const GeneratedImagesSection = ({
  userProfile,
}: GeneratedImagesSectionProps) => {
  const navigate = useNavigate();

  const {
    data: imagesListData,
    isPending,
    isError,
  } = useGetGeneratedImageListQuery();

  const { prefetchDetection } = useDetectionPrefetch();
  const prefetchedImageIdsRef = useRef<Set<number>>(new Set<number>());
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>(
    () => {
      if (typeof window === 'undefined') return {};
      try {
        const stored = sessionStorage.getItem('mypage-image-loaded');
        return stored ? (JSON.parse(stored) as Record<number, boolean>) : {};
      } catch {
        return {};
      }
    }
  );

  const primaryImageId = imagesListData?.groups[0]?.items[0]?.imageId ?? null;

  /**
   * 모든 이미지 감지 데이터 백그라운드 prefetch
   */
  useEffect(() => {
    if (!imagesListData?.groups) return;

    const allItems = imagesListData.groups.flatMap((group) => group.items);

    allItems.forEach((item, index) => {
      if (prefetchedImageIdsRef.current.has(item.imageId)) return;
      prefetchedImageIdsRef.current.add(item.imageId);
      prefetchDetection(item.imageId, item.generatedImageUrl, {
        priority: index === 0 ? 'immediate' : 'background',
      });
    });
  }, [imagesListData, prefetchDetection]);

  /**
   * 감지 프리패치를 브라우저 idle 시간에 스케줄링
   * - 우선순위(immediate) 요청은 즉시 수행
   */
  const scheduleDetectionPrefetch = useCallback(
    (
      imageId: number,
      imageUrl: string,
      options?: { immediate?: boolean; persistAfterUnmount?: boolean }
    ) => {
      if (!imageId || !imageUrl) return;
      const runTask = () => {
        prefetchDetection(imageId, imageUrl, {
          priority: options?.immediate ? 'immediate' : 'background',
          persistAfterUnmount: options?.persistAfterUnmount ?? false,
        });
      };
      if (options?.immediate || typeof window === 'undefined') {
        runTask();
        return;
      }
      const idleCallback = (
        window as Window & {
          requestIdleCallback?: (callback: IdleRequestCallback) => number;
        }
      ).requestIdleCallback;
      if (idleCallback) {
        idleCallback(() => runTask());
        return;
      }
      window.setTimeout(runTask, 0);
    },
    [prefetchDetection]
  );

  /**
   * 결과 페이지로 이동하며 필요한 감지 데이터를 선행 프리패치
   */
  const handleViewResult = (item: GeneratedImageListItem) => {
    logMyPageClickBtnImgCard();
    const navigationState = buildResultNavigationState({
      userProfile: userProfile ?? null,
      imageId: item.imageId,
    });
    navigate(ROUTES.GENERATE_RESULT, {
      state: navigationState,
    });
    // 네비게이션 직후 우선순위 감지 프리페치 실행
    scheduleDetectionPrefetch(item.imageId, item.generatedImageUrl, {
      immediate: true,
      persistAfterUnmount: true,
    });
  };

  /**
   * 이미지 로드 완료 시 로컬 캐시를 갱신하고 프리패치 스케줄
   */
  const handleImageLoad = useCallback(
    (imageId: number, imageUrl?: string) => {
      setLoadedImages((prev) => {
        if (prev[imageId]) return prev;
        const next = { ...prev, [imageId]: true };
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('mypage-image-loaded', JSON.stringify(next));
        }
        return next;
      });
      if (imageUrl) {
        scheduleDetectionPrefetch(imageId, imageUrl, {
          immediate: primaryImageId === imageId,
        });
      }
    },
    [primaryImageId, scheduleDetectionPrefetch]
  );

  // 로딩 중
  if (isPending) {
    return <Loading />;
  }

  // 에러 또는 데이터 없음
  if (isError || !imagesListData) {
    return <EmptyStateSection type="generatedImages" />;
  }

  // 이미지가 없을 때
  if (imagesListData.groups.length === 0) {
    return <EmptyStateSection type="generatedImages" />;
  }

  return (
    <section className={styles.wrapper}>
      {imagesListData.groups.map((group, index) => (
        <div key={group.date}>
          {index > 0 && <div className={styles.divider} />}
          <div className={styles.groupContainer}>
            <div className={styles.date}>{formatDate(group.date)}</div>
            <div className={styles.listContainer}>
              {group.items.map((item) => (
                <GenImgCard
                  key={item.imageId}
                  cardType={item.viewType === 'CURATION' ? 'curation' : 'list'}
                  productSummaryText={item.productSummaryText}
                  imageId={item.imageId}
                  imageUrl={item.generatedImageUrl}
                  usedProducts={item.usedProducts}
                  isLoaded={loadedImages[item.imageId]}
                  onCurationClick={() => handleViewResult(item)}
                  onImageLoad={() =>
                    handleImageLoad(item.imageId, item.generatedImageUrl)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default GeneratedImagesSection;
