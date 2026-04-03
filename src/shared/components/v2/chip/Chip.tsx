import type { ReactNode } from 'react';

import * as styles from './Chip.css';

interface ChipProps extends Omit<React.ComponentProps<'button'>, 'children'> {
  children: ReactNode;
  selected?: boolean;
  suffixIcon?: ReactNode;
  suffixAriaLabel?: string;
  onSuffixClick?: () => void;
}

const Chip = ({
  children,
  selected = false,
  suffixIcon,
  suffixAriaLabel,
  onSuffixClick,
  type = 'button',
  className,
  onClick,
  ...props
}: ChipProps) => {
  const hasSuffix = suffixIcon !== undefined;
  const chipClassName = `${styles.chip({ selected })}${className ? ` ${className}` : ''}`;

  return (
    <button
      type={type}
      className={chipClassName}
      aria-pressed={selected}
      onClick={onClick}
      {...props}
    >
      <span className={styles.label({ selected, hasSuffix })}>{children}</span>
      {hasSuffix && (
        <span
          role={onSuffixClick ? 'button' : undefined}
          tabIndex={onSuffixClick ? 0 : undefined}
          aria-label={suffixAriaLabel}
          className={onSuffixClick ? styles.suffixButton : styles.suffix}
          onClick={
            onSuffixClick
              ? (e) => {
                  e.stopPropagation();
                  onSuffixClick();
                }
              : undefined
          }
        >
          <span aria-hidden="true">{suffixIcon}</span>
        </span>
      )}
    </button>
  );
};

export default Chip;
