"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BsTelegram } from 'react-icons/bs';
import { GoldButton } from '@/components/shared/GoldButton';

interface TelegramRevealModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
}

const TELEGRAM_LINK = 'https://t.me/+fVUU6CuUE4EwNzI0';

export function TelegramRevealModal({ isOpen, onClose, studentName }: TelegramRevealModalProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        window.open(TELEGRAM_LINK, '_blank');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleJoinTelegram = () => {
    window.open(TELEGRAM_LINK, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] overflow-x-hidden">
      <motion.div
        className="bg-[#2A1E18] border-2 border-[#C8A97E] rounded-2xl p-8 sm:p-10 max-w-md w-full mx-4"
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
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#3B2A23]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </motion.div>

        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--text-primary)] text-center mb-3 sm:mb-4">
          You're In! 🎉
        </h2>

        <p className="text-sm sm:text-base text-[var(--text-muted)] font-body text-center mb-4 sm:mb-6 leading-relaxed break-words">
          Welcome {studentName}! Your payment has been verified. Click the button below to join the Pixie Cut Virtual Class Telegram group.
        </p>

        <div className="bg-[rgba(200,169,126,0.1)] border border-[var(--border-gold)] rounded-xl px-3 py-2 sm:px-4 sm:py-3 mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm font-body text-[var(--brand-gold)] break-words">
            This link gives you access to the private class group. Please do not share it.
          </p>
        </div>

        <GoldButton
          onClick={handleJoinTelegram}
          size="lg"
          className="w-full bg-[#229ED9] text-white hover:opacity-90 mb-4"
        >
          <BsTelegram className="w-5 h-5 mr-2" />
          Join Telegram Group
        </GoldButton>

        <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body text-center">
          Having trouble? Contact us on WhatsApp: 0534057109
        </p>
      </motion.div>
    </div>
  );
}