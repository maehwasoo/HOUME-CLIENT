import { useCallback, useEffect, useRef, useState } from 'react';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';

import { LOTTIE_ASSETS } from '@assets/lottie/lottieAssets';

import * as styles from './DotLottiePlayer.css';

import type { DotLottie } from '@lottiefiles/dotlottie-react';

type LottieVariant = keyof typeof LOTTIE_ASSETS;
type LottieSize = 'illustration' | 'loading';

interface DotLottiePlayerProps {
  variant: LottieVariant;
  speed?: number;
  size?: LottieSize;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  ariaLabel?: string;
}

const sizeClassName: Record<LottieSize, string> = {
  illustration: styles.illustration,
  loading: styles.loading,
};

const JsonLottieFallback = ({
  animationData,
  speed,
  loop,
  autoplay,
  className,
  ariaLabel,
}: {
  animationData: object;
  speed: number;
  loop: boolean;
  autoplay: boolean;
  className: string;
  ariaLabel?: string;
}) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    lottieRef.current?.setSpeed(speed);
  }, [speed]);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      aria-label={ariaLabel}
    />
  );
};

const DotLottiePlayer = ({
  variant,
  speed = 1,
  size = 'illustration',
  className,
  loop = true,
  autoplay = true,
  ariaLabel,
}: DotLottiePlayerProps) => {
  const [useJsonFallback, setUseJsonFallback] = useState(false);
  const [dotLottieInstance, setDotLottieInstance] = useState<DotLottie | null>(
    null
  );
  const assets = LOTTIE_ASSETS[variant];
  const mergedClassName = [sizeClassName[size], className]
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    setUseJsonFallback(false);
    setDotLottieInstance(null);
  }, [variant]);

  useEffect(() => {
    if (!dotLottieInstance) return;

    const handleLoadError = () => {
      setUseJsonFallback(true);
    };

    dotLottieInstance.addEventListener('loadError', handleLoadError);

    return () => {
      dotLottieInstance.removeEventListener('loadError', handleLoadError);
    };
  }, [dotLottieInstance]);

  const handleDotLottieRef = useCallback((instance: DotLottie | null) => {
    setDotLottieInstance(instance);
  }, []);

  if (useJsonFallback) {
    return (
      <JsonLottieFallback
        animationData={assets.json}
        speed={speed}
        loop={loop}
        autoplay={autoplay}
        className={mergedClassName}
        ariaLabel={ariaLabel}
      />
    );
  }

  return (
    <DotLottieReact
      src={assets.lottie}
      speed={speed}
      loop={loop}
      autoplay={autoplay}
      className={mergedClassName}
      dotLottieRefCallback={handleDotLottieRef}
      aria-label={ariaLabel}
      role="img"
    />
  );
};

export default DotLottiePlayer;
