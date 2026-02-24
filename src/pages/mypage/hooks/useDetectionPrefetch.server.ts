import { useCallback } from 'react';

import type { DetectionPrefetchOptions } from './detectionPrefetch.types';

export const useDetectionPrefetchServer = () => {
  const prefetchDetection = useCallback(
    (
      _imageId: number,
      _imageUrl: string,
      _options?: DetectionPrefetchOptions
    ) => {},
    []
  );

  return { prefetchDetection };
};
