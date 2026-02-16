import * as styles from './InlineError.css';

interface InlineErrorProps {
  message?: string;
  onRetry?: () => void;
}

const InlineError = ({
  message = '데이터를 불러올 수 없습니다',
  onRetry,
}: InlineErrorProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button type="button" className={styles.retryButton} onClick={onRetry}>
          다시 시도
        </button>
      )}
    </div>
  );
};

export default InlineError;
