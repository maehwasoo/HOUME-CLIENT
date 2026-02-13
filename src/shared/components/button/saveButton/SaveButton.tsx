import React from 'react';

import SaveIcon from '@assets/icons/icnHeartGray.svg?react';

import * as styles from './SaveButton.css';

interface SaveButtonProps extends React.ComponentProps<'button'> {
  isSelected: boolean;
  onClick: () => void;
}

const SaveButton = ({ isSelected, onClick, ...props }: SaveButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className={`${styles.buttonWrapper} ${
        isSelected ? styles.selected : styles.unselected
      }`}
      {...props}
    >
      <SaveIcon />
    </button>
  );
};
export default SaveButton;
