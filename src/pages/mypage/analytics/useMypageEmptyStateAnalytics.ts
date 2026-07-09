import { useCallback, useEffect, useRef } from 'react';

import {
  trackMypageBtnCtaEmptyGenImgClick,
  trackMypageBtnCtaEmptySavedItemClick,
  trackMypageBtnTextEmptyGenImgClick,
  trackMypageBtnTextEmptySavedItemClick,
  trackMypageListEmptyGenImgView,
  trackMypageListEmptySavedItemView,
} from '@pages/mypage/analytics/mypageAnalytics';
import type { FurnitureItem } from '@pages/mypage/types/apis/saveItemsList';

interface UseMypageEmptyStateAnalyticsOptions {
  type: 'generatedImages' | 'savedItems';
  savedItemsForParams: Pick<FurnitureItem, 'rawProductId'>[];
  enabled: boolean;
}

export const useMypageEmptyStateAnalytics = ({
  type,
  savedItemsForParams,
  enabled,
}: UseMypageEmptyStateAnalyticsOptions) => {
  const trackedViewRef = useRef(false);

  useEffect(() => {
    trackedViewRef.current = false;
  }, [type]);

  useEffect(() => {
    if (!enabled || trackedViewRef.current) return;

    trackedViewRef.current = true;
    if (type === 'generatedImages') {
      trackMypageListEmptyGenImgView(savedItemsForParams);
    } else {
      trackMypageListEmptySavedItemView(savedItemsForParams);
    }
  }, [enabled, savedItemsForParams, type]);

  const wrapPrimaryClick = useCallback(
    (onClick: () => void) => () => {
      if (type === 'generatedImages') {
        trackMypageBtnCtaEmptyGenImgClick(savedItemsForParams);
      } else {
        trackMypageBtnCtaEmptySavedItemClick(savedItemsForParams);
      }
      onClick();
    },
    [savedItemsForParams, type]
  );

  const wrapSecondaryClick = useCallback(
    (onClick: () => void) => () => {
      if (type === 'generatedImages') {
        trackMypageBtnTextEmptyGenImgClick(savedItemsForParams);
      } else {
        trackMypageBtnTextEmptySavedItemClick(savedItemsForParams);
      }
      onClick();
    },
    [savedItemsForParams, type]
  );

  return {
    wrapPrimaryClick,
    wrapSecondaryClick,
  };
};
