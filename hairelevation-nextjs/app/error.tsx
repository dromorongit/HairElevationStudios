"use client";

import { BsExclamationCircle } from 'react-icons/bs';
import { GoldButton } from '@/components/shared/GoldButton';
import { OutlineButton } from '@/components/shared/OutlineButton';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-[#3B2A23] flex items-center justify-center overflow-x-hidden px-4">
      <div className="text-center max-w-md">
        <BsExclamationCircle className="w-12 h-12 text-[var(--brand-gold)] mx-auto mb-6" />
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-[var(--text-primary)] mb-3">
          Something went wrong
        </h2>
        <p className="text-sm md:text-base font-body text-[var(--text-muted)] mb-6">
          We apologize for the inconvenience. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <GoldButton onClick={reset}>Try Again</GoldButton>
          <OutlineButton href="/">Go Home</OutlineButton>
        </div>
      </div>
    </div>
  );
}