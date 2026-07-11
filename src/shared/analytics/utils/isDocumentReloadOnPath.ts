/**
 * 문서가 `pathname`에서 F5/새로고침으로 로드됐는지 판별.
 *
 * SPA에서 `navigation.type === 'reload'`만 보면, 홈 등 다른 URL에서 새로고침 후
 * 클라이언트 라우팅으로 진입한 경우에도 reload로 남아 false positive가 난다.
 * `navigation.name`(문서 로드 URL)의 pathname까지 함께 확인한다.
 */
export const isDocumentReloadOnPath = (pathname: string): boolean => {
  const [navigation] = performance.getEntriesByType(
    'navigation'
  ) as PerformanceNavigationTiming[];

  if (navigation?.type !== 'reload' || !navigation.name) {
    return false;
  }

  try {
    return new URL(navigation.name).pathname === pathname;
  } catch {
    return false;
  }
};
