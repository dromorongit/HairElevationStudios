"use client";

import { useState, useEffect } from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import { motion } from 'framer-motion';

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        className="relative"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-30"
          animate={{ scale: [1, 1.8] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
          style={{ zIndex: -1 }}
        />

        <motion.button
          onClick={() => window.open('https://wa.me/233534057109', '_blank', 'noopener,noreferrer')}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-[0_4px_20px_rgba(37,211,102,0.4)] flex items-center justify-center"
          aria-label="Chat with us on WhatsApp"
        >
          <BsWhatsapp className="w-6 h-6 text-white" />
        </motion.button>

        {showTooltip && (
          <motion.span
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 10, opacity: 0 }}
            className="absolute right-full mr-3 px-3 py-1.5 bg-[#3B2A23] text-[#F5EFE6] text-xs font-body rounded-full border border-[var(--brand-gold)]"
          >
            Chat with us
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}