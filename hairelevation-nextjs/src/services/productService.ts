/**
 * Product Service
 * Business logic layer for product-related operations
 */

import { apiService } from "./api";
import type { Product } from "@/types/api/product";

export const productService = {
  /**
   * Fetch all products
   */
  async getAllProducts(): Promise<Product[]> {
    return apiService.getAllProducts();
  },

  /**
   * Fetch featured products
   */
  async getFeaturedProducts(): Promise<Product[]> {
    return apiService.getFeaturedProducts();
  },

  /**
   * Fetch single product by ID
   */
  async getProductById(id: string): Promise<Product> {
    return apiService.getProductById(id);
  },

  /**
   * Get products by collection name
   */
  async getProductsByCollection(collectionName: string): Promise<Product[]> {
    return apiService.getProductsByCollection(collectionName);
  },

  /**
   * Get image URL for a product image path
   */
  getImageUrl(path: string | undefined): string {
    return apiService.getImageUrl(path);
  },
};
