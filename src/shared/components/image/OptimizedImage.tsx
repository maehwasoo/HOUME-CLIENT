import type { ComponentProps, ReactEventHandler } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import { getImageSrcSet } from '@utils/imageVariant';

import * as styles from './OptimizedImage.css';

type Placeholder = 'none' | 'skeleton' | 'color';

type OptimizedImageProps = Omit<ComponentProps<'img'>, 'src' | 'srcSet'> & {
  /** 이미지 원본 URL (어드민 이미지면 variant로, 그 외엔 원본 그대로 로드) */
  src: string;
  /** 렌더 슬롯 크기(예: '200px'). 지정하면 variant srcSet을 사용하고, 없으면 원본만 로드한다. */
  sizes?: string;
  /** variant·원본이 모두 실패했을 때 마지막으로 보여줄 정적 이미지 */
  fallbackSrc?: string;
  /**
   * 로딩 중 표시: 'skeleton'(shimmer) | 'color'(중립 단색) | 'none'(없음, 기본).
   * 'none'이 아니면 부모가 position: relative 여야 한다(placeholder가 absolute로 덮음).
   */
  placeholder?: Placeholder;
};

/**
 * 모든 이미지를 다루는 공용 이미지 컴포넌트.
 *
 * - 어드민 이미지(우리 S3의 .png/.jpg): 400/800/1280 WebP variant를 srcSet으로 로드한다.
 * - 그 외(외부 CDN의 ?w= 쿼리 URL, 이미 webp, svg 등): variant 없이 원본을 그대로 로드한다.
 *   (getImageSrcSet이 undefined를 반환 -> srcSet 없이 src만 사용)
 *
 * 폴백 체인: variant(srcSet) -> 원본 -> 정적 fallbackSrc.
 * 서버 variant가 아직 없으면(배포 전) variant가 404 -> 원본으로 떨어져 화면이 깨지지 않는다.
 * loading은 기본 lazy이며, 화면 최상단(LCP) 이미지는 호출부에서 loading="eager"로 덮어쓴다.
 * placeholder를 주면 로딩 동안 skeleton/단색을 보여주고 로드되면 이미지를 페이드인한다.
 */
const OptimizedImage = ({
  src,
  sizes,
  fallbackSrc,
  placeholder = 'none',
  className,
  onLoad,
  ...rest
}: OptimizedImageProps) => {
  const hasPlaceholder = placeholder !== 'none';
  const ref = useRef<HTMLImageElement>(null);
  const [srcSet, setSrcSet] = useState(() =>
    sizes ? getImageSrcSet(src) : undefined
  );
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  // 부모가 새 src를 내려주면 페인트 전에 동기화 (옛 이미지가 한 프레임 노출되는 것 방지)
  useLayoutEffect(() => {
    setCurrentSrc(src);
    setSrcSet(sizes ? getImageSrcSet(src) : undefined);
  }, [src, sizes]);

  // 캐시된 이미지는 mount/src변경 시점에 이미 complete -> onLoad 실행 X.
  // 페인트 전(useLayoutEffect)에 img.complete를 직접 확인해 placeholder 무한 로딩 방지
  useLayoutEffect(() => {
    if (!hasPlaceholder) return;
    const img = ref.current;
    setIsLoaded(Boolean(img?.complete && img.naturalWidth > 0));
  }, [currentSrc, srcSet, hasPlaceholder]);

  const handleLoad: ReactEventHandler<HTMLImageElement> = (event) => {
    if (hasPlaceholder) setIsLoaded(true);
    onLoad?.(event);
  };

  const handleError = () => {
    if (srcSet) {
      setSrcSet(undefined); // variant 실패 -> 원본으로 폴백
    } else if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc); // 원본 실패 -> 정적 이미지로 폴백
    } else if (hasPlaceholder) {
      setIsLoaded(true); // 폴백마저 실패 -> placeholder 무한 로딩 방지
    }
  };

  return (
    <>
      {hasPlaceholder && !isLoaded && (
        <span
          aria-hidden
          className={
            placeholder === 'skeleton'
              ? styles.skeletonPlaceholder
              : styles.colorPlaceholder
          }
        />
      )}
      <img
        ref={ref}
        loading="lazy"
        {...rest}
        src={currentSrc}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        className={clsx(
          className,
          hasPlaceholder && styles.fadeImage,
          hasPlaceholder && (isLoaded ? styles.fadeVisible : styles.fadeHidden)
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
    </>
  );
};

export default OptimizedImage;
