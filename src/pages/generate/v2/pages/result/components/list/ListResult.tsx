import { useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

import { useGenerateListResultQuery } from '@pages/generate/v2/apis/queries/useGenerateListResultQuery';
import { useRelatedImagesQuery } from '@pages/generate/v2/apis/queries/useRelatedImagesQuery';
import { useSimilarItemsQuery } from '@pages/generate/v2/apis/queries/useSimilarItemsQuery';
import { useFunnelStore } from '@pages/imageSetup/stores/useFunnelStore';

import { ROUTES } from '@routes/paths';

import { ENTRY_ROUTE, useImageFlowStore } from '@store/useImageFlowStore';
import { useSavedItemsStore } from '@store/useSavedItemsStore';

import ActionButton from '@shared/components/v2/button/actionButton/ActionButton';
import EmptyView from '@shared/components/v2/emptyView/EmptyView';
import { EMPTY_VIEW_TEXT } from '@shared/constants/emptyViewText';

import { useJjymMutation } from '@apis/mutations/useJjymMutation';

import InlineError from '@components/inlineError/InlineError';
import Loading from '@components/loading/Loading';

import ListProductCard from '@/shared/components/v2/productCard/ListProductCard';
import ProductCard from '@/shared/components/v2/productCard/ProductCard';
import StyleCard from '@/shared/components/v2/styleCard/StyleCard';

import GeneratedImg from './imgSection/GeneratedImg';
import * as styles from './ListResult.css';
import { toProductItem } from '../../utils/toProductItem';

import type { ResultImageMeta } from '../../types';

type SectionDisplayState =
  | 'loading'
  | 'error'
  | 'empty'
  | 'partial'
  | 'content';

const getSectionDisplayState = ({
  isLoading,
  isError,
  rawCount,
  renderableCount,
}: {
  isLoading: boolean;
  isError: boolean;
  rawCount: number;
  renderableCount: number;
}): SectionDisplayState => {
  if (isLoading) return 'loading';
  if (isError) return 'error';
  if (renderableCount > 0) return 'content';
  if (rawCount > 0) return 'partial';
  return 'empty';
};

const getGenerateResultPath = (houseId: number, viewType: string) =>
  `${ROUTES.GENERATE_RESULT}?${new URLSearchParams({
    houseId: String(houseId),
    viewType,
  })}`;

export interface ListResultProps {
  image: ResultImageMeta;
  isProductView: boolean;
}

interface SectionFallbackProps {
  state: SectionDisplayState;
  loadErrorMessage: string;
  partialMessage: string;
  emptyMessage?: string;
  emptyDescription?: string;
  partialDescription?: string;
  onRetry?: () => void;
  slotClassName: string;
}

const SectionFallback = ({
  state,
  loadErrorMessage,
  partialMessage,
  emptyMessage,
  emptyDescription,
  partialDescription,
  onRetry,
  slotClassName,
}: SectionFallbackProps) => {
  if (state === 'content') return null;

  if (state === 'loading') {
    return (
      <div className={slotClassName}>
        <Loading inline />
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className={slotClassName}>
        <InlineError
          message={loadErrorMessage}
          onRetry={
            onRetry
              ? () => {
                  void onRetry();
                }
              : undefined
          }
        />
      </div>
    );
  }

  const title =
    state === 'partial' ? partialMessage : (emptyMessage ?? partialMessage);
  const description =
    state === 'partial' ? partialDescription : emptyDescription;

  return (
    <div className={slotClassName}>
      <EmptyView title={title} description={description} />
    </div>
  );
};

const ListResult = ({ image, isProductView }: ListResultProps) => {
  const navigate = useNavigate();

  const {
    data: listData,
    isLoading: isSelectedLoading,
    isError: isSelectedError,
    refetch: refetchSelected,
  } = useGenerateListResultQuery(image.imageId);

  const {
    data: similarData,
    isLoading: isSimilarLoading,
    isError: isSimilarError,
    refetch: refetchSimilar,
  } = useSimilarItemsQuery(image.imageId);

  const {
    data: relatedData,
    isLoading: isRelatedLoading,
    isError: isRelatedError,
    refetch: refetchRelated,
  } = useRelatedImagesQuery(image.imageId);

  const selectedProductsRaw = useMemo(
    () => listData?.products ?? [],
    [listData?.products]
  );
  const similarProductsRaw = useMemo(
    () => similarData?.products ?? [],
    [similarData?.products]
  );
  const relatedImagesRaw = useMemo(
    () => relatedData?.images ?? [],
    [relatedData?.images]
  );

  const renderableSelectedProducts = useMemo(
    () => selectedProductsRaw.filter((product) => product.id != null),
    [selectedProductsRaw]
  );

  const renderableSimilarProducts = useMemo(
    () => similarProductsRaw.filter((product) => product.id != null),
    [similarProductsRaw]
  );

  const renderableRelatedImages = useMemo(
    () =>
      relatedImagesRaw.filter(
        (relatedImage) =>
          relatedImage.id != null &&
          relatedImage.resultType != null &&
          (relatedImage.resultType === 'LIST' ||
            relatedImage.resultType === 'RECOMMEND') &&
          Boolean(relatedImage.imageUrl?.trim())
      ),
    [relatedImagesRaw]
  );

  const selectedState = getSectionDisplayState({
    isLoading: isSelectedLoading,
    isError: isSelectedError,
    rawCount: selectedProductsRaw.length,
    renderableCount: renderableSelectedProducts.length,
  });

  const similarState = getSectionDisplayState({
    isLoading: isSimilarLoading,
    isError: isSimilarError,
    rawCount: similarProductsRaw.length,
    renderableCount: renderableSimilarProducts.length,
  });

  const relatedState = getSectionDisplayState({
    isLoading: isRelatedLoading,
    isError: isRelatedError,
    rawCount: relatedImagesRaw.length,
    renderableCount: renderableRelatedImages.length,
  });

  const userName = relatedData?.name?.trim() ?? '';
  const relatedTitle = userName
    ? EMPTY_VIEW_TEXT.listResult.related.titleWithName(userName)
    : EMPTY_VIEW_TEXT.listResult.related.titleFallback;

  const { mutate: toggleJjym } = useJjymMutation({
    onSavedAction: () => {
      navigate(ROUTES.MYPAGE, { state: { activeTab: 'savedItems' } });
    },
  });
  const getSavedState = useSavedItemsStore((s) => s.getSavedState);

  const handleReselectProducts = () => {
    const mapped = selectedProductsRaw
      .filter((product) => product.id != null)
      .map(toProductItem);

    if (mapped.length === 0) {
      navigate(ROUTES.HOME, { state: { activeTab: 'product' } });
      return;
    }

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

  const showSimilarSection = similarState !== 'empty';
  const showRelatedSection = relatedState !== 'empty';

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
                disabled={selectedState === 'loading'}
                onClick={handleReselectProducts}
              >
                다시 선택하기
              </ActionButton>
            )}
          </div>
          <div className={styles.flexContent}>
            <SectionFallback
              state={selectedState}
              loadErrorMessage={EMPTY_VIEW_TEXT.listResult.selected.loadError}
              emptyMessage={EMPTY_VIEW_TEXT.listResult.selected.empty}
              emptyDescription={
                EMPTY_VIEW_TEXT.listResult.selected.emptyDescription
              }
              partialMessage={EMPTY_VIEW_TEXT.listResult.selected.partial}
              partialDescription={
                EMPTY_VIEW_TEXT.listResult.selected.partialDescription
              }
              onRetry={refetchSelected}
              slotClassName={styles.listLoadingSlot}
            />
            {selectedState === 'content'
              ? renderableSelectedProducts.map((item) => {
                  const id = item.id!;
                  const href = item.linkUrl?.trim() ?? '';

                  return (
                    <ListProductCard
                      key={id}
                      cardSize="m"
                      enableWholeCardLink={Boolean(href)}
                      product={{
                        title: item.name ?? '',
                        imageUrl: item.imageUrl ?? '',
                        colorHexes: (item.colors ?? [])
                          .map((color) => color.value)
                          .filter((value): value is string => Boolean(value)),
                      }}
                      price={{
                        original: item.originalPrice,
                        discount: item.finalPrice,
                        discountRate: item.discountRate,
                      }}
                      save={{
                        isSaved: getSavedState(id, item.isLiked),
                        onToggle: () => toggleJjym(id),
                      }}
                      link={href ? { href } : undefined}
                    />
                  );
                })
              : null}
          </div>
        </div>

        {showSimilarSection ? (
          <div className={styles.section}>
            <h1 className={styles.sectionTitle}>
              방금 담은 스타일과 비슷한 상품
            </h1>
            <div className={styles.gridContent}>
              <SectionFallback
                state={similarState}
                loadErrorMessage={EMPTY_VIEW_TEXT.listResult.similar.loadError}
                partialMessage={EMPTY_VIEW_TEXT.listResult.similar.partial}
                partialDescription={
                  EMPTY_VIEW_TEXT.listResult.similar.partialDescription
                }
                onRetry={refetchSimilar}
                slotClassName={styles.gridLoadingSlot}
              />
              {similarState === 'content'
                ? renderableSimilarProducts.map((item) => {
                    const id = item.id!;
                    const href = item.linkUrl?.trim() ?? '';

                    return (
                      <ProductCard
                        key={id}
                        enableWholeCardLink={Boolean(href)}
                        product={{
                          brand: item.brand ?? '',
                          title: item.name ?? '',
                          imageUrl: item.imageUrl ?? '',
                          colorHexes: (item.colors ?? [])
                            .map((color) => color.value)
                            .filter((value): value is string => Boolean(value)),
                        }}
                        price={{
                          original: item.originalPrice,
                          discount: item.finalPrice,
                          discountRate: item.discountRate,
                        }}
                        save={{
                          isSaved: getSavedState(id, item.isLiked),
                          onToggle: () => toggleJjym(id),
                          count: item.jjymCount,
                        }}
                        link={href ? { href } : undefined}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        ) : null}

        {showRelatedSection ? (
          <div className={styles.section}>
            <h1 className={styles.sectionTitle}>{relatedTitle}</h1>
            <div className={styles.gridContent}>
              <SectionFallback
                state={relatedState}
                loadErrorMessage={EMPTY_VIEW_TEXT.listResult.related.loadError}
                partialMessage={EMPTY_VIEW_TEXT.listResult.related.partial}
                partialDescription={
                  EMPTY_VIEW_TEXT.listResult.related.partialDescription
                }
                onRetry={refetchRelated}
                slotClassName={styles.gridLoadingSlot}
              />
              {relatedState === 'content'
                ? renderableRelatedImages.map((item) => (
                    <StyleCard
                      key={item.id}
                      imageSrc={item.imageUrl!}
                      size="s"
                      onClick={() => {
                        if (item.id == null || item.resultType == null) return;

                        navigate(
                          getGenerateResultPath(item.id, item.resultType),
                          {
                            state: { imageUrl: item.imageUrl },
                          }
                        );
                      }}
                    />
                  ))
                : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ListResult;
