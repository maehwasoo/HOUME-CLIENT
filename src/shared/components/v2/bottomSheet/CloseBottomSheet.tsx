import type { ReactNode } from 'react';

import BottomSheetBase from './BottomSheetBase';

interface CloseBottomSheetProps {
  open: boolean;
  onClose: () => void;
  titleSlot?: ReactNode;
  contentSlot: ReactNode;
  primaryButton: ReactNode;
  secondaryButton?: ReactNode;
  height?: string;
  titleAlign?: 'left' | 'center';
}

const CloseBottomSheet = ({
  open,
  onClose,
  titleSlot,
  contentSlot,
  primaryButton,
  secondaryButton,
  height,
  titleAlign = 'center',
}: CloseBottomSheetProps) => {
  return (
    <BottomSheetBase
      open={open}
      headerType="close"
      titleSlot={titleSlot}
      titleAlign={titleAlign}
      contentSlot={contentSlot}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
      panelStyle={height ? { minHeight: height } : undefined}
      onOverlayClick={onClose}
      onCloseClick={onClose}
    />
  );
};

export default CloseBottomSheet;
