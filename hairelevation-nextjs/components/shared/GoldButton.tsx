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
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-10 py-4 text-base',
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
    'font-medium rounded-pill transition-all duration-300 inline-flex items-center justify-center overflow-hidden uppercase tracking-widest',
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  const solidClasses = cn(
    'text-[var(--bg-primary)] bg-[var(--gradient-gold)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
    !disabled && 'hover:shadow-[0_0_20px_rgba(200,169,126,0.2)]'
  );

  const outlineClasses = cn(
    'bg-transparent border border-[var(--brand-gold)] text-[var(--brand-gold)]',
    !disabled && 'hover:bg-[var(--brand-gold)] hover:text-[var(--bg-primary)]'
  );

  const classes = variant === 'solid'
    ? cn(baseClasses, solidClasses)
    : cn(baseClasses, outlineClasses);

  const content = (
    <>
      <span className="relative z-10 font-body">{children}</span>
      {variant === 'solid' && !disabled && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.2)] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(classes, 'group')}>
        {content}
      </Link>
    );
  }

  return (
    <button className={cn(classes, 'group')} disabled={disabled} {...props}>
      {content}
    </button>
  );
}