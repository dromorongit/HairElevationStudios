/**
 * CartPageClient Component
 * Client component for the cart page
 * Luxury checkout experience with refined spacing
 */

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        <section className="cart py-24 px-8">
          <div className="container max-w-[1400px] mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[#3B2A23] text-center mb-16 tracking-tight">
              Your Shopping Cart
            </h1>
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="cart py-24 px-8 bg-gradient-to-b from-white to-[#F5EFE6]">
        <div className="container max-w-[1400px] mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-[#3B2A23] text-center mb-16 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Shopping Cart
          </motion.h1>

          {cartItems.length === 0 ? (
            <motion.div
              className="text-center py-20 bg-white rounded-xl shadow-[var(--shadow-card)] px-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 bg-[#F5EFE6] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="21" r="1" stroke="#C8A97E" strokeWidth="2" />
                  <circle cx="20" cy="21" r="1" stroke="#C8A97E" strokeWidth="2" />
                  <path d="M1 1h4l2.68 13.39c.2 1 1 1.73 2 1.73h9.72c1 0 1.8-.73 2-1.73L23 6H6" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[#666666] text-lg mb-8">Your cart is empty.</p>
              <Button asLink href={ROUTES.products} size="lg">
                Browse Products
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
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