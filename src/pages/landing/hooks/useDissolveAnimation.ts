import { useEffect, useRef, useState } from 'react';

// 랜딩 페이지 배경 배너 Dissolve Animation 훅

interface UseDissolveAnimationParams {
  itemCount: number;
  intervalMs: number;
  durationMs: number;
}

interface UseDissolveAnimationResult {
  currentIndex: number;
  previousIndex: number | null;
}

export const useDissolveAnimation = ({
  itemCount,
  intervalMs,
  durationMs,
}: UseDissolveAnimationParams): UseDissolveAnimationResult => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const dissolveTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (itemCount === 0) {
      setCurrentIndex(0);
      setPreviousIndex(null);
      return;
    }
    setCurrentIndex((prev) => (prev >= itemCount ? 0 : prev));
  }, [itemCount]);

  useEffect(() => {
    if (itemCount <= 1) return;

    const intervalId = window.setInterval(() => {
      setCurrentIndex((prev) => {
        setPreviousIndex(prev);
        return (prev + 1) % itemCount;
      });
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [itemCount, intervalMs]);

  useEffect(() => {
    if (previousIndex === null) return;
    if (dissolveTimeoutRef.current) {
      window.clearTimeout(dissolveTimeoutRef.current);
    }
    dissolveTimeoutRef.current = window.setTimeout(() => {
      setPreviousIndex(null);
    }, durationMs);

    return () => {
      if (dissolveTimeoutRef.current) {
        window.clearTimeout(dissolveTimeoutRef.current);
      }
    };
  }, [previousIndex, durationMs]);

  return {
    currentIndex,
    previousIndex,
  };
};
