import { useEffect, useRef, useState } from 'react';

interface UseProductStickyHeaderParams {
  searchBarRef: React.RefObject<HTMLDivElement | null>;
  filterListRef: React.RefObject<HTMLDivElement | null>;
}

export const useProductStickyHeader = ({
  searchBarRef,
  filterListRef,
}: UseProductStickyHeaderParams) => {
  const lastScrollYRef = useRef(0);
  const isFilterStickyRef = useRef(false);
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const [showStickySearchBar, setShowStickySearchBar] = useState(false);

  useEffect(() => {
    // handleScroll: 스크롤 위치/방향에 따라 sticky 상태와 검색바 노출 상태 갱신
    const handleScroll = () => {
      if (!searchBarRef.current || !filterListRef.current) return;

      const currentY = window.scrollY || window.pageYOffset;
      const isScrollUp = currentY < lastScrollYRef.current;
      lastScrollYRef.current = currentY;

      const filterTop = filterListRef.current.getBoundingClientRect().top;
      const searchBarTop = searchBarRef.current.getBoundingClientRect().top;

      // 필터칩 행 상단이 viewport 상단에 닿으면 sticky 시작
      if (!isFilterStickyRef.current && filterTop <= 0) {
        isFilterStickyRef.current = true;
        setIsFilterSticky(true);
      }

      if (isFilterStickyRef.current) {
        // 스크롤 업 중 원래 검색바 상단이 다시 화면 안으로 들어오면 sticky 해제
        if (isScrollUp && searchBarTop >= 0) {
          isFilterStickyRef.current = false;
          setIsFilterSticky(false);
          setShowStickySearchBar(false);
          return;
        }
        // sticky 상태에서는 스크롤 업일 때만 검색바 노출
        setShowStickySearchBar(isScrollUp);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // 최초 마운트 시 현재 스크롤 위치를 반영해 상태 동기화
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [filterListRef, searchBarRef]);

  return {
    isFilterSticky,
    showStickySearchBar,
  };
};
