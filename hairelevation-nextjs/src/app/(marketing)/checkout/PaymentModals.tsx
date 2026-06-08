/**
 * PaymentModals Component
 * Three-step payment flow: Payment Instructions → Payment Proof Upload → WhatsApp
 * Ported from checkout.html payment modals
 */

"use client";

import { useState, useRef, ChangeEvent } from "react";
import { WHATSAPP } from "@/constants/brand";
import { cartService } from "@/services/cartService";
import { productService } from "@/services/productService";
import type { CartItem as CartItemType } from "@/types/api/cart";

interface PaymentModalsProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod: "mobile" | "bank";
  formData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    notes: string;
  };
  cartItems: CartItemType[];
}

export function PaymentModals({
  isOpen,
  onClose,
  paymentMethod,
  formData,
  cartItems,
}: PaymentModalsProps) {
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const total = cartService.getCartTotal();
  const itemsList = cartItems
    .map(
      (item) =>
        `- ${item.product.name} x${item.quantity} (GH₵${(
          (item.product.onSale && item.product.promoPrice
            ? item.product.promoPrice
            : item.product.price) * item.quantity
        ).toLocaleString()})`
    )
    .join("\n");

  const paymentMethodText = paymentMethod === "mobile" ? "Mobile Money" : "Bank Transfer";

  const createWhatsAppMessage = (paymentProofUrl?: string) => {
    const message = `
*New Order - Hair Elevation Studio*

*Customer Information:*
Name: ${formData.name}
Email: ${formData.email || "Not provided"}
Phone: ${formData.phone}

*Shipping Address:*
${formData.address}
${formData.city}

*Order Items:*
${itemsList}

*Order Total:* GH₵${total.toLocaleString()}

*Payment Method:* ${paymentMethodText}
${formData.notes ? `*Additional Notes:* ${formData.notes}` : ""}
${paymentProofUrl ? `*Payment Proof:* ${paymentProofUrl}` : ""}
    `.trim();

    return encodeURIComponent(message);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.");
      return;
    }

    setUploadedImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setUploadedImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadAndSubmit = async () => {
    if (!uploadedImageFile) {
      alert("Please upload a payment proof image before placing your order.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const formDataPayload = new FormData();
      formDataPayload.append("paymentProof", uploadedImageFile);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://hairelevationstudios-production.up.railway.app"}/products/upload-payment-proof`,
        {
          method: "POST",
          body: formDataPayload,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      const paymentProofUrl = data.url;

      // Open WhatsApp with payment proof
      const encodedMessage = createWhatsAppMessage(paymentProofUrl);
      window.open(`${WHATSAPP.url}?text=${encodedMessage}`, "_blank");

      // Clear cart and close
      cartService.clearCart();
      setSubmitMessage(
        "Your order has been submitted! WhatsApp should open with your order details and payment proof."
      );

      // Reset and close after delay
      setTimeout(() => {
        handleRemoveImage();
        setSubmitMessage("");
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error uploading payment proof:", error);
      alert("Error uploading payment proof. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkipProof = () => {
    // Open WhatsApp without payment proof
    const encodedMessage = createWhatsAppMessage();
    window.open(`${WHATSAPP.url}?text=${encodedMessage}`, "_blank");
    cartService.clearCart();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Mobile Money Modal */}
      {paymentMethod === "mobile" && (
        <div className="bg-white rounded-[10px] shadow-[0_10px_30px_rgba(59,42,35,0.1)] max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[1.5rem] font-bold text-[#3B2A23]">
                Mobile Money Payment Instructions
              </h2>
              <button
                onClick={onClose}
                className="text-[#999999] hover:text-[#3B2A23] text-2xl font-bold"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 text-[#666666]">
              <div className="bg-[#F5EFE6] p-4 rounded-[10px]">
                <p className="font-bold text-[#3B2A23]">MTN Merchant Mobile Money Number:</p>
                <p className="text-xl font-bold text-[#C8A97E]">0541152970</p>
                <p className="font-bold text-[#3B2A23] mt-2">Merchant ID:</p>
                <p className="text-xl font-bold text-[#C8A97E]">545467</p>
                <p className="font-bold text-[#3B2A23] mt-2">Account Name:</p>
                <p className="text-xl font-bold text-[#C8A97E]">Hair Elevation</p>
              </div>

              <div>
                <h3 className="font-bold text-[#3B2A23] mb-2">Payment Steps:</h3>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Dial *170# on your mobile phone</li>
                  <li>Select "Transfer Money"</li>
                  <li>Enter the Merchant Number: 0541152970</li>
                  <li>Enter the exact amount of your order</li>
                  <li>Enter your PIN to confirm payment</li>
                  <li>Take a screenshot of the payment confirmation</li>
                </ol>
              </div>

              <div className="bg-[#FFF3CD] border border-[#FFC107] p-4 rounded-[10px]">
                <p className="text-sm">
                  <strong>Important:</strong> Please take a screenshot of your payment confirmation as proof of payment.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={handleSkipProof}
                className="w-full py-3 px-6 bg-gradient-to-r from-[#C8A97E] via-[#B8956A] to-[#A67C52] text-[#3B2A23] font-semibold uppercase tracking-wider rounded-full shadow-[0_6px_20px_rgba(200,169,126,0.4)] hover:shadow-[0_8px_25px_rgba(200,169,126,0.5)] hover:-translate-y-[3px] transition-all duration-300"
              >
                I have made the payment (No Proof)
              </button>
              <button
                onClick={() => {
                  // Show payment proof upload section
                  setSubmitMessage("upload");
                }}
                className="w-full py-3 px-6 bg-[#3B2A23] text-[#F5EFE6] font-semibold uppercase tracking-wider rounded-full hover:bg-[#2A1F1A] transition-all duration-300"
              >
                Upload Payment Proof
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bank Payment Modal */}
      {paymentMethod === "bank" && (
        <div className="bg-white rounded-[10px] shadow-[0_10px_30px_rgba(59,42,35,0.1)] max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[1.5rem] font-bold text-[#3B2A23]">
                Bank Payment Instructions
              </h2>
              <button
                onClick={onClose}
                className="text-[#999999] hover:text-[#3B2A23] text-2xl font-bold"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 text-[#666666]">
              <div className="bg-[#F5EFE6] p-4 rounded-[10px]">
                <p className="font-bold text-[#3B2A23]">Bank Name:</p>
                <p className="text-xl font-bold text-[#C8A97E]">EcoBank</p>
                <p className="font-bold text-[#3B2A23] mt-2">Account Number:</p>
                <p className="text-xl font-bold text-[#C8A97E]">1441005080927</p>
                <p className="font-bold text-[#3B2A23] mt-2">Account Name:</p>
                <p className="text-xl font-bold text-[#C8A97E]">Hair Elevation Studio</p>
              </div>

              <div>
                <h3 className="font-bold text-[#3B2A23] mb-2">Payment Steps:</h3>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Visit your bank's mobile app or website</li>
                  <li>Select "Transfer" or "Make Payment"</li>
                  <li>Enter the account details above</li>
                  <li>Enter the exact amount of your order</li>
                  <li>Complete the transfer and save the receipt</li>
                  <li>Take a screenshot of the payment confirmation</li>
                </ol>
              </div>

              <div className="bg-[#FFF3CD] border border-[#FFC107] p-4 rounded-[10px]">
                <p className="text-sm">
                  <strong>Important:</strong> Please take a screenshot of your payment confirmation as proof of payment.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={handleSkipProof}
                className="w-full py-3 px-6 bg-gradient-to-r from-[#C8A97E] via-[#B8956A] to-[#A67C52] text-[#3B2A23] font-semibold uppercase tracking-wider rounded-full shadow-[0_6px_20px_rgba(200,169,126,0.4)] hover:shadow-[0_8px_25px_rgba(200,169,126,0.5)] hover:-translate-y-[3px] transition-all duration-300"
              >
                I have made the payment (No Proof)
              </button>
              <button
                onClick={() => setSubmitMessage("upload")}
                className="w-full py-3 px-6 bg-[#3B2A23] text-[#F5EFE6] font-semibold uppercase tracking-wider rounded-full hover:bg-[#2A1F1A] transition-all duration-300"
              >
                Upload Payment Proof
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Proof Upload Modal */}
      {submitMessage === "upload" && (
        <div className="bg-white rounded-[10px] shadow-[0_10px_30px_rgba(59,42,35,0.1)] max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[1.5rem] font-bold text-[#3B2A23]">
                Upload Payment Proof
              </h2>
              <button
                onClick={() => {
                  setSubmitMessage("");
                  handleRemoveImage();
                }}
                className="text-[#999999] hover:text-[#3B2A23] text-2xl font-bold"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-[#666666]">
                Please upload a screenshot of your payment confirmation:
              </p>

              {/* File Upload Area */}
              <div
                className="border-2 border-dashed border-[#C8A97E] rounded-[10px] p-6 text-center cursor-pointer hover:bg-[#F5EFE6]/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="payment-proof-input"
                />

                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Payment proof preview"
                      className="max-h-48 mx-auto rounded-[5px]"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                      className="absolute top-2 right-2 w-8 h-8 bg-[#DC3545] text-white rounded-full flex items-center justify-center hover:bg-[#D32F2F] transition-colors"
                      aria-label="Remove image"
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <div className="py-4">
                    <div className="text-4xl mb-2">📸</div>
                    <p className="font-bold text-[#3B2A23]">Click to upload payment proof</p>
                    <p className="text-sm text-[#666666]">or drag and drop your image here</p>
                  </div>
                )}
              </div>

              <p className="text-sm text-[#666666] text-center">
                Supported formats: JPG, PNG, GIF (Max size: 5MB)
              </p>

              {/* Submit Button */}
              <button
                onClick={handleUploadAndSubmit}
                disabled={!uploadedImageFile || isSubmitting}
                className="w-full py-3 px-6 bg-gradient-to-r from-[#25D366] via-[#20B954] to-[#128C7E] text-white font-semibold uppercase tracking-wider rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.5)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.6)] hover:-translate-y-[3px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? "Submitting..." : "Submit Order & Open WhatsApp"}
              </button>

              {/* Success Message */}
              {submitMessage && submitMessage !== "upload" && (
                <div className="p-4 bg-[#28A745]/10 border border-[#28A745] rounded-[10px] text-[#28A745] text-center">
                  {submitMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
