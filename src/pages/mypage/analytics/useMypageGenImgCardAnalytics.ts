import { useCallback, useEffect, useRef } from 'react';

import {
  trackMypageListCardClick,
  trackMypageListCardGoSiteClick,
  trackMypageListCardSaveClick,
  trackMypageListCardUnsaveClick,
  trackMypageListCardView,
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
  isListType,
  usedProducts,
}: UseMypageGenImgCardAnalyticsOptions) => {
  const trackedListCardViewRef = useRef(false);
  const scrollDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current);
      }
    };
  }, []);

  useEffect(() => {
    trackedListCardViewRef.current = false;
  }, [item.imageId, usedProducts]);

  useEffect(() => {
    if (
      !isListType ||
      usedProducts.length === 0 ||
      trackedListCardViewRef.current
    ) {
      return;
    }

    trackedListCardViewRef.current = true;
    trackMypageListCardView();
  }, [isListType, usedProducts]);

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
      const firstProduct = usedProducts.find(
        (product) => product.rawProductId != null
      );
      trackMypageSlideGenImgItemScroll({
        item,
        product: firstProduct,
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
