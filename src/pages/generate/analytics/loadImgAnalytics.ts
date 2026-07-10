import { GA_EVENTS } from '@shared/analytics/events';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { getEntryRoute } from '@shared/analytics/utils/imageEntryRoute';
import {
  getLoadImgReturnScreenName,
  toLoadPreferenceType,
} from '@shared/analytics/utils/imageFlow';

const loadImgScreenParams = () => ({
  screen_name: SCREEN_NAME.LOAD_IMG,
});

const loadImgReturnScreenParams = () => ({
  return_screen_name: getLoadImgReturnScreenName(),
});

export const trackLoadImgPageRefresh = () => {
  trackEvent(GA_EVENTS.loadImg.PAGE_REFRESH, {
    ...loadImgScreenParams(),
    ...loadImgReturnScreenParams(),
  });
};

export const trackLoadImgPageBackSwipe = () => {
  trackEvent(GA_EVENTS.loadImg.PAGE_BACK_SWIPE, {
    ...loadImgScreenParams(),
    ...loadImgReturnScreenParams(),
  });
};

export const trackLoadImgCardPreferenceView = ({
  productId,
  productName,
  loadedProductIds,
}: {
  productId: number;
  productName?: string;
  loadedProductIds: string;
}) => {
  trackEvent(GA_EVENTS.loadImg.CARD_PREFERENCE_VIEW, {
    ...loadImgScreenParams(),
    product_id: productId,
    product_name: productName,
    loaded_product_ids: loadedProductIds,
  });
};

export const trackLoadImgMdGenImgQuitView = () => {
  trackEvent(GA_EVENTS.loadImg.MD_GEN_IMG_QUIT_VIEW);
};

export const trackLoadImgCardPreferenceClick = ({
  productId,
  productName,
  productBrand,
  productCategory,
  productPrice,
  isLike,
}: {
  productId: number;
  productName?: string;
  productBrand?: string;
  productCategory?: string;
  productPrice?: number;
  isLike: boolean;
}) => {
  trackEvent(GA_EVENTS.loadImg.CARD_PREFERENCE_CLICK, {
    ...loadImgScreenParams(),
    image_entry_route: getEntryRoute(),
    product_id: productId,
    product_name: productName,
    product_brand: productBrand,
    product_category: productCategory,
    product_price: productPrice,
    load_preference_type: toLoadPreferenceType(isLike),
  });
};
