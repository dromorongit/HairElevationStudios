"use client";

import { motion } from 'framer-motion';
import { GoldButton } from '@/components/shared/GoldButton';
import { OutlineButton } from '@/components/shared/OutlineButton';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#3B2A23] flex items-center justify-center overflow-x-hidden">
      <motion.div
        className="relative text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-9xl font-heading italic text-[var(--brand-gold)]/15 absolute top-0 left-1/2 -translate-x-1/2 -z-10">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-[var(--text-primary)] mb-4">
          Page Not Found
        </h2>
        <p className="text-base md:text-lg font-body text-[var(--text-muted)] mb-8 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <GoldButton href="/">Go Home</GoldButton>
          <OutlineButton href="/collections">Shop Collections</OutlineButton>
        </div>
      </motion.div>
    </div>
  );
}