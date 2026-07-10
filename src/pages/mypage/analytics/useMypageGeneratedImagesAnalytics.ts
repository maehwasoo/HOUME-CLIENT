import { useCallback, useEffect, useRef } from 'react';

import {
  trackMypageBtnMoreGenImgClick,
  trackMypageCardGenImgClick,
  trackMypageListGenImgView,
} from '@pages/mypage/analytics/mypageAnalytics';

import type {
  DateGroupResponse,
  ItemResponse,
} from '@apis/__generated__/data-contracts';

interface UseMypageGeneratedImagesAnalyticsOptions {
  groups: DateGroupResponse[];
  isListReady: boolean;
}

export const useMypageGeneratedImagesAnalytics = ({
  groups,
  isListReady,
}: UseMypageGeneratedImagesAnalyticsOptions) => {
  const trackedListViewRef = useRef(false);

  useEffect(() => {
    trackedListViewRef.current = false;
  }, [groups]);

  useEffect(() => {
    if (!isListReady || groups.length === 0 || trackedListViewRef.current) {
      return;
    }

    trackedListViewRef.current = true;
    trackMypageListGenImgView(groups);
  }, [groups, isListReady]);

  const trackCardGenImgClick = useCallback((item: ItemResponse) => {
    trackMypageCardGenImgClick(item);
  }, []);

  const trackMoreGenImgClick = useCallback((item: ItemResponse) => {
    trackMypageBtnMoreGenImgClick(item);
  }, []);

  return {
    trackCardGenImgClick,
    trackMoreGenImgClick,
  };
};
