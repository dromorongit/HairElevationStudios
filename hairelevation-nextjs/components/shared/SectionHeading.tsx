"use client";

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  label?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ title, subtitle, label, align = 'left', className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-12', align === 'center' ? 'text-center' : 'text-left', className)}>
      {label && (
        <p className="text-[11px] font-body uppercase tracking-[0.15em] text-[var(--brand-gold)] mb-3">
          {label}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[var(--text-primary)] mb-4">
        {title}
      </h2>
      <motion.div
        className="h-0.5 bg-[var(--gradient-gold)]"
        initial={{ width: 0 }}
        whileInView={{ width: align === 'center' ? '40px' : '40px' }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ margin: align === 'center' ? '0 auto 16px' : '0 0 16px' }}
      />
      {subtitle && (
        <p className="text-lg text-[var(--text-muted)] font-body max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}