export interface ProductInfo {
  title: string;
  brand?: string;
  imageUrl?: string;
  colorHexes?: string[];
}

export interface PriceInfo {
  original?: number;
  discount?: number;
  discountRate?: number;
}

export interface SaveInfo {
  isSaved: boolean;
  onToggle: () => void;
  count?: number;
}

export interface LinkInfo {
  href?: string;
  label?: string;
  onClick?: () => void;
}
