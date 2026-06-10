"use client";

import { motion } from 'framer-motion';
import { GoldButton } from '@/components/shared/GoldButton';
import { useCartStore } from '@/store/cartStore';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
  whatsappUrl: string;
  onCartClear?: () => void;
}

export function OrderSuccessModal({ isOpen, onClose, customerName, whatsappUrl, onCartClear }: OrderSuccessModalProps) {
  const { clearCart } = useCartStore();

  const handleDone = () => {
    clearCart();
    onClose();
    onCartClear?.();
  };

  const handleResendWhatsApp = () => {
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] overflow-x-hidden">
      <motion.div
        className="bg-[var(--bg-secondary)] rounded-xl p-6 sm:p-8 max-w-full w-full mx-4 max-h-[85vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[var(--gradient-gold)] flex items-center justify-center mx-auto mb-4 sm:mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--bg-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </motion.div>

        <h2 className="text-xl sm:text-2xl font-heading font-bold text-[var(--text-primary)] text-center mb-3 sm:mb-4">
          Order Confirmed! 🎉
        </h2>

        <p className="text-sm sm:text-base text-[var(--text-muted)] font-body text-center mb-4 sm:mb-6 leading-relaxed break-words">
          Thank you {customerName}! Your order has been placed successfully. Your payment proof has been submitted and your order details have been sent to our WhatsApp — we will confirm your order and delivery shortly.
        </p>

        <div className="bg-[rgba(200,169,126,0.1)] border border-[var(--border-gold)] rounded-xl px-3 py-2 sm:px-4 sm:py-3 mb-4 sm:mb-6">
          <p className="text-xs sm:text-[13px] font-body text-[var(--brand-gold)] break-words">
            📲 WhatsApp is opening automatically to submit your order. If it did not open, tap Resend WhatsApp below.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <GoldButton href="/collections" onClick={handleDone} size="lg" className="w-full">
            Done (Clear Cart)
          </GoldButton>
          <button
            onClick={handleResendWhatsApp}
            className="px-6 py-3 rounded-full text-sm font-medium border border-[var(--brand-gold)] text-[var(--brand-gold)] hover:bg-[var(--brand-gold)] hover:text-[var(--bg-primary)] transition-colors font-body w-full"
          >
            Resend WhatsApp
          </button>
        </div>
      </motion.div>
    </div>
  );
}