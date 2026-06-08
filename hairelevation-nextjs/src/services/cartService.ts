/**
 * Cart Service
 * Client-side cart state management using localStorage
 */

import type { CartItem } from "@/types/api/cart";
import type { Product } from "@/types/api/product";

const CART_STORAGE_KEY = "hes_cart";

export const cartService = {
  /**
   * Get cart items from localStorage
   */
  getCart(): CartItem[] {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  /**
   * Save cart items to localStorage
   */
  saveCart(cart: CartItem[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  },

  /**
   * Get total number of items in cart
   */
  getCartCount(): number {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  /**
   * Add item to cart
   */
  addToCart(product: Product, quantity: number = 1, selectedSize?: string): void {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(
      (item) => item.product._id === product._id
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ product, quantity, selectedSize });
    }

    this.saveCart(cart);
  },

  /**
   * Remove item from cart
   */
  removeFromCart(productId: string): void {
    const cart = this.getCart().filter(
      (item) => item.product._id !== productId
    );
    this.saveCart(cart);
  },

  /**
   * Update item quantity
   */
  updateQuantity(productId: string, quantity: number): void {
    const cart = this.getCart();
    const item = cart.find((item) => item.product._id === productId);

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.saveCart(cart);
      }
    }
  },

  /**
   * Clear all items from cart
   */
  clearCart(): void {
    this.saveCart([]);
  },

  /**
   * Get cart total price
   */
  getCartTotal(): number {
    const cart = this.getCart();
    return cart.reduce((total, item) => {
      const price = item.product.onSale && item.product.promoPrice
        ? item.product.promoPrice
        : item.product.price;
      return total + price * item.quantity;
    }, 0);
  },
};
