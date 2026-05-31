import type { ReactNode } from 'react';

import * as styles from './Popup.css.ts';
import ActionButton from '../button/actionButton/ActionButton';
import IconButton from '../button/IconButton';
import Icon from '../icon/Icon';

import type { IconName } from '../icon/Icon';

export type PopupBtnStyle = 'text' | 'solid';

interface PopupProps {
  topIconName?: IconName;
  content?: ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  onClose: () => void;
  btnStyle: PopupBtnStyle;
  btnText: string;
  weakBtnText?: string;
  btnIcon?: IconName;
  showCloseButton?: boolean;
  sideIconName?: IconName;
  ariaLabel?: string;
  confirmDisabled?: boolean;
}

const Popup = ({
  topIconName,
  content,
  onCancel,
  onConfirm,
  onClose,
  btnStyle,
  btnText,
  weakBtnText,
  btnIcon,
  showCloseButton = false,
  sideIconName,
  ariaLabel,
  confirmDisabled = false,
}: PopupProps) => {
  const hasWeak = weakBtnText != null && weakBtnText !== '';

  const footer =
    btnStyle === 'text' ? (
      <div className={styles.buttonArea({ btnStyle: 'text' })}>
        {hasWeak ? (
          <button
            type="button"
            className={styles.textButton({ role: 'weak', layout: 'paired' })}
            onClick={onCancel}
          >
            {weakBtnText}
          </button>
        ) : null}
        <button
          type="button"
          className={styles.textButton({
            role: 'strong',
            layout: hasWeak ? 'paired' : 'single',
          })}
          disabled={confirmDisabled}
          aria-disabled={confirmDisabled || undefined}
          onClick={onConfirm}
        >
          {btnText}
        </button>
      </div>
    ) : (
      <div className={styles.buttonArea({ btnStyle: 'solid' })}>
        {sideIconName ? (
          <IconButton name={sideIconName} size="M" onClick={onCancel} />
        ) : null}
        <ActionButton
          variant="solid"
          color="primary"
          size="L"
          leftIcon={btnIcon}
          fullWidth={!hasWeak}
          disabled={confirmDisabled}
          onClick={onConfirm}
        >
          {btnText}
        </ActionButton>
      </div>
    );

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.container}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ?? '안내 팝업'}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton ? (
          <div className={styles.closeButton}>
            <IconButton
              name="Close"
              size="S"
              aria-label="닫기"
              onClick={onClose}
            />
          </div>
        ) : null}
        <div className={styles.contentArea({ btnStyle })}>
          <div className={styles.slotBox}>
            {topIconName ? <Icon name={topIconName} size="32" /> : null}
            <div className={styles.body}>{content}</div>
          </div>
        </div>
        {footer}
      </div>
    </div>
  );
};

export default Popup;
