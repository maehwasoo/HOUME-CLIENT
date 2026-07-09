import { GA_EVENTS } from '@shared/analytics/events';
import {
  getScrollDepthFromWindow,
  scrollDepthParams,
} from '@shared/analytics/params/scrollDepth';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { getEntryRoute } from '@shared/analytics/utils/imageEntryRoute';
import { buildMoodboardIdsParam } from '@shared/analytics/utils/imageFlow';
import { loginStatusParams } from '@shared/analytics/utils/loginStatus';

const selectMoodboardScreenParams = () => ({
  screen_name: SCREEN_NAME.SELECT_MOODBOARD,
});

const moodboardSelectionParams = (selectedImages: number[]) => ({
  image_entry_route: getEntryRoute(),
  selected_moodBoard_ids: buildMoodboardIdsParam(selectedImages),
  count_moodBoard: selectedImages.length,
});

export const trackSelectMoodboardBtnCtaInactiveClick = () => {
  trackEvent(
    GA_EVENTS.selectMoodboard.BTN_CTA_INACTIVE_CLICK,
    selectMoodboardScreenParams()
  );
};

export const trackSelectMoodboardBtnCtaClick = (selectedImages: number[]) => {
  trackEvent(GA_EVENTS.selectMoodboard.BTN_CTA_CLICK, {
    ...selectMoodboardScreenParams(),
    ...moodboardSelectionParams(selectedImages),
  });
};

export const trackSelectMoodboardCardClick = () => {
  trackEvent(GA_EVENTS.selectMoodboard.CARD_CLICK, {
    ...selectMoodboardScreenParams(),
    ...loginStatusParams(),
    ...scrollDepthParams(getScrollDepthFromWindow()),
  });
};
