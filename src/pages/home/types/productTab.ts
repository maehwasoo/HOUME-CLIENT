export type ProductFilterChipCategory = 'furniture' | 'price' | 'color';

export interface AppliedFilterChip {
  category: ProductFilterChipCategory;
  id: string;
  label: string;
  applied: boolean;
}

export interface SelectedProduct {
  id: string;
  title: string;
  brand: string;
  imageUrl?: string;
  originalPrice: number;
  discountPrice: number;
  discountRate: number;
}
