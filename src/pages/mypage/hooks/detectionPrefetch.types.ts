export type PrefetchPriority = 'immediate' | 'background';

export interface DetectionPrefetchOptions {
  priority?: PrefetchPriority;
  persistAfterUnmount?: boolean;
}

export interface PrefetchTask {
  imageId: number;
  imageUrl: string;
  persistAfterUnmount?: boolean;
}
