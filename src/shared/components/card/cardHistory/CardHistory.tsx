import CtaButton from '@components/button/ctaButton/CtaButton';
import OptimizedImage from '@components/image/OptimizedImage';

import * as styles from './CardHistory.css';

interface CardHistoryProps extends React.ComponentProps<'div'> {
  src: string;
  title: string;
  btnText: string;
  onClick?: () => void;
}

const CardHistory = ({ src, title, btnText, onClick }: CardHistoryProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.imgbox}>
        <OptimizedImage
          src={src}
          className={styles.imgbox}
          alt="이미지 생성 히스토리"
          crossOrigin="anonymous"
        />
      </div>
      <div className={styles.textbox}>
        <h1 className={styles.title}>{title}</h1>
        <CtaButton buttonSize={'medium'} fontSize={'body'} onClick={onClick}>
          {btnText}
        </CtaButton>
      </div>
    </div>
  );
};

export default CardHistory;
