import { GA_EVENTS } from '@shared/analytics/events';
import {
  getBannerChipParams,
  getHomeBannerParams,
} from '@shared/analytics/params/builders';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { getEntryRoute } from '@shared/analytics/utils/imageEntryRoute';
import { loginStatusParams } from '@shared/analytics/utils/loginStatus';
import { getReturnScreenNameParams } from '@shared/analytics/utils/screenName';

export interface BannerDetailContext {
  bannerId: number;
  bannerName?: string;
}

const bannerDetailScreenParams = () => ({
  screen_name: SCREEN_NAME.BANNER_DETAIL,
});

export const getBannerDetailBannerParams = (ctx: BannerDetailContext) =>
  getHomeBannerParams({
    bannerId: ctx.bannerId,
    bannerName: ctx.bannerName ?? '',
  });

export const getBannerDetailPageViewParams = (
  ctx: BannerDetailContext,
  options?: { isNewUser?: boolean }
) => ({
  ...loginStatusParams(),
  ...(options?.isNewUser !== undefined && { is_new_user: options.isNewUser }),
  ...getBannerDetailBannerParams(ctx),
  selected_banner_chip: '',
});

export const trackBannerDetailChipClick = (
  ctx: BannerDetailContext,
  answer: { answerId: number; answerText: string }
) => {
  trackEvent(GA_EVENTS.bannerDetail.CHIP_CLICK, {
    ...bannerDetailScreenParams(),
    ...getBannerDetailBannerParams(ctx),
    ...getBannerChipParams({
      answerId: answer.answerId,
      answerText: answer.answerText,
    }),
  });
};

export const trackBannerDetailCtaClick = (
  ctx: BannerDetailContext,
  answer: { answerId: number; answerText: string }
) => {
  trackEvent(GA_EVENTS.bannerDetail.BTN_CTA_CLICK, {
    ...bannerDetailScreenParams(),
    ...loginStatusParams(),
    image_entry_route: getEntryRoute(),
    ...getBannerDetailBannerParams(ctx),
    selected_banner_chip: answer.answerText,
  });
};

export const trackBannerDetailBackClick = (ctx: BannerDetailContext) => {
  trackEvent(GA_EVENTS.bannerDetail.BTN_BACK_CLICK, {
    ...bannerDetailScreenParams(),
    ...getReturnScreenNameParams(SCREEN_NAME.HOME),
    ...getBannerDetailBannerParams(ctx),
  });
};
