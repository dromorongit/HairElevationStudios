/**
 * Cart Types
 */

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

import type { Product } from "./product";
