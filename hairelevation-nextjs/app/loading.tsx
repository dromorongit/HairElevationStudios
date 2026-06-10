"use client";

import { motion } from 'framer-motion';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#3B2A23] flex items-center justify-center overflow-x-hidden">
      <div className="text-center">
        <motion.img
          src="/assets/images/HESLOGO.PNG"
          alt="Hair Elevation Studio"
          className="h-20 w-auto mb-4 filter brightness-0 invert mx-auto"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        />
        <LoadingSpinner size="lg" />
        <p className="text-xs font-body uppercase tracking-widest text-[var(--brand-gold)] mt-4">
          Hair Elevation Studio
        </p>
      </div>
    </div>
  );
}