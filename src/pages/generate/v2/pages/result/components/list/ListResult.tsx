import { useGenerateListResultQuery } from '@pages/generate/v2/apis/queries/useGenerateListResultQuery';
import { useRelatedImagesQuery } from '@pages/generate/v2/apis/queries/useRelatedImagesQuery';
import { useSimilarItemsQuery } from '@pages/generate/v2/apis/queries/useSimilarItemsQuery';

import ListProductCard from '@/shared/components/v2/productCard/ListProductCard';
import ProductCard from '@/shared/components/v2/productCard/ProductCard';
import StyleCard from '@/shared/components/v2/styleCard/StyleCard';

import GeneratedImg from './imgSection/GeneratedImg';
import * as styles from './ListResult.css';

import type { ResultImageMeta } from '../../types';

export interface ListResultProps {
  image: ResultImageMeta;
}

const ListResult = ({ image }: ListResultProps) => {
  const { data: listData } = useGenerateListResultQuery(image.imageId);
  const { data: similarData } = useSimilarItemsQuery(image.imageId);
  const { data: relatedData } = useRelatedImagesQuery(image.imageId);

  const selectedProducts = listData?.products ?? [];
  const similarProducts = similarData?.products ?? [];
  const userName = relatedData?.name ?? '';
  const includedImages = (relatedData?.images ?? []).filter(
    (item) => item.resultType === 'LIST' || item.resultType === 'RECOMMEND'
  );

  return (
    <div className={styles.root}>
      <GeneratedImg image={image} />
      <div className={styles.mainArea}>
        <div className={styles.section}>
          <h1 className={styles.sectionTitle}>선택한 상품</h1>
          <div className={styles.flexContent}>
            {selectedProducts.map((item) => (
              <ListProductCard
                key={item.id}
                cardSize="m"
                product={{
                  title: item.name!,
                  imageUrl: item.imageUrl!,
                  colorHexes: (item.colors ?? []).map((color) => color.value!),
                }}
                price={{
                  original: item.originalPrice!,
                  discount: item.finalPrice!,
                  discountRate: item.discountRate!,
                }}
                save={{
                  isSaved: item.isLiked!,
                  onToggle: () => {},
                }}
                link={{
                  href: item.linkUrl!,
                  onClick: () => {},
                }}
                enableWholeCardLink={true}
              />
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <h1 className={styles.sectionTitle}>
            방금 담은 스타일과 비슷한 상품
          </h1>
          <div className={styles.gridContent}>
            {similarProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={{
                  brand: item.brand!,
                  title: item.name!,
                  imageUrl: item.imageUrl!,
                  colorHexes: (item.colors ?? []).map((color) => color.value!),
                }}
                price={{
                  original: item.originalPrice!,
                  discount: item.finalPrice!,
                  discountRate: item.discountRate!,
                }}
                save={{
                  isSaved: item.isLiked!,
                  onToggle: () => {},
                  count: item.jjymCount!,
                }}
                link={{
                  href: item.linkUrl!,
                  onClick: () => {},
                }}
                enableWholeCardLink={true}
              />
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <h1 className={styles.sectionTitle}>
            {userName}님이 고른 아이템이 포함된 이미지
          </h1>
          <div className={styles.gridContent}>
            {includedImages.map((item) => (
              <StyleCard key={item.id} imageSrc={item.imageUrl!} size="s" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListResult;
