import { useEffect, useState } from 'react';

// 랜딩 배경 배너를 일정 간격으로 순환시키는 훅.
// 실제 디졸브(크로스페이드)는 모든 이미지를 겹쳐두고 CSS opacity transition으로 처리하므로,
// 이 훅은 현재 인덱스만 돌려준다(이전 인덱스/리마운트 불필요).

interface UseDissolveAnimationParams {
  itemCount: number;
  intervalMs: number;
}

interface UseDissolveAnimationResult {
  currentIndex: number;
}

export const useDissolveAnimation = ({
  itemCount,
  intervalMs,
}: UseDissolveAnimationParams): UseDissolveAnimationResult => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (itemCount <= 1) {
      setCurrentIndex(0);
      return;
    }
    // 배너 목록이 줄어 currentIndex가 범위를 벗어나면(예: 5→3) 다음 tick까지 빈 배경이 보이므로 즉시 클램프
    setCurrentIndex((prev) => (prev >= itemCount ? 0 : prev));
    const intervalId = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itemCount);
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [itemCount, intervalMs]);

  return { currentIndex };
};
