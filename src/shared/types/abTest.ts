export type ABTestGroup = 'A' | 'B';

export type ImageGenerationVariant = 'single' | 'multiple';

export const AB_TEST_STORAGE_KEY = 'ab_test_variant' as const;

export const DEFAULT_AB_VARIANT: ABTestGroup = 'B';

export const isABTestGroup = (value: string): value is ABTestGroup =>
  value === 'A' || value === 'B';

/** DEV 전용: URL ?ab=A|B 오버라이드 (최우선) */
export const parseDevAbQueryOverride = (): ABTestGroup | null => {
  if (!import.meta.env.DEV) {
    return null;
  }

  try {
    const ab = new URLSearchParams(window.location.search).get('ab');
    return ab && isABTestGroup(ab) ? ab : null;
  } catch {
    return null;
  }
};
