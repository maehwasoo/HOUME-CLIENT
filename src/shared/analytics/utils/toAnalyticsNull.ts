/** 스펙 `undefined → null` — GA에 명시적 null 전송 시 사용 */
export const toAnalyticsNull = <T>(value: T | undefined | null): T | null =>
  value === undefined || value === '' ? null : value;
