"use client";

import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { GoldButton } from '@/components/shared/GoldButton';
import { CartItem } from '@/components/shared/CartItem';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { CheckoutForm, CheckoutFormData } from '@/components/checkout/CheckoutForm';
import { OrderSuccessModal } from '@/components/checkout/OrderSuccessModal';
import { ToastProvider, useToast } from '@/components/shared/Toast';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

function CartContent() {
  const items = useCartStore(state => state.items);
  const cartTotal = useCartStore(state => state.cartTotal);
  const clearCart = useCartStore(state => state.clearCart);
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    notes: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentRef, setPaymentRef] = useState('');

  useEffect(() => {
    if (!document.querySelector('script[src*="paystack.co"]')) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const openPaystack = (data: CheckoutFormData) => {
    if (!window.PaystackPop) {
      showToast('Payment gateway not available. Please try again.');
      setIsProcessing(false);
      return;
    }

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
      email: data.email,
      amount: Math.round(cartTotal * 100),
      currency: 'GHS',
      ref: 'HES-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
      metadata: {
        custom_fields: [
          {
            display_name: 'Customer Name',
            variable_name: 'customer_name',
            value: data.name,
          },
          {
            display_name: 'Phone',
            variable_name: 'phone',
            value: data.phone,
          },
        ],
      },
      onClose: () => {
        setIsProcessing(false);
      },
      callback: (response: { reference: string }) => {
        handlePaymentSuccess(response.reference);
      },
    });
    handler.openIframe();
  };

  const handleFormSubmit = () => {
    let attempts = 0;
    const maxAttempts = 10;
    
    const pollPaystack = () => {
      if (window.PaystackPop) {
        setIsProcessing(true);
        openPaystack(formData);
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(pollPaystack, 300);
      } else {
        showToast('Payment gateway not available. Please try again.');
      }
    };
    
    pollPaystack();
  };

  const handlePaymentSuccess = (ref: string) => {
    setPaymentRef(ref);
    
    const message = `🛍️ NEW ORDER — Hair Elevation Studio

👤 Customer Details:
Name: ${formData.name}
Phone: ${formData.phone}
Location/Address: ${formData.location}

🛒 Order Items:
${items.map(item => {
  const price = item.product.onSale && item.product.promoPrice 
    ? item.product.promoPrice 
    : item.product.price;
  return `- ${item.quantity}x ${item.product.name}${item.selectedSize ? ' (' + item.selectedSize + ')' : ''} — GHS ${price}`;
}).join('\n')}

💰 Total: GHS ${cartTotal.toFixed(2)}

Payment Reference: ${ref}

✅ Payment confirmed via Paystack`;

    window.open('https://wa.me/233534057109?text=' + encodeURIComponent(message), '_blank');
    setShowSuccess(true);
    setIsProcessing(false);
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-warm-white flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag className="w-24 h-24 text-brand-gold mx-auto mb-6" />
          <h1 className="text-4xl font-heading font-bold text-brand-brown mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-lg text-ui-text-secondary font-body mb-8">
            Discover our premium wig collections and find your perfect piece.
          </p>
          <GoldButton href="/collections">Shop Collections</GoldButton>
        </div>
      </div>
    );
  }

  return (
    <>
      <OrderSuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        paymentRef={paymentRef}
        customerName={formData.name}
      />

      <div className="min-h-screen bg-brand-warm-white">
        <section className="py-16 bg-brand-brown">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-xs text-brand-gold/80 font-body uppercase tracking-wider mb-4">
              Home / Cart
            </p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-cream mb-4">
              Your Cart
            </h1>
            <p className="text-lg text-brand-gold/80 font-body">
              {items.length} items
            </p>
          </div>
        </section>

        <main className="py-8 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-heading font-bold text-brand-brown mb-6 relative">
                Order Items
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[var(--gradient-gold)]"></span>
              </h2>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.product._id} item={item} />
                ))}
              </div>
              
              <button
                onClick={handleClearCart}
                className="mt-6 text-sm text-rose-600 font-body hover:underline"
              >
                Clear Cart
              </button>
            </div>
            
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <OrderSummary />
                <CheckoutForm 
                  formData={formData} 
                  onChange={setFormData} 
                  onSubmit={handleFormSubmit} 
                  isLoading={isProcessing} 
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
  return (
    <ToastProvider>
      <CartContent />
    </ToastProvider>
  );
}