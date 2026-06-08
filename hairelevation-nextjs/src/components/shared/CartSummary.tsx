/**
 * CartSummary Component
 * Displays cart total and checkout button
 */

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/brand";
import { cartService } from "@/services/cartService";

export function CartSummary() {
  const total = cartService.getCartTotal();
  const itemCount = cartService.getCartCount();

  return (
    <div className="cart-summary bg-white rounded-[10px] shadow-[0_8px_20px_rgba(99,42,35,0.1)] p-6 sticky top-24">
      <h3 className="text-xl font-bold text-[#3B2A23] mb-4">Order Summary</h3>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-[#666666]">
          <span>Items ({itemCount})</span>
          <span>GH₵{total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-[#666666]">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="border-t border-[#E8D5C4] pt-3">
          <div className="flex justify-between text-lg font-bold text-[#3B2A23]">
            <span>Total</span>
            <span>GH₵{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Button asLink href={ROUTES.checkout} className="w-full" size="lg">
        Proceed to Checkout
      </Button>

      <Link
        href={ROUTES.products}
        className="block text-center mt-4 text-sm text-[#C8A97E] hover:text-[#B8956A] transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
