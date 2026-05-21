import { useNavigate } from 'react-router-dom';

import { useGenerateListResultQuery } from '@pages/generate/v2/apis/queries/useGenerateListResultQuery';
import { useRelatedImagesQuery } from '@pages/generate/v2/apis/queries/useRelatedImagesQuery';
import { useSimilarItemsQuery } from '@pages/generate/v2/apis/queries/useSimilarItemsQuery';

import { ROUTES } from '@routes/paths';

import { useSavedItemsStore } from '@store/useSavedItemsStore';

import { useJjymMutation } from '@apis/mutations/useJjymMutation';

import ListProductCard from '@/shared/components/v2/productCard/ListProductCard';
import ProductCard from '@/shared/components/v2/productCard/ProductCard';
import StyleCard from '@/shared/components/v2/styleCard/StyleCard';

import GeneratedImg from './imgSection/GeneratedImg';
import * as styles from './ListResult.css';

import type { ResultImageMeta } from '../../types';

const getGenerateResultPath = (houseId: number, viewType: string) =>
  `${ROUTES.GENERATE_RESULT}?${new URLSearchParams({
    houseId: String(houseId),
    viewType,
  })}`;

export interface ListResultProps {
  image: ResultImageMeta;
}

const ListResult = ({ image }: ListResultProps) => {
  const navigate = useNavigate();
  const { data: listData } = useGenerateListResultQuery(image.imageId);
  const { data: similarData } = useSimilarItemsQuery(image.imageId);
  const { data: relatedData } = useRelatedImagesQuery(image.imageId);

  const selectedProducts = listData?.products ?? [];
  const similarProducts = similarData?.products ?? [];
  const userName = relatedData?.name ?? '';
  const includedImages = (relatedData?.images ?? []).filter(
    (item) => item.resultType === 'LIST' || item.resultType === 'RECOMMEND'
  );
  const { mutate: toggleJjym } = useJjymMutation();
  const savedProductIds = useSavedItemsStore((s) => s.savedProductIds);

  return (
    <div className={styles.root}>
      <GeneratedImg image={image} />
      <div className={styles.mainArea}>
        <div className={styles.section}>
          <h1 className={styles.sectionTitle}>선택한 상품</h1>
          <div className={styles.flexContent}>
            {selectedProducts.map((item) => {
              const id = item.id;
              if (id == null) return null;

              const href = item.linkUrl ?? '';

              return (
                <ListProductCard
                  key={id}
                  cardSize="m"
                  product={{
                    title: item.name!,
                    imageUrl: item.imageUrl!,
                    colorHexes: (item.colors ?? []).map(
                      (color) => color.value!
                    ),
                  }}
                  price={{
                    original: item.originalPrice!,
                    discount: item.finalPrice!,
                    discountRate: item.discountRate!,
                  }}
                  save={{
                    isSaved: savedProductIds.has(id),
                    onToggle: () => toggleJjym(id),
                  }}
                  link={{
                    href,
                    onClick: () =>
                      href &&
                      window.open(href, '_blank', 'noopener,noreferrer'),
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.section}>
          <h1 className={styles.sectionTitle}>
            방금 담은 스타일과 비슷한 상품
          </h1>
          <div className={styles.gridContent}>
            {similarProducts.map((item) => {
              const id = item.id;
              if (id == null) return null;

              const href = item.linkUrl ?? '';

              return (
                <ProductCard
                  key={id}
                  product={{
                    brand: item.brand!,
                    title: item.name!,
                    imageUrl: item.imageUrl!,
                    colorHexes: (item.colors ?? []).map(
                      (color) => color.value!
                    ),
                  }}
                  price={{
                    original: item.originalPrice!,
                    discount: item.finalPrice!,
                    discountRate: item.discountRate!,
                  }}
                  save={{
                    isSaved: savedProductIds.has(id),
                    onToggle: () => toggleJjym(id),
                    count: item.jjymCount!,
                  }}
                  link={{
                    href,
                    onClick: () =>
                      href &&
                      window.open(href, '_blank', 'noopener,noreferrer'),
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.section}>
          <h1 className={styles.sectionTitle}>
            {userName}님이 고른 아이템이 포함된 이미지
          </h1>
          <div className={styles.gridContent}>
            {includedImages.map((item) => (
              <StyleCard
                key={item.id}
                imageSrc={item.imageUrl!}
                size="s"
                onClick={() => {
                  if (item.id == null || item.resultType == null) return;

                  navigate(getGenerateResultPath(item.id, item.resultType), {
                    state: { imageUrl: item.imageUrl },
                  });
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListResult;
