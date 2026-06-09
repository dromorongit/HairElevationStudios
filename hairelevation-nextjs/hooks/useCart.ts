"use client";

import { useCartStore } from '@/store/cartStore';

export const useCart = () => {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const cartTotal = useCartStore((state) => state.cartTotal);
  const cartCount = useCartStore((state) => state.cartCount);

  return { items, addItem, removeItem, updateQuantity, clearCart, cartTotal, cartCount };
};