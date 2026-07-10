import { GA_EVENTS } from '@shared/analytics/events';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { getLoginGatePageViewReturnParams } from '@shared/analytics/utils/screenName';

const settingScreenParams = () => ({
  screen_name: SCREEN_NAME.SETTING,
});

/** setting_page_view params */
export const getSettingPageViewParams = () =>
  getLoginGatePageViewReturnParams(SCREEN_NAME.MYPAGE);

export const trackSettingLogoutClick = () => {
  trackEvent(GA_EVENTS.setting.BTN_LOGOUT_CLICK, {
    ...settingScreenParams(),
    return_screen_name: SCREEN_NAME.HOME,
  });
};

export const trackSettingSuccessionClick = () => {
  trackEvent(GA_EVENTS.setting.BTN_SUCCESSION_CLICK);
};

export const trackSettingSuccessionModalView = () => {
  trackEvent(GA_EVENTS.setting.MD_SUCCESSION_VIEW);
};
