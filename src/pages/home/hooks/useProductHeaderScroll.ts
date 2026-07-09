import { useEffect, useRef, useState } from 'react';

/**
 * 상품 탭 헤더 스크롤 전용 훅
 * - 필터 영역이 상단에 닿으면 sticky 상태로 전환한다.
 * - sticky 상태에서 스크롤 방향에 따라 상단 검색바 노출을 제어한다.
 */
interface UseProductHeaderScrollParams {
  searchBarRef: React.RefObject<HTMLDivElement | null>;
  filterListRef: React.RefObject<HTMLDivElement | null>;
}

/** 필터가 상단에 닿기 전 최소 스크롤 (마운트 시 sticky 오발동 방지) */
const FILTER_STICKY_SCROLL_MIN_PX = 8;

/** scroll-to-top 노출: sticky 활성 + 스크롤 업 + 최소 스크롤 거리 */
const SCROLL_TOP_SHOW_MIN_PX = 120;

const useProductHeaderScroll = ({
  searchBarRef,
  filterListRef,
}: UseProductHeaderScrollParams) => {
  /** 스크롤 방향/상태 비교를 위한 내부 ref */
  const lastScrollYRef = useRef(0);
  const isFilterStickyRef = useRef(false);

  /** 외부에 노출할 sticky 상태 */
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const [showStickySearchBar, setShowStickySearchBar] = useState(false);
  const [showScrollTopFloatingButton, setShowScrollTopFloatingButton] =
    useState(false);

  /**
   * window 스크롤 이벤트를 구독해 sticky 헤더 상태를 계산한다.
   * - 필터 라인이 viewport top에 닿으면 sticky 시작
   * - sticky 중 스크롤 업 + 원본 검색바 복귀 시 sticky 해제
   * - sticky 중에는 스크롤 업일 때만 상단 검색바·scroll-to-top 버튼 표시
   */
  useEffect(() => {
    const handleScroll = () => {
      if (!searchBarRef.current || !filterListRef.current) return;

      const currentY = window.scrollY || window.pageYOffset;
      const isScrollUp = currentY < lastScrollYRef.current;
      lastScrollYRef.current = currentY;

      const filterTop = filterListRef.current.getBoundingClientRect().top;
      const searchBarTop = searchBarRef.current.getBoundingClientRect().top;

      if (
        !isFilterStickyRef.current &&
        filterTop <= 0 &&
        currentY > FILTER_STICKY_SCROLL_MIN_PX
      ) {
        isFilterStickyRef.current = true;
        setIsFilterSticky(true);
      }

      if (isFilterStickyRef.current) {
        if (isScrollUp && searchBarTop >= 0) {
          isFilterStickyRef.current = false;
          setIsFilterSticky(false);
          setShowStickySearchBar(false);
          setShowScrollTopFloatingButton(false);
          return;
        }
        setShowStickySearchBar(isScrollUp);
        setShowScrollTopFloatingButton(
          isScrollUp && currentY > SCROLL_TOP_SHOW_MIN_PX
        );
      } else {
        setShowScrollTopFloatingButton(false);
      }
    };

    /** 마운트 시점과 스크롤 중 상태를 동일 규칙으로 동기화 */
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    /** 언마운트 시 스크롤 이벤트 정리 */
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [filterListRef, searchBarRef]);

  /** SearchSection에서 사용할 공개 값 */
  return {
    isFilterSticky,
    showStickySearchBar,
    showScrollTopFloatingButton,
  };
};

export { useProductHeaderScroll };
