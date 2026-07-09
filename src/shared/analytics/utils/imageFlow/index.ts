/**
 * image funnel GA 유틸
 *
 * `screenName/`(라우트 스택)과 별개 — image_entry_route·퍼널 스텝 기준.
 *
 * 파일명: `동사 + Funnel{목적}` (목적어 `Funnel` 통일)
 *
 * | 파일 | 역할 |
 * |------|------|
 * | captureFunnelInputSnapshot | 생성 mutation 전 퍼널 입력값 백업·조회 |
 * | resolveFunnelReturnScreen | roomType·loadImg·shop 등 funnel `return_screen_name` |
 * | formatFunnelGaParams | API/도메인 값 → GA param enum·문자열 변환 |
 * | buildFunnelResultPageViewParams | resultRec·resultList `page_view` params 조립 |
 */
export * from './buildFunnelResultPageViewParams';
export * from './captureFunnelInputSnapshot';
export * from './formatFunnelGaParams';
export * from './resolveFunnelReturnScreen';
