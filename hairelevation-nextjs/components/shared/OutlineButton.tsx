"use client";

import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface OutlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function OutlineButton({
  children,
  href,
  size = 'md',
  className,
  disabled,
  ...props
}: OutlineButtonProps) {
  const baseClasses = cn(
    'font-medium rounded-pill transition-all duration-300 inline-flex items-center justify-center uppercase tracking-widest font-body',
    'bg-transparent border border-[var(--brand-gold)] text-[var(--brand-gold)]',
    'hover:bg-[var(--brand-gold)] hover:text-[var(--bg-primary)]',
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
}