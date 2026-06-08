/**
 * Core API Service
 * Centralized HTTP client with error handling
 * Based on API-LAYER-STRATEGY.md and js/api.js
 */

import { API_BASE_URL } from "@/constants/brand";

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Core API service class
 */
class APIService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Internal fetch method with error handling
   */
  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      // Handle HTTP errors
      if (!response.ok) {
        let errorData: unknown;
        try {
          errorData = await response.json();
        } catch {
          errorData = await response.text();
        }

        throw new ApiError(
          response.status,
          response.statusText,
          errorData
        );
      }

      // Handle empty responses
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      // Network errors or fetch failures
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(0, "Network error: Failed to fetch");
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string): Promise<T> {
    return this.fetch<T>(endpoint, { method: "GET" });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.fetch<T>(endpoint, { method: "DELETE" });
  }

  // ============ Product Endpoints ============

  /**
   * Fetch all products
   */
  async getAllProducts(): Promise<import("@/types/api/product").Product[]> {
    const response = await this.get<{
      success: boolean;
      data: import("@/types/api/product").Product[];
    }>("/products");
    return response.data;
  }

  /**
   * Fetch featured products only
   */
  async getFeaturedProducts(): Promise<import("@/types/api/product").Product[]> {
    const response = await this.get<{
      success: boolean;
      data: import("@/types/api/product").Product[];
    }>("/products/featured");
    return response.data;
  }

  /**
   * Fetch single product by ID
   */
  async getProductById(
    id: string
  ): Promise<import("@/types/api/product").Product> {
    const response = await this.get<{
      success: boolean;
      data: import("@/types/api/product").Product;
    }>(`/products/${id}`);
    return response.data;
  }

  /**
   * Get products by collection name
   * Since backend doesn't have collection filter, fetch all and filter client-side
   */
  async getProductsByCollection(
    collectionName: string
  ): Promise<import("@/types/api/product").Product[]> {
    const products = await this.getAllProducts();
    return products.filter(
      (product) =>
        product.collections && product.collections.includes(collectionName)
    );
  }

  /**
   * Convert image path to full URL
   * Handles Cloudinary URLs, relative paths, and legacy upload paths
   */
  getImageUrl(path: string | undefined | null): string {
    if (!path) {
      return "https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=No+Image";
    }

    // Already a full URL (Cloudinary, AWS S3, etc.)
    if (path.startsWith("http")) {
      return path;
    }

    // Legacy local upload path - return placeholder
    if (path.startsWith("/uploads/")) {
      return "https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=Image+Unavailable";
    }

    // Relative path - construct full URL
    return `${this.baseURL}${path}`;
  }
}

// Singleton instance
export const apiService = new APIService();
