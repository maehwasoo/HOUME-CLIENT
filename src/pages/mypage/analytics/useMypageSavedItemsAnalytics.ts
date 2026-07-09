import { useCallback, useEffect, useRef } from 'react';

import {
  trackMypageFeedCardGoSiteClick,
  trackMypageFeedCardOnCardClick,
  trackMypageFeedCardSaveClick,
  trackMypageFeedCardUnsaveClick,
  trackMypageFeedCardView,
  trackMypageListSavedItemView,
} from '@pages/mypage/analytics/mypageAnalytics';
import type { FurnitureItem } from '@pages/mypage/types/apis/saveItemsList';

interface UseMypageSavedItemsAnalyticsOptions {
  savedItems: FurnitureItem[];
  isFetched: boolean;
}

export const useMypageSavedItemsAnalytics = ({
  savedItems,
  isFetched,
}: UseMypageSavedItemsAnalyticsOptions) => {
  const trackedListViewRef = useRef(false);
  const trackedFeedCardIdsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!isFetched || savedItems.length === 0 || trackedListViewRef.current) {
      return;
    }

    trackedListViewRef.current = true;
    trackMypageListSavedItemView(savedItems);
  }, [isFetched, savedItems]);

  useEffect(() => {
    if (!isFetched || savedItems.length === 0) return;

    savedItems.forEach((item) => {
      if (trackedFeedCardIdsRef.current.has(item.rawProductId)) return;
      trackedFeedCardIdsRef.current.add(item.rawProductId);
      trackMypageFeedCardView(item);
    });
  }, [isFetched, savedItems]);

  const handleFeedCardClick = useCallback((item: FurnitureItem) => {
    trackMypageFeedCardOnCardClick(item);
  }, []);

  const handleFeedCardGoSiteClick = useCallback((item: FurnitureItem) => {
    trackMypageFeedCardGoSiteClick(item);
  }, []);

  const handleFeedCardSaveToggle = useCallback(
    (item: FurnitureItem, isSaved: boolean) => {
      if (isSaved) {
        trackMypageFeedCardUnsaveClick(item);
      } else {
        trackMypageFeedCardSaveClick(item);
      }
    },
    []
  );

  return {
    handleFeedCardClick,
    handleFeedCardGoSiteClick,
    handleFeedCardSaveToggle,
  };
};
