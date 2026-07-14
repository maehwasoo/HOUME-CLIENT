import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 상품 탭 선택 시트 최소화 전용 훅
 * - 스크롤 다운 시 시트를 최소화(핸들 + 썸네일 한 줄)하고, 스크롤 업 시 복원한다.
 * - `active`가 false면(시트 expanded / 필터 시트 열림 등) 리스너를 비활성화하고 즉시 복원한다.
 */
interface UseSheetMinimizeOnScrollParams {
  /** collapsed 상태이면서 페이지 스크롤이 가능한 구간에서만 true */
  active: boolean;
}

/**
 * 방향 판단 임계 이동량
 * 임계 미만 이동은 기준점을 갱신하지 않아 누적되므로, 느린 스크롤도 임계를 넘으면 트리거된다.
 */
const SCROLL_DELTA_THRESHOLD_PX = 6;

/** 이 지점 이하로 올라오면 최소화를 강제 해제 (리스트 최상단) */
const RESTORE_AT_TOP_PX = 8;

const useSheetMinimizeOnScroll = ({
  active,
}: UseSheetMinimizeOnScrollParams) => {
  const lastScrollYRef = useRef(0);
  const [minimized, setMinimized] = useState(false);

  /** active가 꺼지면(expanded/필터 열림) 최소화 상태를 즉시 해제 */
  useEffect(() => {
    if (!active) setMinimized(false);
  }, [active]);

  /**
   * window 스크롤 방향으로 최소화 상태를 계산한다.
   * - 아래로 임계 이상 → 최소화 / 위로 임계 이상 → 복원 (누적 delta 기준)
   * - 임계 미만 이동은 기준점을 갱신하지 않아 누적됨 (느린 스크롤 대응 + 지터 무시)
   * - 최상단 근처 → 강제 복원
   */
  useEffect(() => {
    if (!active) return undefined;

    lastScrollYRef.current = window.scrollY || window.pageYOffset;

    const handleScroll = () => {
      const currentY = window.scrollY || window.pageYOffset;

      if (currentY <= RESTORE_AT_TOP_PX) {
        lastScrollYRef.current = currentY;
        setMinimized(false);
        return;
      }

      const delta = currentY - lastScrollYRef.current;

      if (delta > SCROLL_DELTA_THRESHOLD_PX) {
        lastScrollYRef.current = currentY;
        setMinimized(true);
      } else if (delta < -SCROLL_DELTA_THRESHOLD_PX) {
        lastScrollYRef.current = currentY;
        setMinimized(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [active]);

  /** 드래그 시작 등 외부에서 즉시 복원할 때 사용 (참조 안정 — 소비처 useCallback 의존성) */
  const restore = useCallback(() => setMinimized(false), []);

  return { minimized, restore };
};

export { useSheetMinimizeOnScroll };
