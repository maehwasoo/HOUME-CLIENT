// 원 계산
export const formatKrw = (value?: number) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  return `${value.toLocaleString('ko-KR')}`;
};

// 컬러칩
export const getColorChips = (colorHexes?: string[]) => {
  const visibleColors = Array.isArray(colorHexes)
    ? colorHexes.filter(Boolean).slice(0, 3)
    : [];
  const extraColorCount =
    Array.isArray(colorHexes) && colorHexes.length > 3
      ? colorHexes.length - 3
      : 0;
  return { visibleColors: visibleColors, extraColorCount: extraColorCount };
};

// 가격 텍스트
export const getPriceTexts = (
  originalPrice?: number,
  discountPrice?: number,
  discountRate?: number
) => {
  return {
    originalPriceText: formatKrw(originalPrice),
    discountPriceText: formatKrw(discountPrice),
    discountRateText:
      typeof discountRate === 'number' && Number.isFinite(discountRate)
        ? `${discountRate}%`
        : null,
  };
};

// 카드 클릭 핸들러
export type CardClickArea = 'card' | 'image' | 'title';

export const createCardClickHandler = ({
  onCardClick,
  enableWholeCardLink,
  linkHref,
  onNavigate,
}: {
  onCardClick?: (area?: CardClickArea) => void;
  enableWholeCardLink: boolean;
  linkHref?: string;
  // 카드 본문(이미지/제목) 클릭 시 실제 이동 동작. 로그인 게이트 + 새 탭 열기는 호출부(useProductLink)가 담당
  onNavigate?: () => void;
}) => ({
  handleWrapperClick: (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    const areaElement = target?.closest?.('[data-click-area]') as HTMLElement;
    const area = areaElement?.dataset?.clickArea as CardClickArea | undefined;
    const resolvedArea: CardClickArea =
      area === 'image' || area === 'title' ? area : 'card';

    onCardClick?.(resolvedArea);

    if (!enableWholeCardLink || !linkHref) return;
    onNavigate?.();
  },

  handleWrapperKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!enableWholeCardLink || !linkHref) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    onCardClick?.('card');
    onNavigate?.();
  },
});
