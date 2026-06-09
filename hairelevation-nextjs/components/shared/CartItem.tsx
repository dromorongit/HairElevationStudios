"use client";

import { motion } from 'framer-motion';
import { BsDash, BsPlus, BsTrash } from 'react-icons/bs';
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
      className="flex gap-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-gold)] p-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
    >
      <div
        style={{ backgroundImage: `url(${product.coverImage})` }}
        className="w-16 h-16 rounded-xl bg-cover bg-center flex-shrink-0"
        aria-label={product.name}
      />

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-body font-medium text-[var(--text-primary)] truncate">
          {truncateText(product.name, 20)}
        </h4>

        <div className="flex flex-wrap gap-1 mt-1">
          {toArray(product.collections).slice(0, 2).map((collection, index) => (
            <span
              key={index}
              className="text-[10px] px-2 py-0.5 bg-[rgba(200,169,126,0.1)] text-[var(--text-primary)] rounded-full font-body"
            >
              {collection}
            </span>
          ))}
        </div>

        {selectedSize && (
          <p className="text-xs text-[var(--text-muted)] mt-1 font-body">
            Size: {selectedSize}
          </p>
        )}

        <p className="text-sm font-medium text-[var(--brand-gold)] mt-2 font-body">
          {formatPrice(price)}
        </p>
      </div>

      <div className="flex flex-col items-end justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(product._id, quantity - 1)}
            disabled={quantity <= 1}
            className="w-9 h-9 rounded-full border border-[var(--brand-gold)] flex items-center justify-center text-[var(--brand-gold)] hover:bg-[var(--brand-gold)]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <BsDash className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-body text-base text-[var(--text-primary)]">
            {quantity}
          </span>
          <button
            onClick={() => updateQuantity(product._id, quantity + 1)}
            className="w-9 h-9 rounded-full border border-[var(--brand-gold)] flex items-center justify-center text-[var(--brand-gold)] hover:bg-[var(--brand-gold)]/10 transition-colors"
          >
            <BsPlus className="w-4 h-4" />
          </button>

          <button
            onClick={() => removeItem(product._id)}
            className="ml-1 p-2 rounded-full text-[var(--text-muted)] hover:text-red-400 transition-colors"
            aria-label="Remove from cart"
          >
            <BsTrash className="w-4 h-4" />
          </button>
        </div>

        <p className="text-lg font-bold text-[var(--brand-gold)]">
          {formatPrice(itemTotal)}
        </p>
      </div>
    </motion.div>
  );
}