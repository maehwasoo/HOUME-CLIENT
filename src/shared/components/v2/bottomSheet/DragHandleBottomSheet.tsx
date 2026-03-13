import type { ReactNode } from 'react';
import { useCallback, useRef, useState } from 'react';

import BottomSheetBase from './BottomSheetBase';
import * as styles from './BottomSheetBase.css';

interface DragHandleBottomSheetProps {
  open: boolean;
  // COLLAPSED_HEIGHT: string;
  contentSlot: ReactNode;
  primaryButton: ReactNode;
  secondaryButton?: ReactNode;
}

const COLLAPSED_HEIGHT = '24rem';
const EXPANDED_HEIGHT = 'calc(100dvh - 10.4rem)';

const parsePxFromRem = (rem: string): number => {
  const value = parseFloat(rem);
  const fontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  return value * fontSize;
};

const resolveExpandedPx = (): number =>
  window.innerHeight - parsePxFromRem('10.4rem');

const DragHandleBottomSheet = ({
  open,
  // COLLAPSED_HEIGHT,
  contentSlot,
  primaryButton,
  secondaryButton,
}: DragHandleBottomSheetProps) => {
  const [expanded, setExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragHeight, setDragHeight] = useState<number | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const dragStartYRef = useRef(0);
  const startHeightRef = useRef(0);
  const collapsedPxRef = useRef(0);
  const expandedPxRef = useRef(0);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const panel = panelRef.current;
    if (!panel) return;

    dragStartYRef.current = e.clientY;
    startHeightRef.current = panel.offsetHeight;
    collapsedPxRef.current = parsePxFromRem(COLLAPSED_HEIGHT);
    expandedPxRef.current = resolveExpandedPx();

    setIsDragging(true);
    setDragHeight(panel.offsetHeight);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;

      const delta = dragStartYRef.current - e.clientY;
      const newHeight = startHeightRef.current + delta;
      const clamped = Math.max(
        collapsedPxRef.current,
        Math.min(expandedPxRef.current, newHeight)
      );
      setDragHeight(clamped);
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || dragHeight == null) return;

      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      setIsDragging(false);

      const midPoint = (collapsedPxRef.current + expandedPxRef.current) / 2;
      setExpanded(dragHeight > midPoint);
      setDragHeight(null);
    },
    [isDragging, dragHeight]
  );

  const getDimOpacity = (): number => {
    if (!isDragging || dragHeight == null) return expanded ? 1 : 0;

    const range = expandedPxRef.current - collapsedPxRef.current;
    if (range <= 0) return 0;

    const progress = (dragHeight - collapsedPxRef.current) / range;
    return Math.max(0, Math.min(1, progress));
  };

  const panelStyle: React.CSSProperties =
    isDragging && dragHeight != null
      ? { height: `${dragHeight}px` }
      : { height: expanded ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT };

  return (
    <BottomSheetBase
      open={open}
      headerType="dragHandle"
      contentSlot={contentSlot}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
      panelRef={panelRef}
      panelStyle={panelStyle}
      dimOpacity={getDimOpacity()}
      disableTransition={isDragging}
      onOverlayClick={() => setExpanded(false)} // DragHandleBottomSheet은 dismissible={false}(vaul 자동닫기 꺼놓은 상태), DragHandle바텀시트에서 내부적으로 close 상태 관리 => 백드롭 클릭 시 collapse도 별도로 관리 필요
      handleSlot={
        <button
          type="button"
          aria-label="바텀시트 크기 조절"
          className={styles.dragHandleButton}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />
      }
    />
  );
};

export default DragHandleBottomSheet;
