import { useCallback, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { useGetGeneratedImageListQuery } from '@pages/mypage/apis/queries/useMyPageImagesQuery';
import { useDetectionPrefetch } from '@pages/mypage/hooks/useDetectionPrefetch';
import { logMyPageClickBtnImgCard } from '@pages/mypage/utils/analytics';
import { formatDate } from '@pages/mypage/utils/formatting';

import { ROUTES } from '@routes/paths';

import { isCurationViewType } from '@store/useImageFlowStore';

import type { ItemResponse } from '@apis/__generated__/data-contracts';

import Loading from '@components/loading/Loading';

import * as styles from './GeneratedImagesSection.css';
import GenImgCard from '../../card/genImgCard/GenImgCard';
import EmptyStateSection from '../emptyState/EmptyStateSection';

/**
 * 마이페이지 생성 이미지 목록 섹션
 * - 감지 데이터 프리패치와 네비게이션 상태 구성을 함께 처리
 */
const GeneratedImagesSection = () => {
  const navigate = useNavigate();

  const {
    data: imagesListData,
    isPending,
    isError,
  } = useGetGeneratedImageListQuery();

  const { prefetchDetection } = useDetectionPrefetch();
  const prefetchedImageIdsRef = useRef<Set<number>>(new Set<number>());

  const primaryImageId =
    imagesListData?.groups?.[0]?.items?.[0]?.imageId ?? null;

  /**
   * 모든 이미지 감지 데이터 백그라운드 prefetch
   */
  useEffect(() => {
    if (!imagesListData?.groups) return;

    const allItems = imagesListData.groups.flatMap(
      (group) => group.items ?? []
    );

    allItems.forEach((item, index) => {
      if (item.imageId == null || !item.generatedImageUrl) return;
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
   * - url에 imageId(houseId)와 viewType을 전달
   *   - houseId: ResultPage가 /meta API 호출에 사용
   *   - viewType: ResultPage의 CurationResult/ListResult 분기 기준 + '상품 다시 선택하기' 버튼 분기 기준
   * - state로 imageUrl + isMirror 전달
   */
  const handleViewResult = (item: ItemResponse) => {
    // viewType 누락 시 URL에 `viewType=undefined` 문자열이 그대로 들어가 ResultPage 분기가 의도와 다르게 동작 → 가드로 차단
    if (item.imageId == null || !item.generatedImageUrl || !item.viewType) {
      return;
    }
    logMyPageClickBtnImgCard();
    navigate(
      `${ROUTES.GENERATE_RESULT}?houseId=${item.imageId}&viewType=${item.viewType}`,
      {
        state: {
          imageUrl: item.generatedImageUrl,
          isMirror: item.isMirror,
        },
      }
    );
    // 네비게이션 직후 우선순위 감지 프리페치 실행
    scheduleDetectionPrefetch(item.imageId, item.generatedImageUrl, {
      immediate: true,
      persistAfterUnmount: true,
    });
  };

  /**
   * 이미지 로드 완료 시 감지 데이터 프리패치 스케줄
   */
  const handleImageLoad = useCallback(
    (imageId: number, imageUrl?: string) => {
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
  const groups = imagesListData.groups ?? [];
  if (groups.length === 0) {
    return <EmptyStateSection type="generatedImages" />;
  }

  return (
    <section className={styles.wrapper}>
      {groups.map((group, index) => (
        <div key={group.date}>
          {index > 0 && <div className={styles.divider} />}
          <div className={styles.groupContainer}>
            <div className={styles.date}>
              {group.date ? formatDate(group.date) : ''}
            </div>
            <div className={styles.listContainer}>
              {(group.items ?? []).map((item) => {
                if (item.imageId == null) return null;
                const isCurationCard = isCurationViewType(item.viewType);
                return (
                  <GenImgCard
                    key={item.imageId}
                    cardType={isCurationCard ? 'curation' : 'list'}
                    productSummaryText={item.productSummaryText}
                    imageId={item.imageId}
                    imageUrl={item.generatedImageUrl}
                    isMirror={item.isMirror}
                    usedProducts={item.usedProducts}
                    onCurationClick={() => handleViewResult(item)}
                    onImageLoad={() =>
                      handleImageLoad(item.imageId!, item.generatedImageUrl)
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default GeneratedImagesSection;
