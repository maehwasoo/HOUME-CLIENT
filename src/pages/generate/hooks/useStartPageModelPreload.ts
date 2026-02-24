import { useEffect } from 'react';

import { IS_CLIENT_DETECTION_ENABLED } from '@pages/generate/constants/curationDetectionMode';
import { OBJ365_MODEL_PATH } from '@pages/generate/constants/detection';

import { preloadONNXModel } from './useOnnxModel';

const useStartPageModelPreloadClient = () => {
  useEffect(() => {
    preloadONNXModel(OBJ365_MODEL_PATH).catch(() => undefined);
  }, []);
};

const useStartPageModelPreloadServer = () => {
  // 서버 모드 no-op 훅
};

export const useStartPageModelPreload = IS_CLIENT_DETECTION_ENABLED
  ? useStartPageModelPreloadClient
  : useStartPageModelPreloadServer;
