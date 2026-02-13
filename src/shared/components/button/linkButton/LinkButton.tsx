import LinkIcon from '@assets/icons/icnLink.svg?react';

import * as styles from './LinkButton.css';
interface LinkButtonProps extends React.ComponentProps<'a'> {
  children?: React.ReactNode;
  typeVariant?: 'withText' | 'onlyIcon';
}

const LinkButton = ({
  children,
  typeVariant = 'withText',
  ...props
}: LinkButtonProps) => {
  const isWithText = typeVariant === 'withText';

  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer" // 새 탭으로 열기
      className={styles.linkButton({
        type: typeVariant,
      })}
    >
      {isWithText ? (
        <span className={styles.linkContent}>
          <span className={styles.linkIconWrapper}>
            <LinkIcon />
          </span>
          {children ? (
            <span className={styles.linkLabel}>{children}</span>
          ) : null}
        </span>
      ) : (
        <span className={styles.linkIconWrapper}>
          <LinkIcon />
        </span>
      )}
    </a>
  );
};

export default LinkButton;
