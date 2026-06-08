/**
 * CartSummary Component
 * Displays cart total and checkout button
 * Luxury presentation with refined styling
 */

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/brand";
import { cartService } from "@/services/cartService";

export function CartSummary() {
  const total = cartService.getCartTotal();
  const itemCount = cartService.getCartCount();

  return (
    <div className="cart-summary bg-white rounded-xl shadow-[var(--shadow-card)] p-8 sticky top-24">
      <h3 className="text-xl font-bold text-[#3B2A23] mb-6">Order Summary</h3>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-[#666666]">
          <span>Items ({itemCount})</span>
          <span>GH₵{total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-[#666666]">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="border-t border-[#E8D5C4] pt-4">
          <div className="flex justify-between text-xl font-bold text-[#3B2A23]">
            <span>Total</span>
            <span className="text-[#C8A97E]">GH₵{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Button asLink href={ROUTES.checkout} className="w-full" size="lg">
        Proceed to Checkout
      </Button>

      <Link
        href={ROUTES.products}
        className="block text-center mt-5 text-sm text-[#C8A97E] hover:text-[#A67C52] transition-colors font-medium"
      >
        Continue Shopping
      </Link>
    </div>
  );
}