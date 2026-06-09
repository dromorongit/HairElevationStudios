"use client";

import { motion } from 'framer-motion';
import { GoldButton } from '@/components/shared/GoldButton';
import { useCartStore } from '@/store/cartStore';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentRef: string;
  customerName: string;
  whatsappUrl: string;
}

export function OrderSuccessModal({ isOpen, onClose, paymentRef, customerName, whatsappUrl }: OrderSuccessModalProps) {
  const { clearCart } = useCartStore();

  const handleContinueShopping = () => {
    clearCart();
    onClose();
  };

  const handleResendWhatsApp = () => {
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <motion.div
        className="bg-[var(--bg-secondary)] rounded-xl p-10 max-w-md w-full mx-4 shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-20 h-20 rounded-full bg-[var(--gradient-gold)] flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-[var(--bg-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-heading font-bold text-[var(--text-primary)] text-center mb-4">
          Order Confirmed! 🎉
        </h2>
        
        <p className="text-base text-[var(--text-muted)] font-body text-center mb-6 leading-relaxed">
          Thank you {customerName}! Your payment was successful. Your order details have been sent to our WhatsApp — we will confirm your order and delivery shortly.
        </p>

        <div className="bg-[rgba(200,169,126,0.1)] border border-[var(--border-gold)] rounded-xl px-4 py-3 mb-6">
          <p className="text-[13px] font-body text-[var(--brand-gold)]">
            📲 WhatsApp is opening automatically to submit your order. If it did not open, tap Resend WhatsApp below.
          </p>
        </div>
        
        <div className="bg-[var(--bg-primary)] rounded-xl px-4 py-2 mb-6">
          <p className="text-sm font-mono text-[var(--brand-gold)] text-center">
            Ref: {paymentRef}
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <GoldButton href="/collections" onClick={handleContinueShopping} size="lg">
            Continue Shopping
          </GoldButton>
          <button
            onClick={handleResendWhatsApp}
            className="px-6 py-3 rounded-full text-sm font-medium border border-[var(--brand-gold)] text-[var(--brand-gold)] hover:bg-[var(--brand-gold)] hover:text-[var(--bg-primary)] transition-colors font-body"
          >
            Resend WhatsApp
          </button>
        </div>
      </motion.div>
    </div>
  );
}