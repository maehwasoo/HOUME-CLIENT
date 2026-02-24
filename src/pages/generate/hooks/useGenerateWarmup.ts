import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { IS_CLIENT_DETECTION_ENABLED } from '@pages/generate/constants/curationDetectionMode';

import { ROUTES } from '@routes/paths';

import { OBJ365_MODEL_PATH } from '@shared/detection/constants';
import { preloadONNXModel } from '@shared/detection/hooks/useOnnxModel';

const GENERATE_WARMUP_PATHS = [ROUTES.GENERATE, ROUTES.IMAGE_SETUP];

const useGenerateWarmupClient = () => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const shouldWarmup = GENERATE_WARMUP_PATHS.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    );

    if (!shouldWarmup) return;

    preloadONNXModel(OBJ365_MODEL_PATH).catch((error: unknown) => {
      console.warn('[useGenerateWarmup] model preload failed', error);
    });
  }, [location.pathname]);
};

/**
 * 서버 모드 warmup no-op 훅
 * - 향후 서버 캐시 예열/백그라운드 작업 확장 지점
 */
const useGenerateWarmupServer = () => {
  // 서버 모드 no-op 훅
};

export const useGenerateWarmup = IS_CLIENT_DETECTION_ENABLED
  ? useGenerateWarmupClient
  : useGenerateWarmupServer;
