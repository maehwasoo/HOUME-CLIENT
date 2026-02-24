import clsx from 'clsx';

import Horizontal from '@assets/icons/horizontal.svg?react';

import * as styles from './FlipButton.css';

interface FlipButtonProps extends React.ComponentProps<'button'> {
  isFlipped: boolean;
}

const FlipButton = ({ isFlipped, ...props }: FlipButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(
        styles.flipButtonBase,
        styles.flipButtonVariants[isFlipped ? 'clicked' : 'normal']
      )}
      {...props}
    >
      <Horizontal />
    </button>
  );
};

export default FlipButton;
