import OptimizedImage from '@components/image/OptimizedImage';

import * as styles from './GeneratedImg.css';

import type { ResultImageMeta } from '../../../types';

export interface GeneratedImgListProps {
  /** 단일 생성 이미지 */
  image: ResultImageMeta;
}

/**
 * 목록형 결과
 */
const GeneratedImg = ({ image }: GeneratedImgListProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.listImageFrame}>
        <OptimizedImage
          src={image.imageUrl}
          alt=""
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className={styles.imgArea({ mirrored: image.isMirror })}
        />
      </div>
    </div>
  );
};

export default GeneratedImg;
