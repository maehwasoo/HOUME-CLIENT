/**
 * GA 런타임 유틸 (동적 배선)
 *
 * `params/` = 노션 enum·타입 SSOT (정적)
 *
 * ### 파일명 규칙
 *
 * `동사 + 목적어.ts` — 폴더마다 목적어 통일
 *
 * | 폴더 | 목적어 | 파일 예 |
 * |------|--------|---------|
 * | loginEntryRoute | LoginEntryRoute | storeLoginEntryRoute, mapLoginEntryRoute, buildLoginSocialEventParams |
 * | imageEntryRoute | ImageEntryRoute | mapImageEntryRoute, readImageEntryRoute |
 * | screenName | ScreenNameStack / ReturnScreenParams | updateScreenNameStack, buildReturnScreenParams |
 * | imageFlow | Funnel* | captureFunnelInputSnapshot, resolveFunnelReturnScreen, formatFunnelGaParams, buildFunnelResultPageViewParams |
 */
export * from './imageEntryRoute';
export * from './imageFlow';
export * from './loginEntryRoute';
export * from './loginStatus';
export * from './screenName';
