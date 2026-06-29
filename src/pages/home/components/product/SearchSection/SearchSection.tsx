import { useCallback, useMemo, useRef } from 'react';

import { overlay } from 'overlay-kit';

import ProductDetailOverlay from '@pages/home/components/product/ProductPopup/ProductDetailOverlay';
import RecommendSection from '@pages/home/components/product/RecommendSection/RecommendSection';
import { useProductHeaderScroll } from '@pages/home/hooks/useProductHeaderScroll';
import { useProductSearch } from '@pages/home/hooks/useProductSearch';
import type {
  AppliedFilterChip,
  ProductFilterChipCategory,
  SelectedProduct,
} from '@pages/home/types/productTab';

import IconButton from '@shared/components/v2/button/IconButton';
import EmptyView from '@shared/components/v2/emptyView/EmptyView';
import ProductCard from '@shared/components/v2/productCard/ProductCard';
import SearchBar from '@shared/components/v2/textField/SearchBar';
import { EMPTY_VIEW_TEXT } from '@shared/constants/emptyViewText';

import InlineError from '@components/inlineError/InlineError';
import Loading from '@components/loading/Loading';
import Chip from '@components/v2/chip/Chip';

import type { ProductListQueryVariables } from '@constants/queryKey';

import Icon from '@/shared/components/v2/icon/Icon';

import * as styles from './SearchSection.css';

interface SearchSectionProps {
  chipSelected: Record<ProductFilterChipCategory, boolean>;
  onFilterChipClick: (category: ProductFilterChipCategory) => void;
  appliedFilterChips: AppliedFilterChip[];
  onAppliedFilterChipRemove: (
    category: ProductFilterChipCategory,
    id: string
  ) => void;
  selectedProductIds: number[];
  onSelectProduct: (product: SelectedProduct) => void;
  productListQueryParams: ProductListQueryVariables;
}

const SearchSection = ({
  chipSelected,
  onFilterChipClick,
  appliedFilterChips,
  onAppliedFilterChipRemove,
  selectedProductIds,
  onSelectProduct,
  productListQueryParams,
}: SearchSectionProps) => {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const filterListRef = useRef<HTMLDivElement>(null);
  const { isFilterSticky, showStickySearchBar, showScrollTopFloatingButton } =
    useProductHeaderScroll({ searchBarRef, filterListRef });

  const {
    loadMoreRef,
    keyword,
    products,
    recommendedProducts,
    isRecommended,
    showEmptyState,
    isPending,
    isError,
    refetch,
    handleSearchKeywordChange,
  } = useProductSearch(productListQueryParams);

  const handleFilterChipCategoryClick = useCallback(
    (category: ProductFilterChipCategory) => {
      onFilterChipClick(category);
    },
    [onFilterChipClick]
  );

  const handleAppliedFilterChipRemoveClick = useCallback(
    (category: ProductFilterChipCategory, id: string) => {
      onAppliedFilterChipRemove(category, id);
    },
    [onAppliedFilterChipRemove]
  );

  const handleSaveToggleNoop = useCallback(() => {}, []);

  const handleSelectProduct = useCallback(
    (product: SelectedProduct) => {
      onSelectProduct(product);
    },
    [onSelectProduct]
  );

  const handleScrollToTopClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filterChips = useMemo(
    () =>
      appliedFilterChips.map(({ category, id, label, applied }) =>
        applied ? (
          <Chip
            key={`${category}-${id}`}
            selected
            onClick={() => handleFilterChipCategoryClick(category)}
            suffixIcon={<Icon name="Close" size="12" />}
            suffixAriaLabel={`${label} 필터 해제`}
            onSuffixClick={() =>
              handleAppliedFilterChipRemoveClick(category, id)
            }
          >
            {label}
          </Chip>
        ) : (
          <Chip
            key={`${category}-${id}`}
            selected={chipSelected[category]}
            onClick={() => handleFilterChipCategoryClick(category)}
            suffixIcon={<Icon name="ChevronDown" size="12" />}
          >
            {label}
          </Chip>
        )
      ),
    [
      appliedFilterChips,
      chipSelected,
      handleAppliedFilterChipRemoveClick,
      handleFilterChipCategoryClick,
    ]
  );

  return (
    <section className={styles.section}>
      {isFilterSticky ? (
        <div className={styles.stickyHeader}>
          <div
            className={`${styles.stickySearchBarWrap} ${
              showStickySearchBar ? styles.stickySearchBarWrapVisible : ''
            }`}
          >
            <div className={styles.searchBarContainer}>
              <SearchBar value={keyword} onChange={handleSearchKeywordChange} />
            </div>
          </div>
          <div className={styles.filterList}>
            <div className={styles.filterScroll}>{filterChips}</div>
          </div>
        </div>
      ) : null}
      <div className={styles.searchHeader}>
        <div ref={searchBarRef} className={styles.searchBarContainer}>
          <SearchBar value={keyword} onChange={handleSearchKeywordChange} />
        </div>
        <div ref={filterListRef} className={styles.filterList}>
          <div className={styles.filterScroll}>{filterChips}</div>
        </div>
      </div>
      {isPending || isError || showEmptyState ? (
        <div className={styles.productListFallback}>
          {isPending ? (
            <div className={styles.productListState}>
              <Loading inline />
            </div>
          ) : isError ? (
            <div className={styles.productListState}>
              <InlineError
                message={EMPTY_VIEW_TEXT.searchSection.loadError}
                onRetry={refetch}
              />
            </div>
          ) : (
            <>
              <EmptyView
                title={EMPTY_VIEW_TEXT.searchSection.empty}
                description={EMPTY_VIEW_TEXT.searchSection.emptyDescription}
                imageAlt="필터 결과 없음"
              />
              {isRecommended ? (
                <>
                  <div className={styles.recommendDivider} role="separator" />
                  <RecommendSection
                    products={recommendedProducts}
                    selectedProductIds={selectedProductIds}
                    onSelectProduct={handleSelectProduct}
                  />
                </>
              ) : null}
            </>
          )}
        </div>
      ) : (
        <div className={styles.productList}>
          {products.map(
            ({
              id,
              title,
              brand,
              imageUrl,
              discountRate,
              originalPrice,
              discountPrice,
              colorHexes,
              saveCount,
              linkUrl,
            }) => {
              const isSelected = selectedProductIds.includes(id);
              const cardProduct = {
                title,
                brand,
                imageUrl,
                colorHexes,
              };
              const cardPrice = {
                original: originalPrice,
                discountRate,
                discount: discountPrice,
              };
              const cardSave = {
                isSaved: false as const,
                onToggle: handleSaveToggleNoop,
                count: saveCount,
              };
              const cardLink = { href: linkUrl };
              const cardShoppingAction = {
                label: isSelected ? '선택됨' : '선택',
                disabled: isSelected,
                onClick: () =>
                  handleSelectProduct({
                    id,
                    title,
                    brand,
                    imageUrl,
                    originalPrice,
                    discountPrice,
                    discountRate,
                  }),
              };

              return (
                <ProductCard
                  key={id}
                  cardType="shopping"
                  product={cardProduct}
                  price={cardPrice}
                  save={cardSave}
                  link={cardLink}
                  shoppingAction={cardShoppingAction}
                  onShoppingViewDetailClick={() => {
                    overlay.open(({ unmount }) => (
                      <ProductDetailOverlay
                        unmount={unmount}
                        id={id}
                        link={cardLink}
                        price={cardPrice}
                        product={cardProduct}
                        save={cardSave}
                        shoppingAction={cardShoppingAction}
                      />
                    ));
                  }}
                />
              );
            }
          )}
          <div ref={loadMoreRef} />
        </div>
      )}

      <div className={styles.scrollTopFloatingLayer}>
        <div
          className={`${styles.scrollTopFloatingWrap} ${
            showScrollTopFloatingButton
              ? styles.scrollTopFloatingWrapVisible
              : ''
          }`}
        >
          <IconButton
            name="ArrowUp"
            size="S"
            className={styles.scrollTopFloatingButton}
            aria-label="페이지 상단으로 이동"
            onClick={handleScrollToTopClick}
          />
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
