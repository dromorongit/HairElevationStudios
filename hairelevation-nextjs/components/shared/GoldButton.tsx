"use client";

import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface GoldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function GoldButton({
  children,
  href,
  variant = 'solid',
  size = 'md',
  className,
  disabled,
  ...props
}: GoldButtonProps) {
  const baseClasses = cn(
    'font-medium rounded-pill transition-all duration-300 inline-flex items-center justify-center',
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  const solidClasses = cn(
    'text-brand-brown bg-[var(--gradient-gold)] shadow-gold_glow',
    !disabled && 'hover:shadow-gold_glow_strong hover:-translate-y-1 shimmer-effect'
  );

  const outlineClasses = cn(
    'bg-transparent border border-brand-gold text-brand-gold',
    !disabled && 'hover:bg-brand-gold hover:text-brand-brown'
  );

  const classes = variant === 'solid'
    ? cn(baseClasses, solidClasses)
    : cn(baseClasses, outlineClasses);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}