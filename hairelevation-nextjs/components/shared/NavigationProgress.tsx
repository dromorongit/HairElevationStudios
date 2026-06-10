"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function NavigationProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const timer = setTimeout(() => setProgress(100), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ width: '0%' }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed top-0 left-0 h-0.5 bg-[var(--gradient-gold)] z-[100]"
    />
  );
}