"use client";

import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { ICartItem } from '@/lib/types';
import { formatPrice, truncateText, toArray } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

interface CartItemProps {
  item: ICartItem;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const { product, quantity, selectedSize } = item;
  const price = product.onSale && product.promoPrice ? product.promoPrice : product.price;
  const itemTotal = price * quantity;

  return (
    <motion.div
      className="flex gap-4 bg-brand-warm-white rounded-2xl border border-ui-border p-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.coverImage}
        alt={product.name}
        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
      />
      
      <div className="flex-1 min-w-0">
        <h4 className="text-base font-heading font-bold text-brand-brown truncate">
          {truncateText(product.name, 20)}
        </h4>
        
        <div className="flex flex-wrap gap-1 mt-1">
          {toArray(product.collections).slice(0, 2).map((collection, index) => (
            <span
              key={index}
              className="text-xs px-2 py-0.5 bg-brand-gold-light text-brand-brown rounded-pill"
            >
              {collection}
            </span>
          ))}
        </div>
        
        {selectedSize && (
          <p className="text-sm text-ui-text-secondary mt-1">
            Size: {selectedSize}
          </p>
        )}
        
        <p className="text-sm font-medium text-brand-gold mt-2">
          {formatPrice(price)}
        </p>
      </div>
      
      <div className="flex flex-col items-end justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(product._id, quantity - 1)}
            disabled={quantity <= 1}
            className="w-8 h-8 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold hover:bg-brand-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-8 text-center font-heading text-brand-brown">
            {quantity}
          </span>
          <button
            onClick={() => updateQuantity(product._id, quantity + 1)}
            className="w-8 h-8 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold hover:bg-brand-gold-light transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
          
          <button
            onClick={() => removeItem(product._id)}
            className="ml-2 p-2 rounded-full text-ui-text-secondary hover:text-red-500 transition-colors"
            aria-label="Remove from cart"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-lg font-bold text-brand-gold">
          {formatPrice(itemTotal)}
        </p>
      </div>
    </motion.div>
  );
}