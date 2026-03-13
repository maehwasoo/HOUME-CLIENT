import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { Drawer } from 'vaul';

import IcnX from '@assets/v2/svg/IcnX.svg?react';

import * as styles from './BottomSheetBase.css';

interface BottomSheetBaseProps {
  open: boolean;
  headerType: 'dragHandle' | 'close';
  titleSlot?: ReactNode;
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
}

const BottomSheetBase = ({
  open,
  headerType,
  titleSlot,
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
}: BottomSheetBaseProps) => {
  // 뒷배경 스크롤 방지용
  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // 접근성용 title
  const accessibleTitle =
    typeof titleSlot === 'string' && titleSlot.trim().length > 0
      ? titleSlot
      : headerType === 'close'
        ? '닫기형 바텀시트'
        : '드래그 핸들 바텀시트';

  return (
    <Drawer.Root open={open} modal dismissible={false}>
      <Drawer.Portal>
        {open && (
          <div className={styles.viewportLayer}>
            <Drawer.Overlay
              className={styles.overlay}
              style={
                dimOpacity !== undefined
                  ? { backgroundColor: `rgba(0, 0, 0, ${dimOpacity * 0.5})` }
                  : undefined
              }
              onClick={onOverlayClick}
            />
            <Drawer.Content
              className={styles.content}
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
                    <div className={styles.titleSlot}>{titleSlot}</div>
                    <button
                      type="button"
                      aria-label="닫기"
                      className={styles.closeButton}
                      onClick={onCloseClick}
                    >
                      <IcnX className={styles.closeIcon} aria-hidden="true" />
                    </button>
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
