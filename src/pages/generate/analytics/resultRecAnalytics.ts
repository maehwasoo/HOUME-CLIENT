import { GA_EVENTS } from '@shared/analytics/events';
import {
  getProductCardIdNameParams,
  getProductCardOnCardParams,
  joinAnalyticsIds,
} from '@shared/analytics/params/builders/productCard';
import type { ProductCardInput } from '@shared/analytics/params/builders/productCard';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { toResultPreferenceType } from '@shared/analytics/utils/imageFlow';
import { getReturnScreenNameParams } from '@shared/analytics/utils/screenName';

import type {
  FurnitureCategoryResponse,
  ProductInfo,
} from '@apis/__generated__/data-contracts';

const resultRecScreenParams = () => ({
  screen_name: SCREEN_NAME.RESULT_REC,
});

export const joinCategoryIds = (
  categories: Pick<FurnitureCategoryResponse, 'id'>[]
) => joinAnalyticsIds(categories);

export const joinProductNames = (products: Pick<ProductInfo, 'name'>[]) =>
  products
    .map((product) => product.name)
    .filter((name): name is string => Boolean(name))
    .join(', ') || undefined;

const categoryFilterParams = ({
  categories,
  selectedCategoryId,
}: {
  categories: FurnitureCategoryResponse[];
  selectedCategoryId?: number | null;
}) => {
  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  );

  return {
    result_category_ids: joinCategoryIds(categories),
    result_category_chip: selectedCategory?.categoryName,
  };
};

const recommendedProductParams = (products: ProductInfo[]) => ({
  recommended_product_ids: joinAnalyticsIds(products),
  recommended_product_names: joinProductNames(products),
});

export const trackResultRecBtnBackClick = () => {
  trackEvent(GA_EVENTS.resultRec.BTN_BACK_CLICK, {
    ...resultRecScreenParams(),
    ...getReturnScreenNameParams(SCREEN_NAME.HOME),
  });
};

export const trackResultRecFeedCardOnCardClick = (
  product: ProductCardInput
) => {
  trackEvent(GA_EVENTS.resultRec.FEED_CARDON_CARD_CLICK, {
    ...resultRecScreenParams(),
    ...getProductCardOnCardParams(product),
  });
};

export const trackResultRecListRecView = ({
  categories,
  selectedCategoryId,
  products,
}: {
  categories: FurnitureCategoryResponse[];
  selectedCategoryId: number | null;
  products: ProductInfo[];
}) => {
  trackEvent(GA_EVENTS.resultRec.LIST_REC_VIEW, {
    ...resultRecScreenParams(),
    look_around_product_ids: joinAnalyticsIds(products),
    ...categoryFilterParams({ categories, selectedCategoryId }),
  });
};

export const trackResultRecFeedCardGoSiteClick = (
  product: ProductCardInput
) => {
  trackEvent(GA_EVENTS.resultRec.FEED_CARD_GO_SITE_CLICK, {
    ...resultRecScreenParams(),
    ...getProductCardIdNameParams(product),
  });
};

export const trackResultRecFeedCardSaveClick = (product: ProductCardInput) => {
  trackEvent(GA_EVENTS.resultRec.FEED_CARD_SAVE_CLICK, {
    ...resultRecScreenParams(),
    ...getProductCardIdNameParams(product),
  });
};

export const trackResultRecFeedCardUnsaveClick = (
  product: ProductCardInput
) => {
  trackEvent(GA_EVENTS.resultRec.FEED_CARD_UNSAVE_CLICK, {
    ...resultRecScreenParams(),
    ...getProductCardIdNameParams(product),
  });
};

export const trackResultRecBtnArrowRightClick = () => {
  trackEvent(GA_EVENTS.resultRec.BTN_ARROW_RIGHT_CLICK);
};

export const trackResultRecBtnArrowLeftClick = () => {
  trackEvent(GA_EVENTS.resultRec.BTN_ARROW_LEFT_CLICK);
};

export const trackResultRecSlideFilterCombView = ({
  categories,
  products,
}: {
  categories: FurnitureCategoryResponse[];
  products: ProductInfo[];
}) => {
  trackEvent(GA_EVENTS.resultRec.SLIDE_FILTER_COMB_VIEW, {
    ...resultRecScreenParams(),
    result_category_ids: joinCategoryIds(categories),
    ...recommendedProductParams(products),
  });
};

export const trackResultRecChipFilterClick = ({
  categories,
  selectedCategoryId,
}: {
  categories: FurnitureCategoryResponse[];
  selectedCategoryId: number;
}) => {
  trackEvent(GA_EVENTS.resultRec.CHIP_FILTER_CLICK, {
    ...resultRecScreenParams(),
    ...categoryFilterParams({ categories, selectedCategoryId }),
  });
};

export const trackResultRecBtnMoreImgClick = () => {
  trackEvent(GA_EVENTS.resultRec.BTN_MORE_IMG_CLICK);
};

export const trackResultRecMdNotYetView = () => {
  trackEvent(GA_EVENTS.resultRec.MD_NOT_YET_VIEW);
};

export const trackResultRecBtnPreferenceClick = ({
  genImgId,
  isLike,
}: {
  genImgId: number;
  isLike: boolean;
}) => {
  trackEvent(GA_EVENTS.resultRec.BTN_PREFERENCE_CLICK, {
    ...resultRecScreenParams(),
    gen_img_id: genImgId,
    result_preference_type: toResultPreferenceType(isLike),
  });
};

export const trackResultRecToastThxOpinionView = () => {
  trackEvent(GA_EVENTS.resultRec.TOAST_THX_OPINION_VIEW);
};
