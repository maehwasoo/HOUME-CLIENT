import { useNavigate } from 'react-router-dom';

import { useGenerateListResultQuery } from '@pages/generate/v2/apis/queries/useGenerateListResultQuery';
import { useRelatedImagesQuery } from '@pages/generate/v2/apis/queries/useRelatedImagesQuery';
import { useSimilarItemsQuery } from '@pages/generate/v2/apis/queries/useSimilarItemsQuery';
import { useFunnelStore } from '@pages/imageSetup/stores/useFunnelStore';

import { ROUTES } from '@routes/paths';

import { ENTRY_ROUTE, useImageFlowStore } from '@store/useImageFlowStore';
import { useSavedItemsStore } from '@store/useSavedItemsStore';

import ActionButton from '@shared/components/v2/button/actionButton/ActionButton';

import { useJjymMutation } from '@apis/mutations/useJjymMutation';

import ListProductCard from '@/shared/components/v2/productCard/ListProductCard';
import ProductCard from '@/shared/components/v2/productCard/ProductCard';
import StyleCard from '@/shared/components/v2/styleCard/StyleCard';

import GeneratedImg from './imgSection/GeneratedImg';
import * as styles from './ListResult.css';
import { toProductItem } from '../../utils/toProductItem';

import type { ResultImageMeta } from '../../types';

const getGenerateResultPath = (houseId: number, viewType: string) =>
  `${ROUTES.GENERATE_RESULT}?${new URLSearchParams({
    houseId: String(houseId),
    viewType,
  })}`;

export interface ListResultProps {
  image: ResultImageMeta;
  isProductView: boolean;
}

const ListResult = ({ image, isProductView }: ListResultProps) => {
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

  // '상품 다시 선택하기' 클릭 핸들러
  // - listData.products → ProductItem[] 매핑 (상품 탭 바텀시트의 '선택한 상품' 카드용 타입)
  // - useFunnelStore.reset()으로 (혹시나) 남아있는 floorPlan 데이터 제거
  // - setFlow({ PRODUCT_SELECTION, { productIds, productsToBeRestored } })
  // - navigate(HOME, state.activeTab='product') → HomePage가 상품 탭 활성, ProductTab이 useState 초기값으로 복원
  const handleReselectProducts = () => {
    // toProductItem이 product.id! 단언으로 변환하므로 id 누락 항목은 여기서 필터해서 productIds에 undefined가 섞이지 않도록 보호
    const mapped = selectedProducts
      .filter((p) => p.id != null)
      .map(toProductItem);
    if (mapped.length === 0) return;

    useFunnelStore.getState().reset();
    useImageFlowStore.getState().setFlow({
      entryRoute: ENTRY_ROUTE.PRODUCT_SELECTION,
      preset: {
        type: 'product',
        productIds: mapped.map((p) => p.id),
        productsToBeRestored: mapped,
      },
    });

    navigate(ROUTES.HOME, { state: { activeTab: 'product' } });
  };

  return (
    <div className={styles.root}>
      <GeneratedImg image={image} />
      <div className={styles.mainArea}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h1 className={styles.sectionTitle}>선택한 상품</h1>
            {isProductView && (
              <ActionButton
                size="S"
                leftIcon="RefreshStrokeWhite"
                onClick={handleReselectProducts}
              >
                다시 선택하기
              </ActionButton>
            )}
          </div>
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
