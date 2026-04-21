import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import Chip from '@components/v2/chip/Chip';

import * as styles from './ProductFilterSheet.css';

const ALL = 'ALL';
const PRODUCT_FILTERS_MOCK_RESPONSE = {
  code: 200,
  msg: '응답 성공',
  data: {
    furnitureTypes: [
      { id: 1, nameKr: '침대/프레임', nameEng: 'BED' },
      { id: 2, nameKr: '업무용 책상', nameEng: 'DESK' },
      { id: 3, nameKr: '식탁', nameEng: 'DINING' },
      { id: 4, nameKr: '좌식 테이블', nameEng: 'FLOOR_TABLE' },
      { id: 5, nameKr: '옷장', nameEng: 'WARDROBE' },
      { id: 6, nameKr: '수납/장식장', nameEng: 'STORAGE' },
      { id: 7, nameKr: '소파', nameEng: 'SOFA' },
      { id: 8, nameKr: '의자/스툴', nameEng: 'CHAIR' },
      { id: 9, nameKr: '화장대/협탁', nameEng: 'VANITY' },
      { id: 10, nameKr: '조명', nameEng: 'LIGHT' },
      { id: 11, nameKr: '그 외', nameEng: 'OTHER' },
    ],
    priceRanges: [
      { id: 'P1', label: '5만원 이하', min: 0, max: 50000 },
      { id: 'P2', label: '5-10만원', min: 50000, max: 100000 },
      { id: 'P3', label: '10만원대', min: 100000, max: 199999 },
      { id: 'P4', label: '20만원대', min: 200000, max: 299999 },
      { id: 'P5', label: '30만원대', min: 300000, max: 399999 },
      { id: 'P6', label: '40만원대', min: 400000, max: 499999 },
      { id: 'P7', label: '50만원 이상', min: 500000, max: null },
    ],
    colors: [
      { id: 1, label: '블랙', value: '#000000' },
      { id: 2, label: '화이트', value: '#FFFFFF' },
      { id: 3, label: '그레이', value: '#8E959E' },
      { id: 4, label: '베이지', value: '#D4C4B0' },
      { id: 5, label: '실버', value: '#C8CDD2' },
      { id: 6, label: '골드', value: '#D4AF37' },
      { id: 7, label: '브라운', value: '#5C4033' },
      { id: 8, label: '레드', value: '#E53935' },
      { id: 9, label: '오렌지', value: '#FB8C00' },
      { id: 10, label: '옐로우', value: '#FDD835' },
      { id: 11, label: '그린', value: '#43A047' },
      { id: 12, label: '블루', value: '#1E88E5' },
      { id: 13, label: '네이비', value: '#1A237E' },
      { id: 14, label: '바이올렛', value: '#7E57C2' },
      { id: 15, label: '핑크', value: '#EC407A' },
    ],
  },
} as const;

const FURNITURE_OPTIONS: { id: string; label: string }[] = [
  { id: ALL, label: '전체' },
  ...PRODUCT_FILTERS_MOCK_RESPONSE.data.furnitureTypes.map((type) => ({
    id: String(type.id),
    label: type.nameKr,
  })),
];

const PRICE_OPTIONS: { id: string; label: string }[] = [
  { id: ALL, label: '전체' },
  ...PRODUCT_FILTERS_MOCK_RESPONSE.data.priceRanges.map((range) => ({
    id: range.id,
    label: range.label,
  })),
];

const COLOR_OPTIONS: { id: string; label: string; value?: string }[] = [
  { id: ALL, label: '전체' },
  ...PRODUCT_FILTERS_MOCK_RESPONSE.data.colors.map((color) => ({
    id: String(color.id),
    label: color.label,
    value: color.value,
  })),
];

const INITIAL_SELECTION: string[] = [ALL];

// 섹션 내 다중 선택 - ALL만 있으면 ‘전체’, 그 외는 선택된 id 목록
function toggleSectionSelection(current: string[], id: string): string[] {
  if (id === ALL) {
    return [ALL];
  }
  const withoutAll = current.filter((x) => x !== ALL);
  const has = withoutAll.includes(id);
  const next = has ? withoutAll.filter((x) => x !== id) : [...withoutAll, id];
  return next.length === 0 ? [ALL] : next;
}

export interface ProductFilterValues {
  furnitureTypeIds: string[];
  priceRangeIds: string[];
  colorIds: string[];
}

export interface ProductFilterSheetRef {
  reset: () => void;
  getValues: () => ProductFilterValues;
  setValues: (values: ProductFilterValues) => void;
}

const ProductFilterSheet = forwardRef<ProductFilterSheetRef>(
  function ProductFilterSheet(_props, ref) {
    const [furnitureTypeIds, setFurnitureTypeIds] =
      useState<string[]>(INITIAL_SELECTION);
    const [priceRangeIds, setPriceRangeIds] =
      useState<string[]>(INITIAL_SELECTION);
    const [colorIds, setColorIds] = useState<string[]>(INITIAL_SELECTION);

    const reset = useCallback(() => {
      setFurnitureTypeIds([...INITIAL_SELECTION]);
      setPriceRangeIds([...INITIAL_SELECTION]);
      setColorIds([...INITIAL_SELECTION]);
    }, []);

    const getValues = useCallback((): ProductFilterValues => {
      return {
        furnitureTypeIds: [...furnitureTypeIds],
        priceRangeIds: [...priceRangeIds],
        colorIds: [...colorIds],
      };
    }, [furnitureTypeIds, priceRangeIds, colorIds]);

    const setValues = useCallback((values: ProductFilterValues) => {
      setFurnitureTypeIds(
        values.furnitureTypeIds.length > 0
          ? [...values.furnitureTypeIds]
          : [...INITIAL_SELECTION]
      );
      setPriceRangeIds(
        values.priceRangeIds.length > 0
          ? [...values.priceRangeIds]
          : [...INITIAL_SELECTION]
      );
      setColorIds(
        values.colorIds.length > 0
          ? [...values.colorIds]
          : [...INITIAL_SELECTION]
      );
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        reset,
        getValues,
        setValues,
      }),
      [reset, getValues, setValues]
    );

    const handleFurnitureChipClick = useCallback((id: string) => {
      setFurnitureTypeIds((prev) => toggleSectionSelection(prev, id));
    }, []);

    const handlePriceChipClick = useCallback((id: string) => {
      setPriceRangeIds((prev) => toggleSectionSelection(prev, id));
    }, []);

    const handleColorChipClick = useCallback((id: string) => {
      setColorIds((prev) => toggleSectionSelection(prev, id));
    }, []);

    return (
      <div className={styles.root}>
        <section
          className={styles.section}
          aria-labelledby="filter-furniture-heading"
        >
          <h2 id="filter-furniture-heading" className={styles.sectionTitle}>
            카테고리
          </h2>
          <div className={styles.chipGroup} role="group" aria-label="카테고리">
            {FURNITURE_OPTIONS.map(({ id, label }) => (
              <Chip
                key={id}
                selected={furnitureTypeIds.includes(id)}
                onClick={() => handleFurnitureChipClick(id)}
              >
                {label}
              </Chip>
            ))}
          </div>
        </section>

        <section
          className={styles.section}
          aria-labelledby="filter-price-heading"
        >
          <h2 id="filter-price-heading" className={styles.sectionTitle}>
            가격대
          </h2>
          <div className={styles.chipGroup} role="group" aria-label="가격대">
            {PRICE_OPTIONS.map(({ id, label }) => (
              <Chip
                key={id}
                selected={priceRangeIds.includes(id)}
                onClick={() => handlePriceChipClick(id)}
              >
                {label}
              </Chip>
            ))}
          </div>
        </section>

        <section
          className={styles.section}
          aria-labelledby="filter-color-heading"
        >
          <h2 id="filter-color-heading" className={styles.sectionTitle}>
            색상
          </h2>
          <div className={styles.chipGroup} role="group" aria-label="색상">
            {COLOR_OPTIONS.map(({ id, label, value }) => (
              <Chip
                key={id}
                selected={colorIds.includes(id)}
                onClick={() => handleColorChipClick(id)}
              >
                {value ? (
                  <span className={styles.colorChipInner}>
                    <span
                      className={styles.colorDot}
                      style={{
                        backgroundColor: value,
                      }}
                    />
                    {label}
                  </span>
                ) : (
                  label
                )}
              </Chip>
            ))}
          </div>
        </section>
      </div>
    );
  }
);

ProductFilterSheet.displayName = 'ProductFilterSheet';

export default ProductFilterSheet;
