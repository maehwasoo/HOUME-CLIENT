import type { PriceInfo, ProductInfo } from '@shared/types/productCard';

// 로그인 게이트로 ProductDetailOverlay가 닫힌 채 복귀할 때, 그 상품 모달을 다시 띄우기 위한 정보
// 리스트(검색/필터/무한스크롤) 상태에 의존하지 않도록 모달 재구성에 필요한 데이터를 통째로 보관
export interface ReopenProduct {
  id: number;
  product: ProductInfo;
  price?: PriceInfo;
  linkHref?: string;
}

const STORAGE_KEY = 'productDetailOverlayReopen';

/**
 * 로그인 게이트로 모달이 닫히기 직전 저장
 * 카카오 OAuth는 window.location.href로 전체 리로드되어 React 상태가 소멸하므로 sessionStorage 사용
 */
export const setReopenProduct = (data: ReopenProduct): void => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/**
 * 저장된 재오픈 정보를 읽고 삭제 (없으면 null)
 */
export const consumeReopenProduct = (): ReopenProduct | null => {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ReopenProduct;
  } catch {
    return null;
  }
};
