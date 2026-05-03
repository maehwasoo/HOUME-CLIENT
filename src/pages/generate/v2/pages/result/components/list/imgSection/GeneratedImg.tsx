import type { GenerateImageData } from '@pages/generate/types/generate';

import * as styles from './GeneratedImg.css';

export interface GeneratedImgListProps {
  /** 단일 생성 이미지 */
  image: GenerateImageData;
}

/**
 * 목록형 결과
 */
const GeneratedImg = ({ image }: GeneratedImgListProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.listImageFrame}>
        <img
          src={image.imageUrl}
          alt=""
          loading="lazy"
          decoding="async"
          className={styles.imgArea({ mirrored: image.isMirror })}
        />
      </div>
    </div>
  );
};

export default GeneratedImg;
