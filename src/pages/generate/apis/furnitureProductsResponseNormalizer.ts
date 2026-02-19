import type {
  FurnitureProductInfo,
  FurnitureProductsInfoResponse,
} from '@pages/generate/types/furniture';

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord => {
  return typeof value === 'object' && value !== null;
};

const toOptionalNumber = (value: unknown) => {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'string' && value.trim() === '') return undefined;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : undefined;
};

const toStringOrEmpty = (value: unknown) => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return '';
};

const toStringArray = (value: unknown) => {
  if (!Array.isArray(value)) return undefined;

  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean);
};

const toRecordArray = (value: unknown): UnknownRecord[] => {
  if (!Array.isArray(value)) return [];
  return value.filter(isRecord);
};

const toOptionalProductId = (value: unknown): number | string | undefined => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined;
  }

  if (typeof value === 'string') {
    const normalized = value.trim();
    return normalized.length > 0 ? normalized : undefined;
  }

  return undefined;
};

const getSourceProducts = (payload: UnknownRecord): UnknownRecord[] => {
  if (Array.isArray(payload.products)) {
    return toRecordArray(payload.products);
  }

  const directNaver = toRecordArray(payload.naverProducts);
  const directRaw = toRecordArray(payload.rawProducts);
  if (directNaver.length > 0 || directRaw.length > 0) {
    return [...directNaver, ...directRaw];
  }

  if (!isRecord(payload.products)) {
    return [];
  }

  const nestedNaver = toRecordArray(payload.products.naverProducts);
  const nestedRaw = toRecordArray(payload.products.rawProducts);
  return [...nestedNaver, ...nestedRaw];
};

const normalizeProduct = (product: UnknownRecord): FurnitureProductInfo => {
  const listPrice =
    toOptionalNumber(product.listPrice) ??
    toOptionalNumber(product.furnitureProductOriginalPrice);
  const discountRate =
    toOptionalNumber(product.discountRate) ??
    toOptionalNumber(product.furnitureProductDiscountRate);
  const discountPrice =
    toOptionalNumber(product.discountPrice) ??
    toOptionalNumber(product.furnitureProductDiscountPrice);
  const jjymCount =
    toOptionalNumber(product.jjymCount) ??
    toOptionalNumber(product.furnitureProductSaveCount);

  const colors = toStringArray(product.colors);
  const clientColors = toStringArray(product.clientColors);
  const furnitureProductColorHexes = toStringArray(
    product.furnitureProductColorHexes
  );

  return {
    id: toOptionalNumber(product.id),
    baseFurnitureImageUrl:
      toStringOrEmpty(product.baseFurnitureImageUrl) ||
      toStringOrEmpty(product.furnitureProductImageUrl),
    furnitureProductImageUrl:
      toStringOrEmpty(product.furnitureProductImageUrl) ||
      toStringOrEmpty(product.baseFurnitureImageUrl),
    furnitureProductSiteUrl: toStringOrEmpty(product.furnitureProductSiteUrl),
    furnitureProductName: toStringOrEmpty(product.furnitureProductName),
    furnitureProductMallName: toStringOrEmpty(product.furnitureProductMallName),
    furnitureProductId: toOptionalProductId(product.furnitureProductId),
    similarity: toOptionalNumber(product.similarity) ?? 0,
    furnitureProductOriginalPrice: listPrice,
    furnitureProductDiscountPrice: discountPrice,
    furnitureProductDiscountRate: discountRate,
    furnitureProductColorHexes,
    furnitureProductSaveCount: jjymCount,
    colors,
    clientColors,
    listPrice,
    discountRate,
    discountPrice,
    brandName: toStringOrEmpty(product.brandName) || undefined,
    jjymCount,
  };
};

export const normalizeFurnitureProductsResponse = (
  payload: unknown
): FurnitureProductsInfoResponse => {
  if (!isRecord(payload)) {
    return {
      userName: '',
      products: [],
    };
  }

  return {
    userName: toStringOrEmpty(payload.userName),
    products: getSourceProducts(payload).map(normalizeProduct),
  };
};
