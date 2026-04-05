import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { Drawer } from 'vaul';

import IconButton from '@components/v2/button/IconButton';

import * as styles from './BottomSheetBase.css';

interface BottomSheetBaseProps {
  open: boolean;
  headerType: 'dragHandle' | 'close';
  titleSlot?: ReactNode;
  titleAlign?: 'left' | 'center';
  contentSlot: ReactNode;
  primaryButton: ReactNode;
  secondaryButton?: ReactNode;
  panelStyle?: React.CSSProperties;
  panelRef?: React.Ref<HTMLDivElement>;
  dimOpacity?: number;
  disableTransition?: boolean;
  onOverlayClick?: () => void;
  onCloseClick?: () => void;
  handleSlot?: ReactNode;
  /** true일 때 overlay/viewportLayer의 터치 이벤트를 통과시켜 뒷배경 터치 가능하게 함 */
  backgroundInteractable?: boolean;
  /** true일 때 body overflow를 hidden으로 설정하여 뒷배경 스크롤을 막음 (기본: true) */
  preventScroll?: boolean;
}

const BottomSheetBase = ({
  open,
  headerType,
  titleSlot,
  titleAlign = 'center',
  contentSlot,
  primaryButton,
  secondaryButton,
  panelStyle,
  panelRef,
  dimOpacity,
  disableTransition = false,
  onOverlayClick,
  onCloseClick,
  handleSlot,
  backgroundInteractable = false,
  preventScroll = true,
}: BottomSheetBaseProps) => {
  // expanded 상태에서만 스크롤을 막고, collapsed 상태(preventScroll=false)에서는 뒷배경 스크롤 허용
  useEffect(() => {
    if (!open || !preventScroll) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open, preventScroll]);

  // 접근성용 title
  const accessibleTitle =
    typeof titleSlot === 'string' && titleSlot.trim().length > 0
      ? titleSlot
      : headerType === 'close'
        ? '닫기형 바텀시트'
        : '드래그 핸들 바텀시트';

  return (
    // backgroundInteractable일 때만 modal=false
    <Drawer.Root
      open={open}
      modal={!backgroundInteractable}
      dismissible={false}
    >
      <Drawer.Portal>
        {open && (
          <div
            className={styles.viewportLayer}
            // backgroundInteractable=true일 때 viewportLayer의 터치를 통과시켜 뒷배경과 상호작용 가능하게 함
            style={
              backgroundInteractable ? { pointerEvents: 'none' } : undefined
            }
          >
            {/* backgroundInteractable=true일 때 overlay도 터치를 통과시킴 */}
            <div
              className={styles.overlay}
              style={{
                ...(dimOpacity !== undefined ? { opacity: dimOpacity } : {}),
                pointerEvents: backgroundInteractable ? 'none' : 'auto',
              }}
              onClick={onOverlayClick}
              aria-hidden="true"
            />
            {/* backgroundInteractable이어도 바텀시트 자체는 항상 터치 가능해야 함 */}
            <Drawer.Content
              className={styles.content}
              style={
                backgroundInteractable ? { pointerEvents: 'auto' } : undefined
              }
              aria-describedby={undefined}
            >
              <Drawer.Title className={styles.srOnlyTitle}>
                {accessibleTitle}
              </Drawer.Title>
              <div
                ref={panelRef}
                className={styles.panel}
                style={{
                  ...panelStyle,
                  ...(disableTransition ? { transition: 'none' } : {}),
                }}
              >
                {headerType === 'dragHandle' ? (
                  <div className={styles.dragHeader}>{handleSlot}</div>
                ) : (
                  <div className={styles.closeHeader}>
                    <div className={styles.titleSlot({ align: titleAlign })}>
                      {titleSlot}
                    </div>
                    <IconButton
                      name="Close"
                      size="M"
                      aria-label="닫기"
                      className={styles.closeButton}
                      onClick={onCloseClick}
                    />
                  </div>
                )}
                <div className={styles.body}>
                  <div className={styles.contentSlot}>{contentSlot}</div>
                  <div className={styles.actionRow}>
                    {secondaryButton && (
                      <div className={styles.secondaryActionSlot}>
                        {secondaryButton}
                      </div>
                    )}
                    <div className={styles.primaryActionSlot}>
                      {primaryButton}
                    </div>
                  </div>
                </div>
              </div>
            </Drawer.Content>
          </div>
        )}
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default BottomSheetBase;
