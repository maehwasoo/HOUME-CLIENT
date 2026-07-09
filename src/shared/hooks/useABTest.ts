/**
 * A/B 테스트 variant 배정 훅
 *
 * DEV: ?ab=A|B 쿼리가 최우선 (storage·userId보다 우선)
 * PROD:
 * 1. localStorage 배정값 유지 (로그인 후에도 동일, 퍼널 전환 비교용)
 * 2. 없고 userId → 홀수 A / 짝수 B
 * 3. 없고 비로그인 → 50% 랜덤
 *
 * UI 의미(예: solid/ghost CTA)는 사용처에서 variant → 설정으로 매핑
 * Firebase Analytics 연동은 GA 작업 브랜치에서 추가 예정
 */

import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { useUserStore } from '@store/useUserStore';

import type { ABTestGroup } from '@shared/types/abTest';
import {
  AB_TEST_STORAGE_KEY,
  DEFAULT_AB_VARIANT,
  isABTestGroup,
  parseDevAbQueryOverride,
} from '@shared/types/abTest';

export type { ABTestGroup };

const getVariantFromUserId = (userId: number): ABTestGroup =>
  userId % 2 === 1 ? 'A' : 'B';

const assignRandomVariant = (): ABTestGroup =>
  Math.random() < 0.5 ? 'A' : 'B';

const readVariantFromStorage = (): ABTestGroup | null => {
  try {
    const cached = localStorage.getItem(AB_TEST_STORAGE_KEY);
    return cached && isABTestGroup(cached) ? cached : null;
  } catch {
    return null;
  }
};

const writeVariantToStorage = (variant: ABTestGroup): void => {
  localStorage.setItem(AB_TEST_STORAGE_KEY, variant);
};

/**
 * 배정 우선순위 (DEV): ?ab= → storage → userId / 랜덤
 * 배정 우선순위 (PROD): storage → userId / 랜덤
 */
const resolveABVariant = (userId: number | null | undefined): ABTestGroup => {
  const devQueryOverride = parseDevAbQueryOverride();
  if (devQueryOverride) {
    try {
      writeVariantToStorage(devQueryOverride);
    } catch {
      // localStorage 저장 실패 시 무시
    }
    return devQueryOverride;
  }

  const cached = readVariantFromStorage();
  if (cached) {
    return cached;
  }

  const assigned =
    userId !== null && userId !== undefined
      ? getVariantFromUserId(userId)
      : assignRandomVariant();

  try {
    writeVariantToStorage(assigned);
  } catch {
    // localStorage 저장 실패 시 무시
  }

  return assigned;
};

const getInitialVariant = (): ABTestGroup => {
  const devQueryOverride = parseDevAbQueryOverride();
  if (devQueryOverride) {
    return devQueryOverride;
  }

  return readVariantFromStorage() ?? DEFAULT_AB_VARIANT;
};

export const useABTest = () => {
  const { search } = useLocation();
  const userId = useUserStore((state) => state.userId);

  const [variant, setVariant] = useState<ABTestGroup>(getInitialVariant);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeABTest = () => {
      try {
        setIsLoading(true);
        setError(null);
        setVariant(resolveABVariant(userId));
      } catch (err) {
        console.error('A/B 테스트 초기화 실패:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');

        try {
          const devQueryOverride = parseDevAbQueryOverride();
          if (devQueryOverride) {
            setVariant(devQueryOverride);
            return;
          }

          const cached = readVariantFromStorage();
          setVariant(
            cached ??
              (userId !== null && userId !== undefined
                ? getVariantFromUserId(userId)
                : DEFAULT_AB_VARIANT)
          );
        } catch {
          console.error('Fallback 실패, 기본값 사용');
          setVariant(DEFAULT_AB_VARIANT);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeABTest();
  }, [userId, search]);

  return {
    variant,
    isLoading,
    error,
    isVariantA: variant === 'A',
    isVariantB: variant === 'B',
  };
};
