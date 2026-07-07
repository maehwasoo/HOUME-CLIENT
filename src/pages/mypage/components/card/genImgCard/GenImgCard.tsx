import { useNavigate } from 'react-router-dom';

import { logMyPageClickBtnFurnitureCard } from '@pages/mypage/utils/analytics';

import { ROUTES } from '@routes/paths';

import { useSavedItemsStore } from '@store/useSavedItemsStore';

import type { UsedProductResponse } from '@apis/__generated__/data-contracts';
import { useJjymMutation } from '@apis/mutations/useJjymMutation';

import emptyImage from '@assets/v2/images/ImgEmpty.png';

import OptimizedImage from '@components/image/OptimizedImage';
import TextButton from '@components/v2/btnText/TextButton';
import ListProductCard from '@components/v2/productCard/ListProductCard';

import * as styles from './GenImgCard.css';

interface GenImgCardProps {
  cardType?: 'list' | 'curation';
  productSummaryText?: string | null;
  imageId: number;
  imageUrl?: string;
  isMirror?: boolean;
  usedProducts?: UsedProductResponse[];
  onCurationClick?: () => void;
  onImageLoad?: (imageId: number, imageUrl?: string) => void;
}

const GenImgCard = ({
  cardType = 'list',
  productSummaryText,
  imageId,
  imageUrl,
  isMirror = false,
  usedProducts = [],
  onCurationClick,
  onImageLoad,
}: GenImgCardProps) => {
  const isListType = cardType === 'list';
  const navigate = useNavigate();
  const savedProductIds = useSavedItemsStore((state) => state.savedProductIds);
  const touchedProductIds = useSavedItemsStore(
    (state) => state.touchedProductIds
  );

  const handleImageLoad = () => {
    onImageLoad?.(imageId, imageUrl);
  };

  // 찜 토글
  const { mutate: toggleJjym } = useJjymMutation({
    savedToastType: 'stored',
    onSavedAction: () => {
      navigate(ROUTES.MYPAGE, { state: { activeTab: 'savedItems' } });
    },
  });

  const handleToggleSave = (id: number) => {
    toggleJjym(id);
  };

  return (
    <div className={styles.wrapper}>
      <section
        className={styles.textContainer}
        role="button"
        tabIndex={0}
        onClick={onCurationClick}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && onCurationClick) {
            e.preventDefault();
            onCurationClick();
          }
        }}
      >
        <span className={styles.headingText}>{productSummaryText}</span>
        <TextButton
          color="secondary"
          size="s"
          rightIcon={'ArrowRight'}
          onClick={(e) => {
            e.stopPropagation();
            onCurationClick?.();
          }}
        >
          더보기
        </TextButton>
      </section>
      <section className={styles.imgContainer} onClick={onCurationClick}>
        <OptimizedImage
          src={imageUrl || emptyImage}
          fallbackSrc={emptyImage}
          alt={productSummaryText ?? '생성 이미지'}
          className={styles.cardImg({ mirrored: isMirror })}
          placeholder="skeleton"
          onLoad={handleImageLoad}
        />
      </section>

      {isListType && (
        <section className={styles.listCardContainer}>
          {usedProducts.map((item) => {
            if (item.rawProductId == null) return null;
            const isSaved = touchedProductIds.has(item.rawProductId)
              ? savedProductIds.has(item.rawProductId)
              : (item.isJjym ?? false);

            return (
              <ListProductCard
                key={item.rawProductId}
                cardSize="s"
                product={{
                  title: item.productName ?? '',
                  imageUrl: item.productImageUrl ?? '',
                }}
                price={{
                  original: item.listPrice ?? 0,
                  discount: item.discountPrice ?? 0,
                  discountRate: item.discountRate ?? 0,
                }}
                save={{
                  isSaved,
                  onToggle: () => handleToggleSave(item.rawProductId!),
                }}
                link={{
                  href: item.productSiteUrl ?? '',
                  onClick: logMyPageClickBtnFurnitureCard,
                }}
                enableWholeCardLink={true}
              />
            );
          })}
        </section>
      )}
    </div>
  );
};
export default GenImgCard;
