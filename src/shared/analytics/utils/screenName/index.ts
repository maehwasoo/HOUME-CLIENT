/**
 * GA `screen_name` / `return_screen_name` — 라우트 스택 기반
 *
 * 파일명: `동사 + ScreenNameStack` / `ReturnScreenParams` / `resolveScreenName`
 *
 * | 파일 | 역할 |
 * |------|------|
 * | resolveScreenName | URL → screen_name 변환 |
 * | updateScreenNameStack | 라우트 변경 시 previous/current screen_name 갱신 |
 * | buildReturnScreenParams | 스택 기반 `return_screen_name` params 조립 |
 *
 * `SCREEN_NAME` 상수 → `@shared/analytics/screenNames`
 * 이미지 퍼널 return_screen_name → `imageFlow/resolveFunnelReturnScreen`
 */
export * from './buildReturnScreenParams';
export * from './resolveScreenName';
export * from './updateScreenNameStack';
