"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IWishlistItem, IProduct } from '@/lib/types';

interface WishlistState {
  items: IWishlistItem[];
  addItem: (product: IProduct) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: IProduct) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        if (!get().isInWishlist(product._id)) {
          set({ items: [...get().items, { product, addedAt: new Date() }] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.product._id !== productId) });
      },
      isInWishlist: (productId) => {
        return get().items.some((item) => item.product._id === productId);
      },
      toggleWishlist: (product) => {
        if (get().isInWishlist(product._id)) {
          get().removeItem(product._id);
        } else {
          get().addItem(product);
        }
      },
      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'wishlist-storage',
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