/**
 * 상품 탭 메인 API 쿼리 파라미터와 동일한 형태
 * - 추후 실제 API 연동 시 이 타입을 그대로 요청 파라미터 타입으로 재사용할 수 있다.
 */
interface ProductMainQueryParams {
  keyword?: string;
  types?: number[];
  minPrice?: number;
  maxPrice?: number;
  colors?: number[];
  cursor?: number;
  size?: number;
}

/**
 * 서버 응답의 meta.appliedFilters 아이템
 * category가 color일 때만 value(hex code)를 포함한다.
 */
interface AppliedFilter {
  category: 'type' | 'price' | 'color';
  id: string;
  label: string;
  value?: string;
}

/**
 * 서버의 data.products 단일 아이템 스키마
 * 실제 API 문서 필드명을 유지해 매핑 비용을 줄인다.
 */
interface ProductMainItem {
  id: number;
  productId: number;
  categoryName: string;
  source: string;
  brand: string | null;
  name: string;
  imageUrl: string;
  originalPrice: number;
  discountRate: number;
  finalPrice: number;
  mallName: string | null;
  linkUrl: string;
  colorHexes: string[];
}

/**
 * 상품 탭 조회/검색 공용 응답 스키마
 * message 대신 msg를 사용하는 현재 백엔드 응답 규격을 맞춘다.
 */
interface ProductMainResponse {
  code: number;
  msg: string;
  data: {
    products: ProductMainItem[];
    meta: {
      nextCursor: number | null;
      hasNext: boolean;
      appliedFilters: AppliedFilter[];
    };
  };
}

/**
 * 목데이터 내부 전용 필드
 * - typeId/colorIds는 서버 응답에는 없고 필터링 계산을 위해서만 사용한다.
 */
interface InternalProduct extends ProductMainItem {
  typeId: number;
  colorIds: number[];
}

export interface SearchSectionProductCardItem {
  id: string;
  title: string;
  brand: string;
  imageUrl: string;
  discountRate: number;
  originalPrice: number;
  discountPrice: number;
  colorHexes: string[];
  saveCount: number;
  linkUrl: string;
}

// 필터 칩 노출용 typeId -> 라벨 매핑
const TYPE_LABELS: Record<number, string> = {
  1: '침대/프레임',
  2: '의자/스툴',
  3: '수납/장식장',
  4: '소파',
  5: '조명',
};

// 색상 필터 및 카드 컬러칩 표시에 공통으로 사용하는 메타
const COLOR_META: Record<number, { label: string; hex: string }> = {
  1: { label: '화이트', hex: '#FFFFFF' },
  2: { label: '그레이', hex: '#8E959E' },
  3: { label: '블랙', hex: '#1B1E22' },
  4: { label: '베이지', hex: '#D4C4B0' },
  5: { label: '브라운', hex: '#5C4033' },
};

/**
 * 목 상품 원본 풀
 * - id는 내림차순 정렬 기준이므로 큰 값이 최신으로 간주된다.
 * - typeId/colorIds는 필터 계산용 내부 속성이다.
 * - imageUrl은 기존 SearchSection에서 사용하던 목 이미지들을 재사용한다.
 */
const PRODUCTS: Omit<InternalProduct, 'colorHexes'>[] = [
  {
    id: 630,
    productId: 370,
    categoryName: '수납/장식장',
    source: 'soozip',
    brand: '자니즈',
    name: '심플리 수납장 16color',
    imageUrl:
      'https://i.pinimg.com/736x/a9/62/30/a9623026cd4d93af383b4c5f59d5a86a.jpg',
    originalPrice: 2090000,
    discountRate: 0,
    finalPrice: 2090000,
    mallName: 'SOOZIP',
    linkUrl:
      'https://soozip.co.kr/product/%EC%8B%AC%ED%94%8C%EB%A6%AC-%EC%88%98%EB%82%A9%EC%9E%A5-16color/370/category/75/display/1/',
    typeId: 3,
    colorIds: [1, 4, 5],
  },
  {
    id: 629,
    productId: 3003,
    categoryName: '침대/프레임',
    source: 'naver',
    brand: '모던하우스',
    name: '내추럴 원목 퀸 침대 프레임',
    imageUrl:
      'https://i.pinimg.com/1200x/65/cf/44/65cf44b71f3d3092b68fb034ad24fb90.jpg',
    originalPrice: 120000,
    discountRate: 20,
    finalPrice: 96000,
    mallName: '오늘의집',
    linkUrl: 'https://ohou.se/productions/3003',
    typeId: 1,
    colorIds: [1, 5],
  },
  {
    id: 628,
    productId: 4210,
    categoryName: '침대/프레임',
    source: 'naver',
    brand: '이케아',
    name: 'MALM 높은 침대프레임 블랙브라운',
    imageUrl:
      'https://i.pinimg.com/1200x/85/ac/e7/85ace7a04cbb367063e97cba14839bd4.jpg',
    originalPrice: 249000,
    discountRate: 10,
    finalPrice: 224100,
    mallName: 'IKEA 공식몰',
    linkUrl: 'https://www.ikea.com/kr/ko/p/4210',
    typeId: 1,
    colorIds: [3, 5],
  },
  {
    id: 627,
    productId: 5210,
    categoryName: '의자/스툴',
    source: 'soozip',
    brand: 'TABLE LAB',
    name: '모던 체어',
    imageUrl:
      'https://i.pinimg.com/1200x/a5/d9/b7/a5d9b7fcd0dd6f8bf645194ac96e1f5b.jpg',
    originalPrice: 340000,
    discountRate: 15,
    finalPrice: 289000,
    mallName: 'SOOZIP',
    linkUrl: 'https://soozip.co.kr/product/chair/5210',
    typeId: 2,
    colorIds: [4, 5],
  },
  {
    id: 626,
    productId: 9301,
    categoryName: '소파',
    source: 'naver',
    brand: 'LIVING STUDIO',
    name: '코지 패브릭 2인 소파',
    imageUrl:
      'https://i.pinimg.com/1200x/39/a3/5e/39a35eb09726363b73c7972ac91b61e7.jpg',
    originalPrice: 624000,
    discountRate: 20,
    finalPrice: 499000,
    mallName: '오늘의집',
    linkUrl: 'https://ohou.se/productions/9301',
    typeId: 4,
    colorIds: [1, 4],
  },
  {
    id: 625,
    productId: 1112,
    categoryName: '조명',
    source: 'naver',
    brand: 'LIGHTER',
    name: '무드 스탠드 조명',
    imageUrl:
      'https://i.pinimg.com/1200x/02/88/5a/02885ae1b6ccc1ae06521fbd3982892b.jpg',
    originalPrice: 94000,
    discountRate: 5,
    finalPrice: 89000,
    mallName: '네이버쇼핑',
    linkUrl: 'https://shopping.naver.com/products/1112',
    typeId: 5,
    colorIds: [3, 4],
  },
  {
    id: 624,
    productId: 7771,
    categoryName: '조명',
    source: 'naver',
    brand: 'LIGHTER',
    name: '골드 메탈 펜던트 조명',
    imageUrl:
      'https://i.pinimg.com/736x/d9/4b/93/d94b93371e360e14a8e693749c4408a8.jpg',
    originalPrice: 127000,
    discountRate: 22,
    finalPrice: 99000,
    mallName: '네이버쇼핑',
    linkUrl: 'https://shopping.naver.com/products/7771',
    typeId: 5,
    colorIds: [2, 3],
  },
  {
    id: 623,
    productId: 7772,
    categoryName: '수납/장식장',
    source: 'soozip',
    brand: 'RUGROOM',
    name: '우드 수납 라탄 바스켓 세트',
    imageUrl:
      'https://i.pinimg.com/736x/36/bb/a7/36bba7025c4907223e8bd47bf25acd8d.jpg',
    originalPrice: 99000,
    discountRate: 40,
    finalPrice: 59000,
    mallName: 'SOOZIP',
    linkUrl: 'https://soozip.co.kr/product/storage/7772',
    typeId: 3,
    colorIds: [4, 2],
  },
  {
    id: 622,
    productId: 7773,
    categoryName: '수납/장식장',
    source: 'naver',
    brand: 'WALLSET',
    name: '월 선반 세트',
    imageUrl:
      'https://i.pinimg.com/736x/29/13/51/291351b55807526727e53a4a3d0453a2.jpg',
    originalPrice: 47000,
    discountRate: 18,
    finalPrice: 39000,
    mallName: '네이버쇼핑',
    linkUrl: 'https://shopping.naver.com/products/7773',
    typeId: 3,
    colorIds: [1, 5],
  },
  {
    id: 621,
    productId: 7774,
    categoryName: '침대/프레임',
    source: 'naver',
    brand: 'BEDDING LAB',
    name: '코튼 침구 세트',
    imageUrl:
      'https://i.pinimg.com/1200x/cb/7a/1d/cb7a1d203af17e14752165d50244a20e.jpg',
    originalPrice: 90000,
    discountRate: 12,
    finalPrice: 79000,
    mallName: '오늘의집',
    linkUrl: 'https://ohou.se/productions/7774',
    typeId: 1,
    colorIds: [1, 4],
  },
  {
    id: 620,
    productId: 7775,
    categoryName: '수납/장식장',
    source: 'soozip',
    brand: 'BASKETRY',
    name: '핸드메이드 라탄 바스켓',
    imageUrl:
      'https://i.pinimg.com/736x/d5/ed/d2/d5edd2d6b6a7955f91e41b9433d9852d.jpg',
    originalPrice: 68000,
    discountRate: 28,
    finalPrice: 49000,
    mallName: 'SOOZIP',
    linkUrl: 'https://soozip.co.kr/product/storage/7775',
    typeId: 3,
    colorIds: [4, 5],
  },
  {
    id: 619,
    productId: 7776,
    categoryName: '의자/스툴',
    source: 'naver',
    brand: 'MODERN CASA',
    name: '미니멀 오피스 체어',
    imageUrl:
      'https://i.pinimg.com/736x/da/2c/ae/da2cae9be8e292baa2dc1243f2f84775.jpg',
    originalPrice: 245000,
    discountRate: 35,
    finalPrice: 159000,
    mallName: '네이버쇼핑',
    linkUrl: 'https://shopping.naver.com/products/7776',
    typeId: 2,
    colorIds: [2, 3],
  },
];

const DEFAULT_SIZE = 20;

/**
 * 가격 필터 메타 생성기
 * - min/max 모두 있으면 "X원 - Y원"
 * - min만 있으면 "X원 이상"
 * - 미지정이면 appliedFilters에 price를 추가하지 않음
 */
const buildPriceFilter = (
  minPrice: number | undefined,
  maxPrice: number | undefined
): AppliedFilter[] => {
  const hasMin = typeof minPrice === 'number' && minPrice > 0;
  const hasMax = typeof maxPrice === 'number' && Number.isFinite(maxPrice);
  if (!hasMin && !hasMax) return [];

  const normalizedMin = hasMin ? minPrice : 0;
  const normalizedMax = hasMax ? maxPrice : null;
  const label =
    normalizedMax === null
      ? `${normalizedMin.toLocaleString()}원 이상`
      : `${normalizedMin.toLocaleString()}원 - ${normalizedMax.toLocaleString()}원`;
  const id =
    normalizedMax === null
      ? `P_MIN_${normalizedMin}`
      : `P_${normalizedMin}_${normalizedMax}`;

  return [{ category: 'price', id, label }];
};

// ProductCard 컬러칩 렌더링용 hex 배열 변환
const getColorHexes = (colorIds: number[]): string[] =>
  colorIds
    .map((colorId) => COLOR_META[colorId]?.hex)
    .filter((hex): hex is string => typeof hex === 'string');

export const getMockProductMainResponse = (
  params: ProductMainQueryParams = {}
): ProductMainResponse => {
  const keyword = params.keyword?.trim().toLowerCase() ?? '';
  const types = params.types ?? [];
  const colors = params.colors ?? [];
  const size = params.size ?? DEFAULT_SIZE;
  const minPrice = params.minPrice;
  const maxPrice = params.maxPrice;

  /**
   * 실제 API와 유사하게 다중 조건을 AND로 누적 적용
   * - keyword: 상품명/브랜드 부분 일치
   * - types: typeId 포함
   * - price: finalPrice 기준 범위
   * - colors: 하나라도 겹치면 통과(OR)
   */
  const filtered = PRODUCTS.filter((product) => {
    if (keyword.length > 0) {
      const searchable = `${product.name} ${product.brand ?? ''}`.toLowerCase();
      if (!searchable.includes(keyword)) return false;
    }
    if (types.length > 0 && !types.includes(product.typeId)) return false;
    if (
      typeof minPrice === 'number' &&
      Number.isFinite(minPrice) &&
      product.finalPrice < minPrice
    ) {
      return false;
    }
    if (
      typeof maxPrice === 'number' &&
      Number.isFinite(maxPrice) &&
      product.finalPrice > maxPrice
    ) {
      return false;
    }
    if (
      colors.length > 0 &&
      !product.colorIds.some((colorId) => colors.includes(colorId))
    ) {
      return false;
    }
    return true;
  }).sort((a, b) => b.id - a.id);

  const cursor = params.cursor;
  const cursorFiltered =
    typeof cursor === 'number'
      ? filtered.filter((product) => product.id < cursor)
      : filtered;

  /**
   * 커서 페이지네이션 규칙
   * - cursor가 있으면 "id < cursor" 구간만 조회
   * - hasNext는 현재 커서 구간에서 size 초과 여부로 판단
   * - nextCursor는 현재 페이지 마지막 상품의 id
   */
  const page = cursorFiltered.slice(0, size);
  const hasNext = cursorFiltered.length > size;
  const nextCursor = hasNext ? (page[page.length - 1]?.id ?? null) : null;

  const typeFilters: AppliedFilter[] = types
    .map((typeId) => ({
      category: 'type' as const,
      id: String(typeId),
      label: TYPE_LABELS[typeId] ?? `타입 ${typeId}`,
    }))
    .filter((filter) => filter.label.length > 0);

  const priceFilter = buildPriceFilter(minPrice, maxPrice);

  const colorFilters: AppliedFilter[] = colors.flatMap((colorId) => {
    const color = COLOR_META[colorId];
    if (!color) return [];
    return [
      {
        category: 'color' as const,
        id: String(colorId),
        label: color.label,
        value: color.hex,
      },
    ];
  });

  return {
    code: 200,
    msg: '응답 성공',
    data: {
      products: page.map(({ typeId: _typeId, colorIds, ...rest }) => ({
        ...rest,
        colorHexes: getColorHexes(colorIds),
      })),
      meta: {
        nextCursor,
        hasNext,
        appliedFilters: [...typeFilters, ...priceFilter, ...colorFilters],
      },
    },
  };
};

export const toSearchSectionProducts = (
  response: ProductMainResponse
): SearchSectionProductCardItem[] =>
  /**
   * API 응답 스키마 -> SearchSection 카드 뷰 모델 매퍼
   * - id는 selectedProductIds 비교를 위해 string으로 통일
   * - finalPrice -> discountPrice로 전달
   * - colorHexes는 내부 원본(PRODUCTS)에서 역조회해 채운다
   */
  response.data.products.map((product) => ({
    id: String(product.id),
    title: product.name,
    brand: product.brand ?? '',
    imageUrl: product.imageUrl,
    discountRate: product.discountRate,
    originalPrice: product.originalPrice,
    discountPrice: product.finalPrice,
    colorHexes: product.colorHexes,
    saveCount: 0,
    linkUrl: product.linkUrl,
  }));
