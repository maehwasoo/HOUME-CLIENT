import OptimizedImage from '@components/image/OptimizedImage';

import { IMAGE_SIZES } from '@utils/imageVariant';

import * as styles from './FloorCard.css';

interface FloorPlanItemProps extends React.ComponentProps<'div'> {
  src: string;
  selected?: boolean;
}

const FloorPlanItem = ({ src, selected = false }: FloorPlanItemProps) => {
  return (
    <div className={`${styles.container} ${selected ? styles.selected : ''}`}>
      <OptimizedImage
        src={src}
        sizes={IMAGE_SIZES.grid}
        className={styles.floorimg}
        alt="카드 이미지"
        decoding="async"
      />
    </div>
  );
};

export default FloorPlanItem;
