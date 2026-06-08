/**
 * Product API Types
 * Based on backend/models/Product.ts and API-INTEGRATION-MAP.md
 */

export interface Product {
  _id: string;
  name: string;
  description?: string;
  length?: string;
  lace?: string;
  density?: string;
  texture?: string;
  quality?: string;
  price: number;
  color?: string;
  size?: ("Small" | "Medium" | "Large")[];
  onSale: boolean;
  promoPrice?: number;
  featured: boolean;
  collections: string[];
  coverImage: string;
  additionalImages: string[];
  videos: string[];
  stock: number;
  inStock: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductResponse {
  success: boolean;
  data: Product[];
  count?: number;
}

export interface SingleProductResponse {
  success: boolean;
  data: Product;
}

export interface FeaturedProductResponse {
  success: boolean;
  data: Product[];
}
