import { GA_EVENTS } from '@shared/analytics/events';
import {
  getProductCardIdNameParams,
  getProductCardListCardParams,
  getProductCardOnCardParams,
} from '@shared/analytics/params/builders/productCard';
import type { ProductCardInput } from '@shared/analytics/params/builders/productCard';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { getReturnScreenNameParams } from '@shared/analytics/utils/screenName';

const resultListScreenParams = () => ({
  screen_name: SCREEN_NAME.RESULT_LIST,
});

export const trackResultListBtnBackClick = () => {
  trackEvent(GA_EVENTS.resultList.BTN_BACK_CLICK, {
    ...resultListScreenParams(),
    ...getReturnScreenNameParams(SCREEN_NAME.HOME),
  });
};

export const trackResultListListCardClick = (product: ProductCardInput) => {
  trackEvent(GA_EVENTS.resultList.LIST_CARD_CLICK, {
    ...resultListScreenParams(),
    ...getProductCardListCardParams(product),
  });
};

export const trackResultListListCardGoSiteClick = (
  product: ProductCardInput
) => {
  trackEvent(GA_EVENTS.resultList.LIST_CARD_GO_SITE_CLICK, {
    ...resultListScreenParams(),
    ...getProductCardListCardParams(product),
  });
};

export const trackResultListListCardSaveClick = (product: ProductCardInput) => {
  trackEvent(GA_EVENTS.resultList.LIST_CARD_SAVE_CLICK, {
    ...resultListScreenParams(),
    ...getProductCardIdNameParams(product),
  });
};

export const trackResultListListCardUnsaveClick = (
  product: ProductCardInput
) => {
  trackEvent(GA_EVENTS.resultList.LIST_CARD_UNSAVE_CLICK, {
    ...resultListScreenParams(),
    ...getProductCardIdNameParams(product),
  });
};

export const trackResultListListSelectedView = (
  selectedProductIds?: string
) => {
  trackEvent(GA_EVENTS.resultList.LIST_SELECTED_VIEW, {
    ...resultListScreenParams(),
    selected_product_ids: selectedProductIds,
  });
};

export const trackResultListFeedCardOnCardClick = (
  product: ProductCardInput
) => {
  trackEvent(GA_EVENTS.resultList.FEED_CARDON_CARD_CLICK, {
    ...resultListScreenParams(),
    ...getProductCardOnCardParams(product),
  });
};

export const trackResultListFeedCardGoSiteClick = (
  product: ProductCardInput
) => {
  trackEvent(GA_EVENTS.resultList.FEED_CARD_GO_SITE_CLICK, {
    ...resultListScreenParams(),
    ...getProductCardIdNameParams(product),
  });
};

export const trackResultListFeedCardSaveClick = (product: ProductCardInput) => {
  trackEvent(GA_EVENTS.resultList.FEED_CARD_SAVE_CLICK, {
    ...resultListScreenParams(),
    ...getProductCardIdNameParams(product),
  });
};

export const trackResultListFeedCardUnsaveClick = (
  product: ProductCardInput
) => {
  trackEvent(GA_EVENTS.resultList.FEED_CARD_UNSAVE_CLICK, {
    ...resultListScreenParams(),
    ...getProductCardIdNameParams(product),
  });
};

export const trackResultListBtnReselectClick = (
  selectedProductIds?: string
) => {
  trackEvent(GA_EVENTS.resultList.BTN_RESELECT_CLICK, {
    ...resultListScreenParams(),
    selected_product_ids: selectedProductIds,
    ...getReturnScreenNameParams(SCREEN_NAME.HOME),
  });
};

export const trackResultListListLookAroundView = (
  lookAroundProductIds?: string
) => {
  trackEvent(GA_EVENTS.resultList.LIST_LOOK_AROUND_VIEW, {
    ...resultListScreenParams(),
    look_around_product_ids: lookAroundProductIds,
  });
};

export const trackResultListImgCardOnCardClick = ({
  genImgId,
  selectedProductIds,
  othersImgId,
  othersImgProductIds,
}: {
  genImgId: number;
  selectedProductIds?: string;
  othersImgId: number;
  othersImgProductIds?: string;
}) => {
  trackEvent(GA_EVENTS.resultList.IMG_CARDON_CARD_CLICK, {
    ...resultListScreenParams(),
    gen_img_id: genImgId,
    selected_product_ids: selectedProductIds,
    others_img_id: othersImgId,
    others_img_product_ids: othersImgProductIds,
    ...getReturnScreenNameParams(SCREEN_NAME.HOME),
  });
};

export const trackResultListListOthersImgView = (othersImgIds?: string) => {
  trackEvent(GA_EVENTS.resultList.LIST_OTHERS_IMG_VIEW, {
    ...resultListScreenParams(),
    others_img_ids: othersImgIds,
  });
};
