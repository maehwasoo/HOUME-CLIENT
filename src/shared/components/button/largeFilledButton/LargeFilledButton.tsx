import * as styles from './LargeFilledButton.css';

interface LargeFilledButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  isActive?: boolean;
  isError?: boolean;
  buttonSize?: 'xsmall' | 'small' | 'medium' | 'large';
  isSelected?: boolean;
}

const LargeFilledButton = ({
  children,
  isActive = true,
  isError = false,
  buttonSize = 'large',
  isSelected = false,
  onClick,
  ...props
}: LargeFilledButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.largeFilled({
        state: isError ? 'error' : isActive ? 'active' : 'disabled',
        selected: isError ? false : isSelected,
        buttonSize,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default LargeFilledButton;
