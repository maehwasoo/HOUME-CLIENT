import { useMemo } from 'react';

import { useProductDetailQuery } from '@pages/home/apis/queries/useProductDetailQuery';

import { useSavedItemsStore } from '@store/useSavedItemsStore';

import type { ProductColorDetail } from '@shared/apis/__generated__/data-contracts';
import Popup from '@shared/components/v2/popup/Popup';
import type {
  LinkInfo,
  PriceInfo,
  ProductInfo,
  SaveInfo,
} from '@shared/types/productCard';

import { useJjymMutation } from '@apis/mutations/useJjymMutation';

import ProductDetailCard from './ProductDetailCard';

interface ProductDetailOverlayProps {
  unmount: () => void;
  id: number;
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
  id,
  product: listProduct,
  price: listPrice,
  save,
  link,
  shoppingAction,
}: ProductDetailOverlayProps) => {
  const { data } = useProductDetailQuery(id);
  const detail = data?.product;
  const { mutate: toggleJjym } = useJjymMutation();
  const savedProductIds = useSavedItemsStore((s) => s.savedProductIds);

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

    const saveCount =
      detail != null
        ? detail.jjymCount
        : save.count != null && save.count > 0
          ? save.count
          : undefined;

    return { product, price, linkHrefOverride, saveCount };
  }, [detail, link?.href, listPrice, listProduct, save.count]);

  const isSaved = savedProductIds.has(id);

  const handleSaveToggle = () => {
    toggleJjym(id);
  };

  return (
    <Popup
      btnStyle="solid"
      btnText={shoppingAction?.label ?? '선택'}
      confirmDisabled={shoppingAction?.disabled}
      onClose={unmount}
      onCancel={handleSaveToggle}
      onConfirm={() => {
        shoppingAction?.onClick();
        unmount();
      }}
      showCloseButton
      sideIconName={isSaved ? 'HeartFillColor' : 'HeartStrokeGray'}
      content={
        <ProductDetailCard
          product={merged.product}
          price={merged.price}
          saveCount={merged.saveCount}
          link={link}
          linkHrefOverride={merged.linkHrefOverride}
        />
      }
    />
  );
};

export default ProductDetailOverlay;
