export const isIOSLikeDevice = () => {
  if (typeof navigator === 'undefined') return false;

  const platform = navigator.platform ?? '';
  const userAgent = navigator.userAgent ?? '';
  const maxTouchPoints = navigator.maxTouchPoints ?? 0;

  const isAppleMobilePlatform = /iP(ad|hone|od)/.test(platform);
  const isAppleMobileUA = /iP(ad|hone|od)/.test(userAgent);
  const isIpadOS =
    platform === 'MacIntel' &&
    typeof maxTouchPoints === 'number' &&
    maxTouchPoints > 1;

  return isAppleMobilePlatform || isAppleMobileUA || isIpadOS;
};
