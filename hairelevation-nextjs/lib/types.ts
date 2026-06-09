export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  length?: string;
  lace?: string;
  density?: string;
  texture?: string;
  quality?: string;
  price: number;
  color?: string[];
  size?: string[];
  onSale: boolean;
  promoPrice?: number;
  featured: boolean;
  collections?: string[];
  coverImage: string;
  additionalImages?: string[];
  videos?: string[];
  stock: number;
  inStock: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
  selectedSize?: string;
}

export interface IWishlistItem {
  product: IProduct;
  addedAt: Date;
}