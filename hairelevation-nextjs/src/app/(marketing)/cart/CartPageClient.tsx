/**
 * CartPageClient Component
 * Client component for the cart page
 */

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CartItem } from "@/components/shared/CartItem";
import { CartSummary } from "@/components/shared/CartSummary";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { cartService } from "@/services/cartService";
import { ROUTES } from "@/constants/brand";
import type { CartItem as CartItemType } from "@/types/api/cart";

export function CartPageClient() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCart = () => {
      const items = cartService.getCart();
      setCartItems(items);
      setIsLoading(false);
    };

    loadCart();

    const handleStorageChange = () => loadCart();
    window.addEventListener("storage", handleStorageChange);
    const handleCartUpdate = () => loadCart();
    window.addEventListener("cart-updated", handleCartUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cart-updated", handleCartUpdate);
    };
  }, []);

  const handleRemoveItem = (productId: string) => {
    cartService.removeFromCart(productId);
    setCartItems(cartService.getCart());
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    cartService.updateQuantity(productId, quantity);
    setCartItems(cartService.getCart());
  };

  if (isLoading) {
    return (
      <main>
        <section className="cart py-16 px-5">
          <div className="container max-w-[1200px] mx-auto">
            <h1 className="text-[2rem] font-bold text-[#3B2A23] text-center mb-10">
              Your Shopping Cart
            </h1>
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="cart py-16 px-5">
        <div className="container max-w-[1200px] mx-auto">
          <motion.h1
            className="text-[2rem] font-bold text-[#3B2A23] text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Shopping Cart
          </motion.h1>

          {cartItems.length === 0 ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[#666666] text-lg mb-6">Your cart is empty.</p>
              <Button asLink href={ROUTES.products}>
                Browse Products
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.product._id}
                      item={item}
                      onRemove={handleRemoveItem}
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Cart Summary */}
              <div className="lg:col-span-1">
                <CartSummary />
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
