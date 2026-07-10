import { GA_EVENTS } from '@shared/analytics/events';
import { GA_TOAST_TYPE } from '@shared/analytics/params/toast';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { getEntryRoute } from '@shared/analytics/utils/imageEntryRoute';
import { mapActivityCodeToChip } from '@shared/analytics/utils/imageFlow';
import { loginStatusParams } from '@shared/analytics/utils/loginStatus';

const selectFurnitureScreenParams = () => ({
  screen_name: SCREEN_NAME.SELECT_FURNITURE,
});

const activityChipParams = (activityCode?: string) => ({
  selected_activity_chip: activityCode
    ? mapActivityCodeToChip(activityCode)
    : null,
});

const furnitureChipsParams = (chips?: string) => ({
  selected_furniture_chips: chips,
});

export const trackSelectFurnitureDropDownActivityClick = (
  activityCode: string
) => {
  trackEvent(GA_EVENTS.selectFurniture.DROP_DOWN_ACTIVITY_CLICK, {
    ...selectFurnitureScreenParams(),
    ...activityChipParams(activityCode),
  });
};

export const trackSelectFurnitureActivitySheetView = (
  activityCode?: string
) => {
  trackEvent(GA_EVENTS.selectFurniture.ACTIVITY_SHEET_VIEW, {
    ...selectFurnitureScreenParams(),
    ...activityChipParams(activityCode),
  });
};

export const trackSelectFurnitureActivitySheetCtaClick = (
  activityCode: string
) => {
  trackEvent(GA_EVENTS.selectFurniture.ACTIVITY_SHEET_CTA_CLICK, {
    ...selectFurnitureScreenParams(),
    ...activityChipParams(activityCode),
  });
};

export const trackSelectFurnitureChipClick = (chips?: string) => {
  trackEvent(GA_EVENTS.selectFurniture.CHIP_FURNITURE_CLICK, {
    ...selectFurnitureScreenParams(),
    ...furnitureChipsParams(chips),
  });
};

export const trackSelectFurnitureChipClear = (chips?: string) => {
  trackEvent(GA_EVENTS.selectFurniture.CHIP_FURNITURE_CLEAR, {
    ...selectFurnitureScreenParams(),
    ...furnitureChipsParams(chips),
  });
};

export const trackSelectFurnitureErrorToastDeselectView = (chips?: string) => {
  trackEvent(GA_EVENTS.selectFurniture.ERROR_TOAST_DESELECT_VIEW, {
    ...selectFurnitureScreenParams(),
    ...furnitureChipsParams(chips),
    toast_type: GA_TOAST_TYPE.ESSENTIAL_FURNITURE_DESELECT,
  });
};

export const trackSelectFurnitureBtnCtaClick = ({
  chips,
  activityCode,
  hasPreviousImage,
}: {
  chips?: string;
  activityCode: string;
  hasPreviousImage: boolean;
}) => {
  trackEvent(GA_EVENTS.selectFurniture.BTN_CTA_CLICK, {
    ...selectFurnitureScreenParams(),
    ...loginStatusParams(),
    image_entry_route: getEntryRoute(),
    selected_furniture_chips: chips,
    selected_activity_chip: mapActivityCodeToChip(activityCode),
    has_previous_image: hasPreviousImage,
  });
};
