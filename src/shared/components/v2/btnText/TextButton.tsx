import type { ComponentProps, ReactNode } from 'react';

import clsx from 'clsx';

import * as styles from './TextButton.css';

export type TextButtonColor = 'primary' | 'secondary' | 'inverse';
export type TextButtonSize = 's' | 'm';

export type TextButtonProps = Omit<
  ComponentProps<'button'>,
  'children' | 'type'
> & {
  color?: TextButtonColor;
  size?: TextButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
};

const TextButton = ({
  className,
  color = 'primary',
  size = 'm',
  leftIcon,
  rightIcon,
  children,
  ...rest
}: TextButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(styles.button({ color, size }), className)}
      {...rest}
    >
      {leftIcon != null ? (
        <span className={styles.iconSlot({ size })} aria-hidden>
          {leftIcon}
        </span>
      ) : null}
      {children}
      {rightIcon != null ? (
        <span className={styles.iconSlot({ size })} aria-hidden>
          {rightIcon}
        </span>
      ) : null}
    </button>
  );
};

export default TextButton;
