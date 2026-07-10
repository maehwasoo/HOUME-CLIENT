import { useCallback, useEffect, useRef } from 'react';

import {
  trackMypageListCardClick,
  trackMypageListCardGoSiteClick,
  trackMypageListCardSaveClick,
  trackMypageListCardUnsaveClick,
  trackMypageSlideGenImgItemScroll,
} from '@pages/mypage/analytics/mypageAnalytics';

import type {
  ItemResponse,
  UsedProductResponse,
} from '@apis/__generated__/data-contracts';

interface UseMypageGenImgCardAnalyticsOptions {
  item: Pick<
    ItemResponse,
    'imageId' | 'viewType' | 'bannerTitle' | 'productSummaryText'
  >;
  isListType: boolean;
  usedProducts: UsedProductResponse[];
}

export const useMypageGenImgCardAnalytics = ({
  item,
  isListType: _isListType,
  usedProducts,
}: UseMypageGenImgCardAnalyticsOptions) => {
  const scrollDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current);
      }
    };
  }, []);

  const handleListCardClick = useCallback((product: UsedProductResponse) => {
    trackMypageListCardClick(product);
  }, []);

  const handleListCardGoSiteClick = useCallback(
    (product: UsedProductResponse) => {
      trackMypageListCardGoSiteClick(product);
    },
    []
  );

  const handleListCardSaveToggle = useCallback(
    (product: UsedProductResponse, isSaved: boolean) => {
      if (isSaved) {
        trackMypageListCardUnsaveClick(product);
      } else {
        trackMypageListCardSaveClick(product);
      }
    },
    []
  );

  const handleSlideScroll = useCallback(() => {
    if (scrollDebounceRef.current) {
      clearTimeout(scrollDebounceRef.current);
    }

    scrollDebounceRef.current = setTimeout(() => {
      trackMypageSlideGenImgItemScroll({
        item,
        usedProducts,
      });
    }, 300);
  }, [item, usedProducts]);

  return {
    handleListCardClick,
    handleListCardGoSiteClick,
    handleListCardSaveToggle,
    handleSlideScroll,
  };
};
