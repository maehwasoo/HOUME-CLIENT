/**
 * GA `login_entry_route` — 로그인 게이트 진입 경로
 *
 * 파일명: `동사 + LoginEntryRoute` (또는 LoginSocialEventParams)
 *
 * | 파일 | 역할 |
 * |------|------|
 * | storeLoginEntryRoute | sessionStorage 저장 / 조회 / 삭제 |
 * | mapLoginEntryRoute | ENTRY_ROUTE → GA enum 매핑 |
 * | buildLoginSocialEventParams | 로그인 플로우 이벤트 params (`getLoginSocialParams`) |
 */
export * from './buildLoginSocialEventParams';
export * from './mapLoginEntryRoute';
export * from './storeLoginEntryRoute';
