import { useState } from 'react';

import type { UsedProductResponse } from '@apis/__generated__/data-contracts';

import TestImage from '@assets/v2/images/TestImg.png';

import { logMyPageClickBtnFurnitureCard } from '@/pages/mypage/utils/analytics';
import { useJjymMutation } from '@/shared/apis/mutations/useJjymMutation';
import TextButton from '@/shared/components/v2/btnText/TextButton';
import ListProductCard from '@/shared/components/v2/productCard/ListProductCard';

import * as styles from './GenImgCard.css';

interface GenImgCardProps {
  cardType?: 'list' | 'curation';
  productSummaryText?: string | null;
  imageId: number;
  imageUrl?: string;
  isMirror?: boolean;
  usedProducts?: UsedProductResponse[];
  isLoaded?: boolean;
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
  isLoaded = false,
  onCurationClick,
  onImageLoad,
}: GenImgCardProps) => {
  const isListType = cardType === 'list';
  const [isImageReady, setIsImageReady] = useState(isLoaded); // 이미지 로드 완료 여부

  const handleImageLoad = () => {
    setIsImageReady(true);
    onImageLoad?.(imageId, imageUrl);
  };

  // 찜 토글
  const { mutate: toggleJjym } = useJjymMutation();

  const handleToggleSave = (id: number) => {
    toggleJjym(id);
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.textContainer} onClick={onCurationClick}>
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
      <section className={styles.imgContainer}>
        {/* 이미지 로드 완료 전에는 skeleton, 완료 시 실제 이미지 렌더링 */}
        {!isImageReady && <div className={styles.skeleton} />}
        <img
          src={imageUrl || TestImage}
          alt={productSummaryText ?? '생성 이미지'}
          className={styles.cardImg({ mirrored: isMirror })}
          onLoad={handleImageLoad}
        />
      </section>

      {isListType && (
        <section className={styles.listCardContainer}>
          {usedProducts.map((item) => {
            if (item.rawProductId == null) return null;
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
                  isSaved: item.isJjym ?? false,
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
