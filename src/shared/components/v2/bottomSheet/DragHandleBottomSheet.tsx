import type { ReactNode } from 'react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import BottomSheetBase from './BottomSheetBase';
import * as styles from './BottomSheetBase.css';
import {
  DRAG_THRESHOLD_PX,
  PERSISTENT_EXPAND_RATIO,
  SHEET_TRANSITION_MS,
} from './constants';

interface DragHandleBottomSheetProps {
  open: boolean;
  contentSlot: ReactNode;
  primaryButton: ReactNode;
  secondaryButton?: ReactNode;
  onExpandedChange?: (expanded: boolean) => void;
  /** 최소 높이 (rem 문자열). 있으면 Persistent 모드, 없으면 Dismissible 모드 */
  collapsedHeight?: string;
  /** Dismissible 모드에서 바텀시트가 닫혀야 할 때 부모에게 알리는 콜백 */
  onDismiss?: () => void;
}

// 'snapping' = collapsed → expanded snap 중 콘텐츠 자연 높이로 부드럽게 보간하는 단계
// (px → auto 점프로 인한 디핑 방지)
type DragPhase = 'idle' | 'dragging' | 'snapping';

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
  contentSlot,
  primaryButton,
  secondaryButton,
  onExpandedChange,
  collapsedHeight,
  onDismiss,
}: DragHandleBottomSheetProps) => {
  const isPersistent = collapsedHeight !== undefined;

  const [expanded, setExpanded] = useState(!isPersistent);
  const [dragPhase, setDragPhase] = useState<DragPhase>('idle');
  const [dragHeight, setDragHeight] = useState<number | null>(null);

  // BottomSheetBase가 mount하는 panel DOM (PointerDown 시 측정용)
  const panelNodeRef = useRef<HTMLDivElement | null>(null);

  const startYRef = useRef(0);
  const startHeightRef = useRef(0);
  const currentHeightRef = useRef(0);
  const collapsedPxRef = useRef(0);
  const expandedPxRef = useRef(0);
  const draggedRef = useRef(false);
  const finishedRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);

  useEffect(() => {
    onExpandedChange?.(expanded);
  }, [expanded, onExpandedChange]);

  // snapping phase: collapsed → expanded snap 시 콘텐츠 자연 높이 측정 + transition으로 보간
  useLayoutEffect(() => {
    if (dragPhase !== 'snapping') return undefined;
    const panel = panelNodeRef.current;
    if (!panel) return undefined;

    // panel.style.height를 잠깐 auto로 두고 콘텐츠 자연 높이 측정 후 복원
    // useLayoutEffect는 paint 전 동기 실행이라 깜빡임 발생 X
    const prevHeight = panel.style.height;
    panel.style.height = 'auto';
    const naturalH = panel.offsetHeight;
    panel.style.height = prevHeight;

    // 측정값으로 transition (현재 dragHeight → naturalH로 부드럽게 보간)
    setDragHeight(naturalH);

    // transition 종료 후 idle + height auto로 정리 (naturalH ≈ auto라 점프 없음)
    const timer = window.setTimeout(() => {
      setDragHeight(null);
      setDragPhase('idle');
    }, SHEET_TRANSITION_MS + 50);

    return () => {
      clearTimeout(timer);
    };
  }, [dragPhase]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const panel = panelNodeRef.current;
      if (!panel) return;

      e.stopPropagation();

      const collapsedPx = isPersistent
        ? parsePxFromRem(collapsedHeight as string)
        : 0;
      const expandedPx = resolveExpandedPx();
      const startHeight = panel.offsetHeight;

      startYRef.current = e.clientY;
      startHeightRef.current = startHeight;
      currentHeightRef.current = startHeight;
      collapsedPxRef.current = collapsedPx;
      expandedPxRef.current = expandedPx;
      pointerIdRef.current = e.pointerId;
      draggedRef.current = false;
      finishedRef.current = false;

      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [isPersistent, collapsedHeight]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (pointerIdRef.current !== e.pointerId) return;
      if (finishedRef.current) return;

      // 위로 끌면 양수 (height 증가 방향)
      const delta = startYRef.current - e.clientY;

      if (!draggedRef.current) {
        if (Math.abs(delta) < DRAG_THRESHOLD_PX) return;
        draggedRef.current = true;
        setDragPhase('dragging');
      }

      const collapsedPx = collapsedPxRef.current;
      const expandedPx = expandedPxRef.current;
      const minH = isPersistent ? collapsedPx : 0;
      const next = Math.max(
        minH,
        Math.min(expandedPx, startHeightRef.current + delta)
      );

      currentHeightRef.current = next;
      setDragHeight(next);
    },
    [isPersistent]
  );

  const finishDrag = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (finishedRef.current) return;
      finishedRef.current = true;

      const target = e.currentTarget;
      if (target.hasPointerCapture(e.pointerId)) {
        target.releasePointerCapture(e.pointerId);
      }
      pointerIdRef.current = null;

      // 단순 탭 (임계 미통과)
      if (!draggedRef.current) {
        setDragPhase('idle');
        return;
      }

      // pointercancel: 원위치 복귀
      if (e.type === 'pointercancel') {
        currentHeightRef.current = startHeightRef.current;
        setDragHeight(null);
        setDragPhase('idle');
        return;
      }

      const h = currentHeightRef.current;
      const collapsedPx = collapsedPxRef.current;
      const expandedPx = expandedPxRef.current;

      if (isPersistent) {
        // collapsed~expanded 구간의 20% 지점만 넘으면 expanded snap
        const threshold =
          collapsedPx + (expandedPx - collapsedPx) * PERSISTENT_EXPAND_RATIO;
        const shouldExpand = h > threshold;

        if (shouldExpand && !expanded) {
          // collapsed → expanded: 콘텐츠 자연 높이로 부드럽게 보간 (snapping phase)
          // dragHeight 유지, useLayoutEffect에서 naturalH 측정 후 transition
          setExpanded(true);
          setDragPhase('snapping');
          return;
        }

        // 그 외(이미 expanded → expanded 유지 / expanded → collapsed / collapsed 유지):
        // height: dragHeight → collapsedHeight 또는 auto 점프 (점프 시각상 미미)
        setExpanded(shouldExpand);
      } else {
        const midPoint = expandedPx / 2;
        if (h > midPoint) {
          setExpanded(true);
        } else {
          onDismiss?.();
        }
      }

      setDragHeight(null);
      setDragPhase('idle');
    },
    [isPersistent, onDismiss, expanded]
  );

  const computeDimOpacity = (): number => {
    if (dragPhase !== 'dragging' || dragHeight === null) {
      return isPersistent ? (expanded ? 1 : 0) : 1;
    }
    if (isPersistent) {
      const range = expandedPxRef.current - collapsedPxRef.current;
      if (range <= 0) return 0;
      const progress = (dragHeight - collapsedPxRef.current) / range;
      return Math.max(0, Math.min(1, progress));
    }
    const expandedPx = expandedPxRef.current;
    if (expandedPx <= 0) return 0;
    return Math.max(0, Math.min(1, dragHeight / expandedPx));
  };

  // panel height 결정
  const panelStyle: React.CSSProperties =
    dragPhase === 'dragging' && dragHeight !== null
      ? { height: `${dragHeight}px` }
      : isPersistent
        ? { height: expanded ? 'auto' : collapsedHeight }
        : {};

  const handleOverlayClick = () => {
    if (isPersistent) {
      setExpanded(false);
    } else {
      onDismiss?.();
    }
  };

  return (
    <BottomSheetBase
      open={open}
      headerType="dragHandle"
      contentSlot={contentSlot}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
      panelRef={panelNodeRef}
      panelStyle={panelStyle}
      disableTransition={dragPhase === 'dragging'}
      onOverlayClick={handleOverlayClick}
      backgroundInteractable={
        isPersistent && !expanded && dragPhase !== 'dragging'
      }
      dimOpacity={computeDimOpacity()}
      preventScroll={!isPersistent || expanded}
      handleSlot={
        <button
          type="button"
          aria-label="바텀시트 크기 조절"
          className={styles.dragHandleButton}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onLostPointerCapture={finishDrag}
        />
      }
    />
  );
};

export default DragHandleBottomSheet;
