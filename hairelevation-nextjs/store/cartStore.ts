"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ICartItem, IProduct } from '@/lib/types';

interface CartState {
  items: ICartItem[];
  addItem: (product: IProduct, selectedSize?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, selectedSize) => {
        const items = get().items;
        const existingItem = items.find((item) => item.product._id === product._id);
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { product, quantity: 1, selectedSize }] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.product._id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => {
        set({ items: [] });
      },
      get cartTotal() {
        return get().items.reduce((total, item) => {
          const price = item.product.onSale ? item.product.promoPrice || item.product.price : item.product.price;
          return total + price * item.quantity;
        }, 0);
      },
      get cartCount() {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);