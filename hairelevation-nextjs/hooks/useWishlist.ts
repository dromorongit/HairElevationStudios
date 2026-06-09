"use client";

import { useWishlistStore } from '@/store/wishlistStore';

export const useWishlist = () => {
  const items = useWishlistStore((state) => state.items);
  const addItem = useWishlistStore((state) => state.addItem);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  return { items, addItem, removeItem, isInWishlist, toggleWishlist };
};