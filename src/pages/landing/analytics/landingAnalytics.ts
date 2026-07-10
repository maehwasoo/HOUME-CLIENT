import { GA_EVENTS } from '@shared/analytics/events';
import { getLandingCtaParams } from '@shared/analytics/params/landing';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { loginStatusParams } from '@shared/analytics/utils/loginStatus';

import type { LandingResponse } from '@apis/__generated__/data-contracts';

const landingScreenParams = () => ({
  screen_name: SCREEN_NAME.LANDING,
});

export const trackLandingCtaClick = (landing?: LandingResponse) => {
  trackEvent(GA_EVENTS.landing.BTN_CTA_CLICK, {
    ...landingScreenParams(),
    ...loginStatusParams(),
    ...getLandingCtaParams(landing),
  });
};
