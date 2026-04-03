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
            {/* Drawer.Overlay(radix Dialog의 overlay) 사용 시 데스크탑 뒷배경 레이아웃 깨짐 현상 발생 -> 커스텀 dim overlay 적용 */}
            <div
              className={styles.overlay}
              style={
                dimOpacity !== undefined
                  ? { backgroundColor: `rgba(0, 0, 0, ${dimOpacity * 0.5})` }
                  : undefined
              }
              onClick={onOverlayClick}
              aria-hidden="true"
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
