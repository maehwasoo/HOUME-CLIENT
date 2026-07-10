import type {
  ValidLoginStatus,
  SignupStep,
} from '@shared/analytics/params/auth';
import type { BannerChipParams } from '@shared/analytics/params/bannerDetail';
import type {
  ImageEntryRoute,
  LoginEntryRoute,
} from '@shared/analytics/params/gate';
import type {
  AnalyticsScreenName,
  LoginStatus,
} from '@shared/analytics/params/global';
import type {
  HomeBannerParams,
  HomeStyleParams,
} from '@shared/analytics/params/homeContent';
import type { ImageSetupParams } from '@shared/analytics/params/imageSetup';
import type { LandingParams } from '@shared/analytics/params/landing';
import type { SectionName } from '@shared/analytics/params/path';
import type { ProductCardParams } from '@shared/analytics/params/productCard';
import type { ResultParams } from '@shared/analytics/params/result';
import type { ScrollDepth } from '@shared/analytics/params/scrollDepth';
import type { ShopParams } from '@shared/analytics/params/shop';
import type { SpaceParams } from '@shared/analytics/params/space';
import type { GaToastType } from '@shared/analytics/params/toast';

/** Firebase logEvent에 허용되는 파라미터 값 타입 */
export type AnalyticsParamValue = string | number | boolean;

/**
 * GA4 이벤트별 추가 파라미터 (노션 Parameter 컬럼 v2.0.0)
 *
 * - DB 전송 값은 이벤트 발생 시점 데이터를 그대로 전달
 * - `undefined` 값은 Firebase 전송 시 제외 (콘솔 로그에는 포함)
 */
export type TrackEventParams = {
  // --- 1. 전역 / 경로 ---
  screen_name?: AnalyticsScreenName;
  return_screen_name?: AnalyticsScreenName;
  previous_screen_name?: AnalyticsScreenName;
  login_status?: LoginStatus;
  is_new_user?: boolean;
  scroll_depth?: ScrollDepth;
  section_name?: SectionName;

  // --- 2. 랜딩 ---
} & LandingParams &
  // --- 3. 게이트 ---
  {
    login_entry_route?: LoginEntryRoute | string;
    image_entry_route?: ImageEntryRoute;
  } &
  // --- 4~6. 홈 콘텐츠 / 배너 상세 / 상품 카드 ---
  HomeBannerParams &
  HomeStyleParams &
  BannerChipParams &
  ProductCardParams &
  // --- 7. 공간/도면 ---
  SpaceParams &
  // --- 8. 상품 탭 ---
  ShopParams &
  // --- 9. imageSetup ---
  ImageSetupParams &
  // --- 10. 로그인/회원가입 ---
  {
    is_valid_login?: ValidLoginStatus;
    signup_step?: SignupStep;
  } &
  // --- 11. 결과·마이페이지·로딩 ---
  ResultParams &
  // --- 12. 토스트 / 에러 ---
  {
    toast_type?: GaToastType | string;
    error_code?: string;
  };
