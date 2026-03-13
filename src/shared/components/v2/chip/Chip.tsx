import type { ReactNode } from 'react';

import * as styles from './Chip.css';

interface ChipProps extends Omit<React.ComponentProps<'button'>, 'children'> {
  children: ReactNode;
  selected?: boolean;
  suffixIcon?: ReactNode;
}

const Chip = ({
  children,
  selected = false,
  suffixIcon,
  type = 'button',
  ...props
}: ChipProps) => {
  const hasSuffix = suffixIcon !== undefined;

  return (
    <button
      type={type}
      className={styles.chip({ selected })}
      aria-pressed={selected}
      {...props}
    >
      <span className={styles.content}>
        <span className={styles.label({ selected, hasSuffix })}>
          {children}
        </span>
        {hasSuffix && (
          <span className={styles.suffix} aria-hidden="true">
            {suffixIcon}
          </span>
        )}
      </span>
    </button>
  );
};

export default Chip;
