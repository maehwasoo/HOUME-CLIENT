import { useMemo } from 'react';

import { useProductDetailQuery } from '@pages/home/apis/queries/useProductDetailQuery';

import type { ProductColorDetail } from '@shared/apis/__generated__/data-contracts';
import Popup from '@shared/components/v2/popup/Popup';
import type {
  LinkInfo,
  PriceInfo,
  ProductInfo,
  SaveInfo,
} from '@shared/types/productCard';

import ProductDetailCard from './ProductDetailCard';

interface ProductDetailOverlayProps {
  unmount: () => void;
  detailProductId: number;
  product: ProductInfo;
  price?: PriceInfo;
  save: SaveInfo;
  link?: LinkInfo;
  shoppingAction?: {
    label?: string;
    onClick: () => void;
    disabled?: boolean;
  };
}

const ProductDetailOverlay = ({
  unmount,
  detailProductId,
  product: listProduct,
  price: listPrice,
  save,
  link,
  shoppingAction,
}: ProductDetailOverlayProps) => {
  const { data } = useProductDetailQuery(detailProductId);
  const detail = data?.product;

  const merged = useMemo(() => {
    const detailColorHexes =
      detail?.colors
        ?.map((colorDetail: ProductColorDetail) => colorDetail.value)
        .filter((colorHex): colorHex is string => Boolean(colorHex)) ?? [];

    const product: ProductInfo = {
      title: detail?.name ?? listProduct.title,
      brand: detail?.brand ?? listProduct.brand,
      imageUrl: detail?.imageUrl ?? listProduct.imageUrl,
      colorHexes:
        detailColorHexes.length > 0 ? detailColorHexes : listProduct.colorHexes,
    };

    const price: PriceInfo | undefined = detail
      ? {
          original: detail.originalPrice ?? listPrice?.original,
          discount: detail.finalPrice ?? listPrice?.discount,
          discountRate: detail.discountRate ?? listPrice?.discountRate,
        }
      : listPrice;

    const linkHrefOverride = detail?.linkUrl ?? link?.href;

    return { product, price, linkHrefOverride };
  }, [detail, link?.href, listPrice, listProduct]);

  const isSaved = detail?.isLiked ?? save.isSaved;

  return (
    <Popup
      btnStyle="solid"
      btnText={shoppingAction?.label ?? '선택'}
      confirmDisabled={shoppingAction?.disabled}
      onClose={unmount}
      onCancel={save.onToggle}
      onConfirm={() => {
        shoppingAction?.onClick();
        unmount();
      }}
      showCloseButton
      sideIconName={isSaved ? 'HeartFillGray' : 'HeartStrokeGray'}
      content={
        <ProductDetailCard
          product={merged.product}
          price={merged.price}
          saveCount={save.count}
          link={link}
          linkHrefOverride={merged.linkHrefOverride}
        />
      }
    />
  );
};

export default ProductDetailOverlay;
