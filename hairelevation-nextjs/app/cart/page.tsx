"use client";

import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { OutlineButton } from '@/components/shared/OutlineButton';
import { CartItem } from '@/components/shared/CartItem';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { CheckoutForm, CheckoutFormData } from '@/components/checkout/CheckoutForm';
import { OrderSuccessModal } from '@/components/checkout/OrderSuccessModal';
import { PaymentInstructionsModal } from '@/components/checkout/PaymentInstructionsModal';
import { PaymentProofModal } from '@/components/checkout/PaymentProofModal';
import { useToast } from '@/components/shared/Toast';
import { uploadPaymentProof } from '@/lib/api';
import { formatPrice } from '@/lib/utils';

function CartContent() {
  const items = useCartStore(state => state.items);
  const clearCart = useCartStore(state => state.clearCart);
  const { showToast } = useToast();

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    city: '',
    notes: '',
    paymentMethod: 'mobile',
  });

  const [showPaymentInstructions, setShowPaymentInstructions] = useState(false);
  const [showPaymentProof, setShowPaymentProof] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleFormSubmit = () => {
    setShowPaymentInstructions(true);
  };

  const handlePaymentConfirmed = () => {
    setShowPaymentInstructions(false);
    setShowPaymentProof(true);
  };

  const handleProofSubmit = async (file: File) => {
    setIsUploading(true);
    try {
      const response = await uploadPaymentProof(file);
      const proofUrl = response.url;
      const currentItems = useCartStore.getState().items;

      const orderLines = currentItems.map(item => {
        const price = item.product.onSale && item.product.promoPrice
          ? item.product.promoPrice
          : item.product.price;
        const sizeText = item.selectedSize ? ` (${item.selectedSize})` : '';
        return `- ${item.quantity}x ${item.product.name}${sizeText} — ${formatPrice(price * item.quantity)}`;
      }).join('\n');

      const total = currentItems.reduce((sum, item) => {
        const price = item.product.onSale && item.product.promoPrice
          ? item.product.promoPrice
          : item.product.price;
        return sum + price * item.quantity;
      }, 0);

      const paymentMethodText = formData.paymentMethod === 'mobile'
        ? 'Mobile Money'
        : 'Bank Transfer';

      const message = `🛍️ NEW ORDER — Hair Elevation Studio

👤 Customer Details:
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Address: ${formData.location}, ${formData.city}

🛒 Order Items:
${orderLines}

💰 Total: ${formatPrice(total)}

💳 Payment Method: ${paymentMethodText}

📎 Payment Proof: ${proofUrl}

⏳ Awaiting order confirmation`;

      const builtWhatsappUrl = `https://wa.me/233534057109?text=${encodeURIComponent(message)}`;
      setWhatsappUrl(builtWhatsappUrl);
      setShowPaymentProof(false);
      setShowSuccess(true);
      setTimeout(() => {
        window.open(builtWhatsappUrl, '_blank');
      }, 500);
    } catch (error) {
      console.error('Payment proof upload error:', error);
      showToast('Failed to upload payment proof. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClosePaymentProof = () => {
    setShowPaymentProof(false);
  };

  const handleClosePaymentInstructions = () => {
    setShowPaymentInstructions(false);
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag className="w-24 h-24 text-[var(--brand-gold)] mx-auto mb-6" />
          <h1 className="text-4xl font-heading font-bold text-[var(--text-primary)] mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-lg text-[var(--text-muted)] font-body mb-8">
            Discover our premium wig collections and find your perfect piece.
          </p>
          <OutlineButton href="/collections">Shop Collections</OutlineButton>
        </div>
      </div>
    );
  }

  const orderTotal = items.reduce((sum, item) => {
    const price = item.product.onSale && item.product.promoPrice
      ? item.product.promoPrice
      : item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  return (
    <>
      <PaymentInstructionsModal
        isOpen={showPaymentInstructions}
        paymentMethod={formData.paymentMethod}
        orderTotal={orderTotal}
        onConfirm={handlePaymentConfirmed}
        onClose={handleClosePaymentInstructions}
      />

      <PaymentProofModal
        isOpen={showPaymentProof}
        onSubmit={handleProofSubmit}
        onClose={handleClosePaymentProof}
        isUploading={isUploading}
      />

      <OrderSuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        customerName={formData.name}
        whatsappUrl={whatsappUrl}
      />

      <div className="min-h-screen bg-[var(--bg-primary)] overflow-x-hidden">
        <section className="py-12 md:py-16 bg-[var(--bg-primary)] overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center overflow-x-hidden">
            <p className="text-xs font-body uppercase tracking-wider text-[var(--brand-gold)] mb-3 truncate">
              Home / Cart
            </p>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-[var(--text-primary)] mb-3 break-words">
              Your Cart
            </h1>
            <p className="text-base font-body text-[var(--brand-gold)]/80">
              {items.length} items
            </p>
          </div>
        </section>

        <main className="py-6 px-4 sm:px-6 max-w-7xl mx-auto overflow-x-hidden">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 md:gap-8">
            <div className="w-full lg:col-span-3">
              <h2 className="text-xl md:text-2xl font-heading font-bold text-[var(--text-primary)] mb-4 md:mb-6 relative">
                Order Items
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[var(--gradient-gold)]" />
              </h2>

              <div className="space-y-3 md:space-y-4">
                {items.map((item) => (
                  <CartItem key={item.product._id} item={item} />
                ))}
              </div>

              <button
                onClick={handleClearCart}
                className="mt-4 md:mt-6 text-sm text-rose-400 font-body hover:underline"
              >
                Clear Cart
              </button>
            </div>

            <div className="w-full lg:col-span-2">
              <div className="w-full">
                <OrderSummary />
                <CheckoutForm
                  formData={formData}
                  onChange={setFormData}
                  onSubmit={handleFormSubmit}
                  isLoading={isUploading}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default function CartPage() {
  useEffect(() => {
    document.title = 'Your Cart | Hair Elevation Studio';
  }, []);

  return <CartContent />;
}