/**
 * CheckoutPageClient Component
 * Client component for the checkout page
 * Refined spacing and typography
 */

"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { cartService } from "@/services/cartService";
import { productService } from "@/services/productService";
import { ROUTES } from "@/constants/brand";
import { PaymentModals } from "./PaymentModals";
import type { CartItem as CartItemType } from "@/types/api/cart";

export function CheckoutPageClient() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
    payment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"mobile" | "bank">("mobile");

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setCheckoutMessage("");

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.payment
    ) {
      setCheckoutMessage("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    setSelectedPaymentMethod(formData.payment as "mobile" | "bank");
    setShowPaymentModal(true);
    setIsSubmitting(false);
  };

  const handleModalClose = () => {
    setShowPaymentModal(false);
  };

  const total = cartService.getCartTotal();

  if (isLoading) {
    return (
      <main>
        <section className="checkout py-20 px-5">
          <div className="container max-w-[1200px] mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-[#3B2A23] text-center mb-12">
              Checkout
            </h1>
            <div className="flex justify-center items-center py-16">
              <LoadingSpinner size="lg" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="checkout py-20 px-5">
        <div className="container max-w-[1200px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#3B2A23] text-center mb-12">
            Checkout
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#666666] text-lg mb-6">Your cart is empty.</p>
              <Button asLink href={ROUTES.products}>
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="checkout-content grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Summary */}
              <div className="order-summary bg-white rounded-xl shadow-[0_8px_20px_rgba(99,42,35,0.1)] p-8">
                <h2 className="text-2xl font-bold text-[#3B2A23] mb-6">
                  Order Summary
                </h2>
                <div className="space-y-5 mb-6">
                  {cartItems.map((item) => {
                    const imageUrl = productService.getImageUrl(
                      item.product.coverImage
                    );
                    const itemPrice = item.product.onSale && item.product.promoPrice
                      ? item.product.promoPrice
                      : item.product.price;

                    return (
                      <div
                        key={item.product._id}
                        className="flex gap-4 items-center"
                      >
                        <div className="relative w-16 h-16 rounded-md overflow-hidden bg-[#F5EFE6] flex-shrink-0">
                          <Image
                            src={imageUrl}
                            alt={item.product.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-[#3B2A23] truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-[#666666]">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-sm font-bold text-[#3B2A23]">
                          GH₵{(itemPrice * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-[#E8D5C4] pt-5">
                  <h3 className="text-lg font-bold text-[#3B2A23]">
                    Total:{" "}
                    <span className="text-[#C8A97E]">
                      GH₵{total.toLocaleString()}
                    </span>
                  </h3>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="checkout-form bg-white rounded-xl shadow-[0_8px_20px_rgba(99,42,35,0.1)] p-8">
                <h2 className="text-2xl font-bold text-[#3B2A23] mb-6">
                  Shipping Information
                </h2>
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div className="form-group">
                    <label
                      htmlFor="shipping-name"
                      className="block text-sm font-medium text-[#3B2A23] mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="shipping-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-[#E8D5C4] bg-[#FAF8F5] text-[#3B2A23] focus:outline-none focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label
                      htmlFor="shipping-email"
                      className="block text-sm font-medium text-[#3B2A23] mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="shipping-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-[#E8D5C4] bg-[#FAF8F5] text-[#3B2A23] focus:outline-none focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20 transition-all"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Phone */}
                  <div className="form-group">
                    <label
                      htmlFor="shipping-phone"
                      className="block text-sm font-medium text-[#3B2A23] mb-2"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="shipping-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-[#E8D5C4] bg-[#FAF8F5] text-[#3B2A23] focus:outline-none focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20 transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Address */}
                  <div className="form-group">
                    <label
                      htmlFor="shipping-address"
                      className="block text-sm font-medium text-[#3B2A23] mb-2"
                    >
                      Address
                    </label>
                    <textarea
                      id="shipping-address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      required
                      className="w-full px-4 py-3 rounded-md border border-[#E8D5C4] bg-[#FAF8F5] text-[#3B2A23] focus:outline-none focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20 transition-all resize-none"
                      placeholder="Enter your delivery address"
                    />
                  </div>

                  {/* City */}
                  <div className="form-group">
                    <label
                      htmlFor="shipping-city"
                      className="block text-sm font-medium text-[#3B2A23] mb-2"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="shipping-city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-[#E8D5C4] bg-[#FAF8F5] text-[#3B2A23] focus:outline-none focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20 transition-all"
                      placeholder="Enter your city"
                    />
                  </div>

                  {/* Additional Notes */}
                  <div className="form-group">
                    <label
                      htmlFor="additional-notes"
                      className="block text-sm font-medium text-[#3B2A23] mb-2"
                    >
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="additional-notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-md border border-[#E8D5C4] bg-[#FAF8F5] text-[#3B2A23] focus:outline-none focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20 transition-all resize-none"
                      placeholder="Any special instructions or notes for your order..."
                    />
                  </div>

                  {/* Payment Method */}
                  <div className="form-group">
                    <label
                      htmlFor="payment-method"
                      className="block text-sm font-medium text-[#3B2A23] mb-2"
                    >
                      Payment Method
                    </label>
                    <select
                      id="payment-method"
                      name="payment"
                      value={formData.payment}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-[#E8D5C4] bg-[#FAF8F5] text-[#3B2A23] focus:outline-none focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20 transition-all"
                    >
                      <option value="">Select Payment Method</option>
                      <option value="mobile">Mobile Money</option>
                      <option value="bank">Payment to Bank</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                    size="lg"
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </Button>
                </form>

                {/* Checkout Message */}
                {checkoutMessage && (
                  <div
                    id="checkout-message"
                    className="mt-6 p-4 bg-[#28A745]/10 border border-[#28A745] rounded-xl text-[#28A745] text-center"
                  >
                    {checkoutMessage}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Payment Modals */}
      <PaymentModals
        isOpen={showPaymentModal}
        onClose={handleModalClose}
        paymentMethod={selectedPaymentMethod}
        formData={formData}
        cartItems={cartItems}
      />
    </main>
  );
}