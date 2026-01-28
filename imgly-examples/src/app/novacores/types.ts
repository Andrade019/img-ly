export interface ProductColor {
  id: string;
  label: string;
  colorHex: string;
  isDefault?: boolean;
}

export interface ProductSize {
  id: string;
  label: string;
}

export interface ProductArea {
  id: string;
  label: string;
  pageSize: {
    width: number;
    height: number;
  };
  mockup: {
    images: {
      uri: string;
      width: number;
      height: number;
    }[];
    printableAreaPx: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    editingMaskUrl?: string;
    exportingMaskUrl?: string;
  };
}

export interface Product {
  id: string;
  label: string;
  description: string;
  category: string;
  designUnit: string;
  unitPrice: number;
  areas: ProductArea[];
  colors: ProductColor[];
  sizes: ProductSize[];
  thumbnailUrl: string;
  featured?: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface CartItem {
  product: Product;
  color: string;
  size: string;
  quantity: number;
  customDesignUrl?: string;
  totalPrice: number;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  description: string;
}
