"use client";

import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'sale' | 'outOfStock' | 'featured' | 'new';
  label?: string;
  className?: string;
}

const variantClasses = {
  sale: 'bg-[var(--brand-gold)] text-[var(--bg-primary)]',
  outOfStock: 'bg-[rgba(255,255,255,0.1)] text-[var(--text-muted)]',
  featured: 'border border-[var(--brand-gold)] text-[var(--brand-gold)] bg-transparent',
  new: 'bg-[var(--bg-card)] text-[var(--brand-gold)] border border-[var(--border-gold)]',
};

export function Badge({ variant = 'new', label, className }: BadgeProps) {
  const defaultLabels = {
    sale: 'Sale',
    outOfStock: 'Out of Stock',
    featured: 'Featured',
    new: 'New',
  };

  return (
    <span
      className={cn(
        'inline-block px-2 py-0.5 rounded-full font-body uppercase tracking-wider text-[10px]',
        variantClasses[variant],
        className
      )}
    >
      {label || defaultLabels[variant]}
    </span>
  );
}