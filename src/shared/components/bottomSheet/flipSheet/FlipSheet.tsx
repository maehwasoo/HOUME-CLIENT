import CtaButton from '@components/button/ctaButton/CtaButton';
import FlipButton from '@components/button/flipButton/FlipButton';

import * as styles from './FlipSheet.css';
import BottomSheetWrapper from '../BottomSheetWrapper';

interface FlipSheetProps {
  onFlipClick: () => void;
  onChooseClick: () => void;
  isOpen: boolean;
  onClose: () => void;
  onExited?: () => void;
  src: string;
  isFlipped: boolean;
}

const FlipSheet = ({
  onFlipClick,
  onChooseClick,
  isOpen,
  onClose,
  onExited,
  src,
  isFlipped,
}: FlipSheetProps) => {
  return (
    <BottomSheetWrapper isOpen={isOpen} onClose={onClose} onExited={onExited}>
      <div className={styles.imageArea}>
        <p className={styles.infoText}>이미지를 좌우반전 할 수 있어요</p>
        <div className={styles.imageContainer}>
          <img
            src={src}
            alt="선택된 구조 이미지"
            className={
              isFlipped
                ? styles.imageVariants.flipped
                : styles.imageVariants.normal
            }
          />
        </div>
      </div>

      <div className={styles.buttonGroup}>
        {/* 의도적으로 isFlipped를 false로 고정 (버튼 색상용, 실제 flip 상태 저장과는 무관함) */}
        <FlipButton onClick={onFlipClick} isFlipped={false} />
        <CtaButton onClick={onChooseClick}>선택하기</CtaButton>
      </div>
    </BottomSheetWrapper>
  );
};

export default FlipSheet;
