// 어드민 이미지 최적화 variant URL 계산 (서버 VariantKeyResolver 규칙 미러)
// 규칙: {확장자 제거}__w{너비}.webp  (예: .../style/123_ab.png -> .../style/123_ab__w400.webp)
// 서버가 모든 원본에 w400/w800/w1280을 생성하므로(작은 원본은 원본 너비로 클램프) 세 너비 모두 안전하게 존재.

/** 서버 VariantKeyResolver.VARIANT_WIDTHS와 동일하게 유지해야 한다. */
export const IMAGE_VARIANT_WIDTHS = [400, 800, 1280] as const;

/**
 * OptimizedImage `sizes` — 슬롯이 화면에서 렌더되는 대략적인 폭
 * 그리드 썸네일(~200px)와 full width/히어로 이미지(~440px) 두 가지
 * 브라우저는 이 값 × DPR로 variant를 골라 sizes에 전달한다
 */
export const IMAGE_SIZES = {
  grid: '200px',
  full: '440px',
} as const;

// 최적화 대상: 우리 어드민 S3 원본(쿼리스트링 없는 .png/.jpg/.jpeg).
// 외부 CDN(ohousecdn 등 ?w= 쿼리)·이미 webp인 이미지는 제외하고 원본을 그대로 쓴다.
const OPTIMIZABLE_URL = /\.(png|jpe?g)$/i;

/** 원본 URL과 너비로 variant URL을 만든다. 최적화 대상이 아니면 원본을 그대로 반환. */
export const getImageVariantUrl = (
  originalUrl: string,
  width: number
): string => {
  if (!OPTIMIZABLE_URL.test(originalUrl)) return originalUrl;
  const lastDot = originalUrl.lastIndexOf('.');
  const lastSlash = originalUrl.lastIndexOf('/');
  const base =
    lastDot > lastSlash ? originalUrl.slice(0, lastDot) : originalUrl;
  return `${base}__w${width}.webp`;
};

/** <img srcSet>용 문자열을 만든다. 최적화 대상이 아니면 undefined(원본만 로드). */
export const getImageSrcSet = (originalUrl: string): string | undefined => {
  if (!OPTIMIZABLE_URL.test(originalUrl)) return undefined;
  return IMAGE_VARIANT_WIDTHS.map(
    (width) => `${getImageVariantUrl(originalUrl, width)} ${width}w`
  ).join(', ');
};
