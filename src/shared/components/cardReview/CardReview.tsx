import * as styles from './CardReview.css';

interface CardReviewProps {
  title: string;
  body: string;
  username: string;
}

const CardReview = ({ title, body, username }: CardReviewProps) => {
  return (
    <div className={styles.cardReview}>
      <div className={styles.title}>{title}</div>
      <div className={styles.body}>{body}</div>
      <div className={styles.username}>{username}</div>
    </div>
  );
};

export default CardReview;
