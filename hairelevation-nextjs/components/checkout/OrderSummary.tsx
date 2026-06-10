"use client";

import { useCartStore } from '@/store/cartStore';
import { formatPrice, truncateText } from '@/lib/utils';

export function OrderSummary() {
  const items = useCartStore(state => state.items);

  const subtotal = items.reduce((sum, item) => {
    const price = item.product.onSale && item.product.promoPrice
      ? item.product.promoPrice
      : item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-gold)] p-6">
      <h3 className="text-lg font-heading font-bold text-[var(--text-primary)] mb-4">
        Order Summary
      </h3>

      <div className="space-y-3 mb-4">
        {items.map((item) => {
          const price = item.product.onSale && item.product.promoPrice
            ? item.product.promoPrice
            : item.product.price;
          return (
            <div key={item.product._id} className="flex justify-between text-sm font-body">
              <span className="text-[var(--text-muted)]">
                {truncateText(item.product.name, 20)} × {item.quantity}
              </span>
              <span className="text-[var(--text-primary)]">
                {formatPrice(price * item.quantity)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-[var(--border-gold)] pt-4 space-y-3">
        <div className="flex justify-between text-sm font-body">
          <span className="text-[var(--text-muted)]">Subtotal</span>
          <span className="text-[var(--text-primary)]">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm font-body">
          <span className="text-[var(--text-muted)]">Delivery</span>
          <span className="text-[var(--text-muted)]">To be confirmed</span>
        </div>

        <div className="border-t border-[var(--border-gold)] pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-heading font-bold text-[var(--text-primary)]">Total</span>
            <span className="text-xl font-bold text-[var(--brand-gold)]">
              {formatPrice(subtotal)}
            </span>
          </div>
        </div>

        <p className="text-xs text-[var(--text-muted)] font-body mt-4 pt-3 border-t border-[var(--border-gold)]">
          Manual payment via Mobile Money or Bank Transfer
        </p>
      </div>
    </div>
  );
}