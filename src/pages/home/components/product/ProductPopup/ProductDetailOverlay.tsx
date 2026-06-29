import { useEffect, useMemo, useRef } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useProductDetailQuery } from '@pages/home/apis/queries/useProductDetailQuery';
import { setReopenProduct } from '@pages/home/utils/productDetailOverlayReopen';

import { ROUTES } from '@routes/paths';

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
  const navigate = useNavigate();
  const { data, isPending } = useProductDetailQuery(id);
  const detail = data?.product;
  const { mutate: toggleJjym } = useJjymMutation({
    onSavedAction: () => {
      navigate(ROUTES.MYPAGE, { state: { activeTab: 'savedItems' } });
    },
  });
  const getSavedState = useSavedItemsStore((s) => s.getSavedState);
  const location = useLocation();
  const openedPathRef = useRef(location.pathname);

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

  // nav effect가 매 렌더 새 merged 객체 때문에 재구독되지 않도록 최신값을 ref로 읽음
  const mergedRef = useRef(merged);
  mergedRef.current = merged;

  const isSaved = getSavedState(id, detail?.isLiked ?? save.isSaved);

  const handleSaveToggle = () => {
    toggleJjym(id);
  };

  // 라우트가 바뀌면(ex: 로그인 게이트) 상품상세 오버레이 닫기
  // overlay-kit은 라우트 변경 시 자동으로 닫히지 않으므로 직접 unmount
  useEffect(() => {
    if (location.pathname === openedPathRef.current) return;

    // 로그인 게이트 플로우로 진입하는 경우 복귀 후 이 상품 모달을 다시 띄우기 위해 정보 저장
    if (location.pathname === ROUTES.LOGIN) {
      const { product, price, linkHrefOverride } = mergedRef.current;
      setReopenProduct({ id, product, price, linkHref: linkHrefOverride });
    }
    unmount();
  }, [location.pathname, unmount, id]);

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
          isLoading={isPending}
        />
      }
    />
  );
};

export default ProductDetailOverlay;
