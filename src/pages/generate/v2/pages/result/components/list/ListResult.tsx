import type { GenerateImageData } from '@pages/generate/types/generate';

import ListProductCard from '@/shared/components/v2/productCard/ListProductCard';
import ProductCard from '@/shared/components/v2/productCard/ProductCard';
import StyleCard from '@/shared/components/v2/styleCard/StyleCard';

import GeneratedImg from './imgSection/GeneratedImg';
import * as styles from './ListResult.css';

export interface ListResultProps {
  image: GenerateImageData;
}

interface ProductColor {
  name: string;
  value: string;
}

interface ResultProductItem {
  id: number;
  brand?: string;
  name: string;
  imageUrl: string;
  originalPrice: number;
  discountRate: number;
  finalPrice: number;
  linkUrl: string;
  colors: ProductColor[];
  isLiked: boolean;
  likeCount: number;
}

type ResultImageType = 'LIST' | 'RECOMMEND';

interface IncludedImageItem {
  id: number;
  imageUrl: string;
  resultType: ResultImageType[];
}

const MOCK_LIST_RESULT_RESPONSE = {
  code: 200,
  msg: '응답 성공',
  data: {
    imageId: 1,
    imageUrl: 'https://google.com',
    isMirror: true,
    products: [
      {
        id: 1,
        brand: '리샘',
        name: '리샘 코지 저상형 평상형 무헤드 침대(SS/Q) 매트리스 선택',
        imageUrl:
          'https://ecimg.cafe24img.com/pg593b88108200032/janiz/web/product/medium/20251230/11f26a365f13f703e9c0fd609d543786.png',
        originalPrice: 39900,
        discountRate: 30,
        finalPrice: 27990,
        linkUrl: 'https://google.com',
        colors: [{ name: '브라운', value: '#8B4513' }],
        isLiked: true,
        likeCount: 128,
      },
      {
        id: 2,
        brand: '프리모',
        name: '편안한 프리모 메쉬 사무용 책상의자 2type 3color',
        imageUrl:
          'https://ecimg.cafe24img.com/pg593b88108200032/janiz/web/product/medium/20251230/161eb114c13782e15f73284c6d8f6132.png',
        originalPrice: 54900,
        discountRate: 10,
        finalPrice: 49410,
        linkUrl: 'https://google.com',
        colors: [{ name: '네이비', value: '#1B2A4A' }],
        isLiked: false,
        likeCount: 74,
      },
      {
        id: 3,
        brand: '스탠드리빙',
        name: '스탠드형 테이프 클리너 세트',
        imageUrl:
          'https://ecimg.cafe24img.com/pg593b88108200032/janiz/web/product/medium/20251230/303f29457b3e58fb3629eadad9dcdbd2.png',
        originalPrice: 142029,
        discountRate: 0,
        finalPrice: 142029,
        linkUrl: 'https://google.com',
        colors: [{ name: '베이지', value: '#D9C7A3' }],
        isLiked: false,
        likeCount: 31,
      },
      {
        id: 4,
        brand: '모노',
        name: '모노 미니 밥솥 3인용',
        imageUrl:
          'https://ecimg.cafe24img.com/pg593b88108200032/janiz/web/product/medium/20251230/11f26a365f13f703e9c0fd609d543786.png',
        originalPrice: 89800,
        discountRate: 50,
        finalPrice: 44900,
        linkUrl: 'https://google.com',
        colors: [{ name: '그레이', value: '#7A7A7A' }],
        isLiked: true,
        likeCount: 212,
      },
    ] as ResultProductItem[],
  },
};

const MOCK_SIMILAR_PRODUCTS_RESPONSE = {
  code: 200,
  msg: '응답 성공',
  data: {
    products: [
      {
        id: 101,
        brand: '브랜드명은 최대 한 줄 까지 쓸 수 있어요.',
        name: '상품명은 최대 두 줄까지 쓸 수 있어요. 상품명은 최대 두 줄까지 쓸 수 있어요.',
        imageUrl: 'https://picsum.photos/seed/similar-1/500/500',
        originalPrice: 100000,
        discountRate: 10,
        finalPrice: 90000,
        linkUrl: 'https://google.com',
        colors: [{ name: '브라운', value: '#8B4513' }],
        isLiked: true,
        likeCount: 503,
      },
      {
        id: 102,
        brand: '브랜드명은 최대 한 줄 까지 쓸 수 있어요.',
        name: '상품명은 최대 두 줄까지 쓸 수 있어요. 상품명은 최대 두 줄까지 쓸 수 있어요.',
        imageUrl: 'https://picsum.photos/seed/similar-2/500/500',
        originalPrice: 100000,
        discountRate: 10,
        finalPrice: 90000,
        linkUrl: 'https://google.com',
        colors: [{ name: '브라운', value: '#8B4513' }],
        isLiked: true,
        likeCount: 271,
      },
      {
        id: 103,
        brand: '브랜드명은 최대 한 줄 까지 쓸 수 있어요.',
        name: '상품명은 최대 두 줄까지 쓸 수 있어요. 상품명은 최대 두 줄까지 쓸 수 있어요.',
        imageUrl: 'https://picsum.photos/seed/similar-3/500/500',
        originalPrice: 120000,
        discountRate: 15,
        finalPrice: 102000,
        linkUrl: 'https://google.com',
        colors: [{ name: '브라운', value: '#8B4513' }],
        isLiked: false,
        likeCount: 89,
      },
      {
        id: 104,
        brand: '브랜드명은 최대 한 줄 까지 쓸 수 있어요.',
        name: '상품명은 최대 두 줄까지 쓸 수 있어요. 상품명은 최대 두 줄까지 쓸 수 있어요.',
        imageUrl: 'https://picsum.photos/seed/similar-4/500/500',
        originalPrice: 89000,
        discountRate: 5,
        finalPrice: 84550,
        linkUrl: 'https://google.com',
        colors: [{ name: '브라운', value: '#8B4513' }],
        isLiked: true,
        likeCount: 1440,
      },
    ] as ResultProductItem[],
  },
};

const MOCK_INCLUDED_IMAGES_RESPONSE = {
  code: 200,
  msg: '응답 성공',
  data: {
    name: '최윤아',
    images: [
      {
        id: 1,
        imageUrl: 'https://picsum.photos/seed/included-1/500/500',
        resultType: ['LIST', 'RECOMMEND'],
      },
      {
        id: 2,
        imageUrl: 'https://picsum.photos/seed/included-2/500/500',
        resultType: ['LIST', 'RECOMMEND'],
      },
      {
        id: 3,
        imageUrl: 'https://picsum.photos/seed/included-3/500/500',
        resultType: ['LIST', 'RECOMMEND'],
      },
      {
        id: 4,
        imageUrl: 'https://picsum.photos/seed/included-4/500/500',
        resultType: ['LIST', 'RECOMMEND'],
      },
    ] as IncludedImageItem[],
  },
};

const ListResult = ({ image }: ListResultProps) => {
  const selectedProducts = MOCK_LIST_RESULT_RESPONSE.data.products;
  const similarProducts = MOCK_SIMILAR_PRODUCTS_RESPONSE.data.products;
  const userName = MOCK_INCLUDED_IMAGES_RESPONSE.data.name;
  const includedImages = MOCK_INCLUDED_IMAGES_RESPONSE.data.images.filter(
    (item) =>
      item.resultType.includes('LIST') || item.resultType.includes('RECOMMEND')
  );

  return (
    <div className={styles.root}>
      <GeneratedImg image={image} />
      <div className={styles.mainArea}>
        <div className={styles.section}>
          <h1 className={styles.sectionTitle}>선택한 상품</h1>
          <div className={styles.flexContent}>
            {selectedProducts.map((item) => (
              <ListProductCard
                key={item.id}
                cardSize="m"
                product={{
                  brand: item.brand,
                  title: item.name,
                  imageUrl: item.imageUrl,
                  colorHexes: item.colors.map((color) => color.value),
                }}
                price={{
                  original: item.originalPrice,
                  discount: item.finalPrice,
                  discountRate: item.discountRate,
                }}
                save={{
                  isSaved: item.isLiked,
                  onToggle: () => {},
                  count: item.likeCount,
                }}
                link={{
                  href: item.linkUrl,
                  onClick: () => {},
                }}
                enableWholeCardLink={true}
              />
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <h1 className={styles.sectionTitle}>
            방금 담은 스타일과 비슷한 상품
          </h1>
          <div className={styles.gridContent}>
            {similarProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={{
                  brand: item.brand,
                  title: item.name,
                  imageUrl: item.imageUrl,
                  colorHexes: item.colors.map((color) => color.value),
                }}
                price={{
                  original: item.originalPrice,
                  discount: item.finalPrice,
                  discountRate: item.discountRate,
                }}
                save={{
                  isSaved: item.isLiked,
                  onToggle: () => {},
                  count: item.likeCount,
                }}
                link={{
                  href: item.linkUrl,
                  onClick: () => {},
                }}
                enableWholeCardLink={true}
              />
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <h1 className={styles.sectionTitle}>
            {userName}님이 고른 아이템이 포함된 이미지
          </h1>
          <div className={styles.gridContent}>
            {includedImages.map((item) => (
              <StyleCard key={item.id} imageSrc={item.imageUrl} size="s" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListResult;
