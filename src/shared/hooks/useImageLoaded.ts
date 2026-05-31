import { useLayoutEffect, useRef, useState } from 'react';

interface UseImageLoadedOptions {
  /** 로드 실패 시 교체할 폴백 이미지. 지정하면 onError에서 src를 폴백으로 스왑한다. */
  fallbackSrc?: string;
}

/**
 * 이미지 로드 상태를 캐시-안전하게 관리하는 공용 훅.
 *
 * 브라우저에 이미 디코드되어 캐시된 이미지는 재마운트/src 변경 시 mount 시점에
 * 이미 complete 상태라 load 이벤트가 발화하지 않는다. 로딩 완료를 onLoad에만 의존하면
 * SPA 재진입처럼 캐시 히트 + 재마운트가 겹칠 때 완료 신호를 영영 못 받아 스켈레톤이
 * 무한 로딩으로 멈춘다. 이를 막기 위해 commit 직후(useLayoutEffect, 페인트 전)에
 * img.complete를 직접 확인해 isLoaded를 시드한다.
 *
 * - 스켈레톤/페이드가 필요한 카드: isLoaded로 게이팅
 * - 폴백만 필요한 카드(StyleCard 등): isLoaded 무시, fallbackSrc 옵션으로 에러 시 교체
 */
export const useImageLoaded = (
  initialSrc: string | undefined,
  options?: UseImageLoadedOptions
) => {
  const { fallbackSrc } = options ?? {};
  const ref = useRef<HTMLImageElement>(null);
  const [src, setSrc] = useState(initialSrc);
  const [isLoaded, setIsLoaded] = useState(false);

  // 부모가 내려준 src가 바뀌면 동기화 (폴백으로 스왑됐어도 새 src가 오면 그 값으로 리셋)
  // 브라우저에 paint하기 전에 맞춰야 새 메타데이터와 옛 이미지가 한 프레임 같이 노출되는 걸 막을 수 있음
  useLayoutEffect(() => {
    setSrc(initialSrc);
  }, [initialSrc]);

  // 캐시된 이미지는 mount/src변경 시점에 이미 complete → onLoad 미발화. 페인트 전에 직접 시드.
  useLayoutEffect(() => {
    const img = ref.current;
    setIsLoaded(Boolean(img?.complete && img.naturalWidth > 0));
  }, [src]);

  const imgProps = {
    ref,
    src,
    onLoad: () => setIsLoaded(true),
    onError: () => {
      if (fallbackSrc && src !== fallbackSrc) {
        setSrc(fallbackSrc);
      } else {
        // 폴백도 없거나 폴백마저 실패 → 스켈레톤 무한 루프 방지 위해 완료 처리
        setIsLoaded(true);
      }
    },
  };

  return { isLoaded, imgProps };
};
