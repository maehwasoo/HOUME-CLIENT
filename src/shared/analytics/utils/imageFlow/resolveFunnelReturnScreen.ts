import {
  ENTRY_ROUTE,
  getNextFunnelStep,
  useImageFlowStore,
} from '@store/useImageFlowStore';

import { SCREEN_NAME, type ScreenName } from '@shared/analytics/screenNames';

/** image_entry_route 기준 imageSetup 직전 화면 — image funnel `return_screen_name` */
export const getReturnScreenNameFromImageEntry = (): ScreenName | undefined => {
  const entryRoute = useImageFlowStore.getState().entryRoute;
  if (!entryRoute) return undefined;

  switch (entryRoute) {
    case ENTRY_ROUTE.GENERATE_BUTTON:
    case ENTRY_ROUTE.FLOOR_PLAN:
      return SCREEN_NAME.HOME;
    case ENTRY_ROUTE.HOME_BANNER:
      return SCREEN_NAME.BANNER_DETAIL;
    case ENTRY_ROUTE.STYLE_RESTYLE:
      return SCREEN_NAME.STYLE_DETAIL;
    case ENTRY_ROUTE.PRODUCT_SELECTION:
    case ENTRY_ROUTE.PRODUCT_REGENERATE:
      return SCREEN_NAME.SHOP;
    default:
      return undefined;
  }
};

/** loadImg_page_view `return_screen_name` — generate 직전 퍼널 스텝 */
export const getLoadImgReturnScreenName = (): ScreenName => {
  const entryRoute = useImageFlowStore.getState().entryRoute;
  if (!entryRoute) return SCREEN_NAME.ROOM_TYPE;

  return getNextFunnelStep(entryRoute) === 'INTERIOR_STYLE'
    ? SCREEN_NAME.SELECT_FURNITURE
    : SCREEN_NAME.ROOM_TYPE;
};
