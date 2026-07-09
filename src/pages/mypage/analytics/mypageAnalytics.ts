import {
  getMypageGenImgItemParams,
  getMypageGenImgListParams,
  getMypageSavedItemsListParams,
  mypageReturnScreenParams,
  mypageScreenParams,
} from '@pages/mypage/analytics/mypageAnalyticsParams';
import type { FurnitureItem } from '@pages/mypage/types/apis/saveItemsList';

import { GA_EVENTS } from '@shared/analytics/events';
import {
  getProductCardIdNameParams,
  getProductCardListCardParams,
  getProductCardOnCardParams,
  getProductCardParams,
  toProductCardInputFromJjymFeed,
  toProductCardInputFromUsedListProduct,
} from '@shared/analytics/params/builders/productCard';
import { trackEvent } from '@shared/analytics/track';

import type {
  DateGroupResponse,
  ItemResponse,
  UsedProductResponse,
} from '@apis/__generated__/data-contracts';

export const trackMypageFeedCardView = (item: FurnitureItem) => {
  trackEvent(GA_EVENTS.mypage.FEED_CARD_VIEW, {
    ...mypageScreenParams(),
    ...getProductCardOnCardParams(toProductCardInputFromJjymFeed(item)),
  });
};

export const trackMypageFeedCardGoSiteClick = (item: FurnitureItem) => {
  trackEvent(GA_EVENTS.mypage.FEED_CARD_GO_SITE_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardIdNameParams(toProductCardInputFromJjymFeed(item)),
  });
};

export const trackMypageFeedCardSaveClick = (item: FurnitureItem) => {
  trackEvent(GA_EVENTS.mypage.FEED_CARD_SAVE_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardIdNameParams(toProductCardInputFromJjymFeed(item)),
  });
};

export const trackMypageFeedCardUnsaveClick = (item: FurnitureItem) => {
  trackEvent(GA_EVENTS.mypage.FEED_CARD_UNSAVE_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardIdNameParams(toProductCardInputFromJjymFeed(item)),
  });
};

export const trackMypageFeedCardOnCardClick = (item: FurnitureItem) => {
  trackEvent(GA_EVENTS.mypage.FEED_CARDON_CARD_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardOnCardParams(toProductCardInputFromJjymFeed(item)),
  });
};

export const trackMypageListCardClick = (item: UsedProductResponse) => {
  trackEvent(GA_EVENTS.mypage.LIST_CARD_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardListCardParams(
      toProductCardInputFromUsedListProduct(item)
    ),
  });
};

export const trackMypageListCardGoSiteClick = (item: UsedProductResponse) => {
  trackEvent(GA_EVENTS.mypage.LIST_CARD_GO_SITE_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardListCardParams(
      toProductCardInputFromUsedListProduct(item)
    ),
  });
};

export const trackMypageListCardSaveClick = (item: UsedProductResponse) => {
  trackEvent(GA_EVENTS.mypage.LIST_CARD_SAVE_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardIdNameParams(toProductCardInputFromUsedListProduct(item)),
  });
};

export const trackMypageListCardUnsaveClick = (item: UsedProductResponse) => {
  trackEvent(GA_EVENTS.mypage.LIST_CARD_UNSAVE_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardIdNameParams(toProductCardInputFromUsedListProduct(item)),
  });
};

export const trackMypageListCardView = () => {
  trackEvent(GA_EVENTS.mypage.LIST_CARD_VIEW, mypageScreenParams());
};

export const trackMypageTabSavedItemClick = () => {
  trackEvent(GA_EVENTS.mypage.TAB_SAVED_ITEM_CLICK);
};

export const trackMypageTabGenImgClick = () => {
  trackEvent(GA_EVENTS.mypage.TAB_GEN_IMG_CLICK);
};

export const trackMypageBtnBackClick = () => {
  trackEvent(GA_EVENTS.mypage.BTN_BACK_CLICK, {
    ...mypageScreenParams(),
    ...mypageReturnScreenParams(),
  });
};

export const trackMypageCardGenImgClick = (
  item: ItemResponse,
  product?: UsedProductResponse
) => {
  trackEvent(GA_EVENTS.mypage.CARD_GEN_IMG_CLICK, {
    ...mypageScreenParams(),
    ...mypageReturnScreenParams(),
    ...getMypageGenImgItemParams(item),
    ...getProductCardListCardParams(
      toProductCardInputFromUsedListProduct(product ?? {})
    ),
  });
};

export const trackMypageListGenImgView = (groups: DateGroupResponse[]) => {
  trackEvent(GA_EVENTS.mypage.LIST_GEN_IMG_VIEW, {
    ...mypageScreenParams(),
    ...getMypageGenImgListParams(groups),
  });
};

export const trackMypageListSavedItemView = (items: FurnitureItem[]) => {
  trackEvent(GA_EVENTS.mypage.LIST_SAVED_ITEM_VIEW, {
    ...mypageScreenParams(),
    ...getMypageSavedItemsListParams(items),
  });
};

export const trackMypageBtnMoreGenImgClick = (
  item: ItemResponse,
  product?: UsedProductResponse
) => {
  trackEvent(GA_EVENTS.mypage.BTN_MORE_GEN_IMG_CLICK, {
    ...mypageScreenParams(),
    ...mypageReturnScreenParams(),
    ...getMypageGenImgItemParams(item),
    ...getProductCardListCardParams(
      toProductCardInputFromUsedListProduct(product ?? {})
    ),
  });
};

export const trackMypageSlideGenImgItemScroll = ({
  item,
  product,
}: {
  item: ItemResponse;
  product?: UsedProductResponse;
}) => {
  trackEvent(GA_EVENTS.mypage.SLIDE_GEN_IMG_ITEM_SCROLL, {
    ...getMypageGenImgItemParams(item),
    ...getProductCardParams(
      product ? toProductCardInputFromUsedListProduct(product) : {}
    ),
  });
};

export const trackMypageBtnSettingClick = () => {
  trackEvent(GA_EVENTS.mypage.BTN_SETTING_CLICK);
};

export const trackMypageListEmptyGenImgView = (
  items: Pick<FurnitureItem, 'rawProductId'>[] = []
) => {
  trackEvent(GA_EVENTS.mypage.LIST_EMPTY_GEN_IMG_VIEW, {
    ...mypageScreenParams(),
    ...getMypageSavedItemsListParams(items),
  });
};

export const trackMypageListEmptySavedItemView = (
  items: Pick<FurnitureItem, 'rawProductId'>[] = []
) => {
  trackEvent(GA_EVENTS.mypage.LIST_EMPTY_SAVED_ITEM_VIEW, {
    ...mypageScreenParams(),
    ...getMypageSavedItemsListParams(items),
  });
};

export const trackMypageBtnCtaEmptyGenImgClick = (
  items: Pick<FurnitureItem, 'rawProductId'>[] = []
) => {
  trackEvent(GA_EVENTS.mypage.BTN_CTA_EMPTY_GEN_IMG_CLICK, {
    ...mypageScreenParams(),
    ...getMypageSavedItemsListParams(items),
  });
};

export const trackMypageBtnTextEmptyGenImgClick = (
  items: Pick<FurnitureItem, 'rawProductId'>[] = []
) => {
  trackEvent(GA_EVENTS.mypage.BTN_TEXT_EMPTY_GEN_IMG_CLICK, {
    ...mypageScreenParams(),
    ...getMypageSavedItemsListParams(items),
  });
};

export const trackMypageBtnCtaEmptySavedItemClick = (
  items: Pick<FurnitureItem, 'rawProductId'>[] = []
) => {
  trackEvent(GA_EVENTS.mypage.BTN_CTA_EMPTY_SAVED_ITEM_CLICK, {
    ...mypageScreenParams(),
    ...getMypageSavedItemsListParams(items),
  });
};

export const trackMypageBtnTextEmptySavedItemClick = (
  items: Pick<FurnitureItem, 'rawProductId'>[] = []
) => {
  trackEvent(GA_EVENTS.mypage.BTN_TEXT_EMPTY_SAVED_ITEM_CLICK, {
    ...mypageScreenParams(),
    ...getMypageSavedItemsListParams(items),
  });
};

// 기존 import 경로 호환 — params 빌더 재노출
export {
  getMypageGenImgItemParams,
  getMypageGenImgListParams,
  getMypageSavedItemsListParams,
  mypageReturnScreenParams,
  mypageScreenParams,
} from '@pages/mypage/analytics/mypageAnalyticsParams';
