import CurationSection from '@pages/generate/pages/result/curationSection/CurationSection';
import type { GenerateImageData } from '@pages/generate/types/generate';

import * as styles from './CurationResult.css';
import GeneratedImg from './imgSection/GeneratedImg';

export interface CurationResultProps {
  images: GenerateImageData[];
  onCurrentImgIdChange?: (imageId: number) => void;
  groupId?: number | null;
}

const CurationResult = ({
  images,
  onCurrentImgIdChange,
  groupId = null,
}: CurationResultProps) => {
  return (
    <div className={styles.root}>
      <GeneratedImg
        images={images}
        onCurrentImgIdChange={onCurrentImgIdChange}
      />
      <div className={styles.mainArea}>
        {/* <div className={styles.section}>
          <h1 className={styles.title}>이 공간에 어울리는 추천 상품</h1>
          <div className={styles.chipList}>
            <Chip>가구 이름</Chip>
          </div>
          <div className={styles.productList}>
            <ProductCard
              product={{
                brand: '브랜드명',
                title: '상품명',
                imageUrl: 'https://picsum.photos/seed/similar-1/500/500',
                colorHexes: ['#8B4513'],
              }}
              price={{
                original: 100000,
                discount: 90000,
                discountRate: 10,
              }}
              save={{
                isSaved: false,
                onToggle: () => {},
                count: 0,
              }}
              link={{
                href: 'https://google.com',
                onClick: () => {},
              }}
              enableWholeCardLink={true}
            />
          </div>
        </div> */}
        <CurationSection groupId={groupId} />
      </div>
    </div>
  );
};

export default CurationResult;
