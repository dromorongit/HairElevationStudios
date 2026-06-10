"use client";

import { useState, useEffect } from 'react';
import { BsChevronUp } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 z-[90] w-12 h-12 rounded-full bg-[var(--gradient-gold)] text-[var(--bg-primary)] flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(200,169,126,0.3)] transition-all duration-300"
          aria-label="Scroll to top"
        >
          <BsChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}