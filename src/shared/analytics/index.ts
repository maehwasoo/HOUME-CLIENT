/**
 * GA4 공개 API — 자주 쓰는 진입점
 *
 * | import | 용도 |
 * |--------|------|
 * | `GA_EVENTS` | 이벤트명 SSOT |
 * | `SCREEN_NAME` | screen_name 상수 (`screenNames`) |
 * | `resolveScreenName` | URL → screen_name (`utils/screenName`) |
 * | `trackEvent`, `trackCallback` | 이벤트 전송 |
 * | `useAnalyticsPageView`, `useScrollDepthTrack`, `useScreenNavigation` | page_view·scroll·스택 |
 * | `componentAnalytics` | topNav·모달·토스트 |
 * | `utils/*` | entry route, funnel, return_screen_name 배선 |
 *
 * 도메인별 param enum·builder는 `@shared/analytics/params/*` 직접 import.
 *
 * @example
 * import { GA_EVENTS, SCREEN_NAME, trackEvent, useAnalyticsPageView } from '@shared/analytics';
 */
export * from './componentAnalytics';
export * from './events';
export * from './hooks';
export * from './screenNames';
export * from './track';
export * from './utils';
