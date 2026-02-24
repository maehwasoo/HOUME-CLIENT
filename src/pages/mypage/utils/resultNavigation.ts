import { primeDetectionCacheEntry } from '@shared/detection/hooks/useDetectionCache';
import { useDetectionCacheStore } from '@shared/detection/stores/useDetectionCacheStore';
import type { DetectionCacheEntry } from '@shared/detection/stores/useDetectionCacheStore';

import type {
  MyPageImageDetail,
  MyPageImageDetailData,
  MyPageImageHistory,
  MyPageUserData,
} from '../types/apis/MyPage';

interface BuildResultNavigationArgs {
  history: MyPageImageHistory;
  userProfile?: MyPageUserData | null;
}

export interface ResultNavigationState {
  userProfile?: MyPageUserData | null;
  initialHistory?: MyPageImageHistory | null;
  cachedDetection?: DetectionCacheEntry | null;
}

const toDetailSkeleton = (history: MyPageImageHistory): MyPageImageDetail => ({
  equilibrium: history.equilibrium,
  houseForm: history.houseForm,
  tasteTag: history.tasteTag,
  name: history.tasteTag,
  generatedImageUrl: history.generatedImageUrl,
  isLike: false,
  imageId: history.imageId,
});

export const buildResultNavigationState = ({
  history,
  userProfile,
}: BuildResultNavigationArgs): ResultNavigationState => {
  const detectionEntry =
    useDetectionCacheStore.getState().images[history.imageId] ?? null;
  if (detectionEntry) {
    primeDetectionCacheEntry(history.imageId, detectionEntry);
  }

  return {
    userProfile,
    initialHistory: history,
    cachedDetection: detectionEntry,
  };
};

export const createImageDetailPlaceholder = (
  history: MyPageImageHistory
): MyPageImageDetailData => ({
  histories: [toDetailSkeleton(history)],
});
