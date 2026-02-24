import { useEffect, useRef } from 'react';

import * as styles from './CommunityComingSoonModal.css.ts';

const COMMUNITY_MODAL_TITLE_ID = 'community-coming-soon-modal-title';

interface CommunityComingSoonModalProps {
  onClose: () => void;
}

const CommunityComingSoonModal = ({
  onClose,
}: CommunityComingSoonModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.container}
        role="dialog"
        aria-modal="true"
        aria-labelledby={COMMUNITY_MODAL_TITLE_ID}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.contentArea}>
          <div className={styles.headingText}>
            <p id={COMMUNITY_MODAL_TITLE_ID} className={styles.title}>
              커뮤니티 기능은 아직 준비 중이에요
            </p>
            <p className={styles.body}>
              우리 집과 비슷한 유저들의{'\n'}인테리어 이미지를 곧 둘러볼 수
              있어요!
            </p>
          </div>
        </div>
        <div className={styles.buttonArea}>
          <button
            type="button"
            className={styles.closeButton}
            ref={closeButtonRef}
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityComingSoonModal;
