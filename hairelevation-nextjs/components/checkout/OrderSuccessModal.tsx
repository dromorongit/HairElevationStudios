"use client";

import { motion } from 'framer-motion';
import { GoldButton } from '@/components/shared/GoldButton';
import { useCartStore } from '@/store/cartStore';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentRef: string;
  customerName: string;
}

export function OrderSuccessModal({ isOpen, onClose, paymentRef, customerName }: OrderSuccessModalProps) {
  const { clearCart } = useCartStore();

  const handleContinueShopping = () => {
    clearCart();
    onClose();
  };

  const handleResendWhatsApp = () => {
    window.open('https://wa.me/233534057109', '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50">
      <motion.div
        className="bg-brand-warm-white rounded-2xl p-10 max-w-md w-full mx-4 shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-20 h-20 rounded-full bg-[var(--gradient-gold)] flex items-center justify-center mx-auto mb-6 animate-[scaleIn_0.5s_ease_forwards]">
          <svg className="w-10 h-10 text-brand-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-heading font-bold text-brand-brown text-center mb-4">
          Order Confirmed! 🎉
        </h2>
        
        <p className="text-base text-ui-text-secondary font-body text-center mb-6 leading-relaxed">
          Thank you {customerName}! Your payment was successful. Your order details have been sent to our WhatsApp — we will confirm your order and delivery shortly.
        </p>
        
        <div className="bg-brand-cream rounded-xl px-4 py-2 mb-6">
          <p className="text-sm font-mono text-brand-gold text-center">
            Ref: {paymentRef}
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <GoldButton href="/collections" onClick={handleContinueShopping} size="lg">
            Continue Shopping
          </GoldButton>
          <button
            onClick={handleResendWhatsApp}
            className="px-6 py-3 rounded-pill text-sm font-medium border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-brown transition-colors"
          >
            Resend WhatsApp
          </button>
        </div>
      </motion.div>
    </div>
  );
}