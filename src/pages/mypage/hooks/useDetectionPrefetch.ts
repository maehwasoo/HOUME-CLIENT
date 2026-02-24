import { IS_CLIENT_DETECTION_ENABLED } from '@pages/generate/constants/curationDetectionMode';

import { useDetectionPrefetchClient } from './useDetectionPrefetch.client';
import { useDetectionPrefetchServer } from './useDetectionPrefetch.server';

export const useDetectionPrefetch = IS_CLIENT_DETECTION_ENABLED
  ? useDetectionPrefetchClient
  : useDetectionPrefetchServer;
