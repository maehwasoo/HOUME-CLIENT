import { useCallback } from 'react';

import {
  trackSelectMoodboardBtnCtaClick,
  trackSelectMoodboardBtnCtaInactiveClick,
  trackSelectMoodboardCardClick,
} from '@pages/imageSetup/analytics/selectMoodboardAnalytics';
import { useInteriorStyle } from '@pages/imageSetup/hooks/useInteriorStyle';

import { GA_EVENTS } from '@shared/analytics/events';
import {
  useAnalyticsPageView,
  useScrollDepthTrack,
} from '@shared/analytics/hooks';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { getEntryRoute } from '@shared/analytics/utils/imageEntryRoute';
import { loginStatusParams } from '@shared/analytics/utils/loginStatus';

import type {
  CompletedInteriorStyle,
  ImageSetupSteps,
} from '../types/funnel/steps';

export const useSelectMoodboardAnalytics = (
  context: ImageSetupSteps['InteriorStyle'],
  onNext: (data: CompletedInteriorStyle) => void
) => {
  const interiorStyle = useInteriorStyle(context, onNext);
  const { selectedImages, handleImageSelect, handleNext, isDataComplete } =
    interiorStyle;

  useAnalyticsPageView(
    GA_EVENTS.selectMoodboard.PAGE_VIEW,
    SCREEN_NAME.SELECT_MOODBOARD,
    {
      ...loginStatusParams(),
      image_entry_route: getEntryRoute(),
    }
  );

  useScrollDepthTrack(
    GA_EVENTS.selectMoodboard.PAGE_SCROLL,
    SCREEN_NAME.SELECT_MOODBOARD,
    {
      extraParams: loginStatusParams(),
    }
  );

  const handleImageSelectWithAnalytics = useCallback(
    (imageId: number) => {
      const isSelected = selectedImages.includes(imageId);

      if (!isSelected) {
        trackSelectMoodboardCardClick();
      }

      handleImageSelect(imageId);
    },
    [handleImageSelect, selectedImages]
  );

  const handleCtaButtonClick = useCallback(() => {
    if (!isDataComplete) {
      trackSelectMoodboardBtnCtaInactiveClick();
      return;
    }

    trackSelectMoodboardBtnCtaClick(selectedImages);
    handleNext();
  }, [handleNext, isDataComplete, selectedImages]);

  return {
    selectedImages,
    handleImageSelect: handleImageSelectWithAnalytics,
    handleCtaButtonClick,
    isDataComplete,
  };
};
