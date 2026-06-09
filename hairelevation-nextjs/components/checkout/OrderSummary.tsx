"use client";

import { useCartStore } from '@/store/cartStore';
import { formatPrice, truncateText } from '@/lib/utils';

export function OrderSummary() {
  const items = useCartStore(state => state.items);
  const cartTotal = useCartStore(state => state.cartTotal);
  
  const subtotal = items.reduce((sum, item) => {
    const price = item.product.onSale && item.product.promoPrice 
      ? item.product.promoPrice 
      : item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  return (
    <div className="bg-brand-warm-white rounded-2xl border border-ui-border p-6">
      <h3 className="text-lg font-heading font-bold text-brand-brown mb-4">
        Order Summary
      </h3>
      
      <div className="space-y-3 mb-4">
        {items.map((item) => {
          const price = item.product.onSale && item.product.promoPrice 
            ? item.product.promoPrice 
            : item.product.price;
          return (
            <div key={item.product._id} className="flex justify-between text-sm font-body">
              <span className="text-ui-text-secondary">
                {truncateText(item.product.name, 20)} × {item.quantity}
              </span>
              <span className="text-brand-brown">
                {formatPrice(price * item.quantity)}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="border-t border-brand-gold/20 pt-4 space-y-3">
        <div className="flex justify-between text-sm font-body">
          <span className="text-ui-text-secondary">Subtotal</span>
          <span className="text-brand-brown">{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm font-body">
          <span className="text-ui-text-secondary">Delivery</span>
          <span className="text-ui-text-secondary">To be confirmed</span>
        </div>
        
        <div className="border-t border-brand-gold/20 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-heading font-bold text-brand-brown">Total</span>
            <span className="text-xl font-bold text-brand-gold">
              {formatPrice(subtotal)}
            </span>
          </div>
        </div>
        
        <p className="text-xs text-ui-text-secondary font-body mt-4 pt-3 border-t border-brand-gold/10">
          ✅ Payment secured by Paystack
        </p>
      </div>
    </div>
  );
}