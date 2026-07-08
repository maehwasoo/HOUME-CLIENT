import { LOTTIE_SPEED } from '@assets/lottie/lottieAssets';

import DotLottiePlayer from './DotLottiePlayer';

const LoadingLottie = () => {
  return (
    <DotLottiePlayer
      variant="loading"
      speed={LOTTIE_SPEED.LOADING}
      size="loading"
      ariaLabel="로딩 애니메이션"
    />
  );
};

export default LoadingLottie;
