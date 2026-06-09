import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'sale' | 'outOfStock' | 'featured' | 'new';
  label?: string;
  className?: string;
}

const variantClasses = {
  sale: 'bg-brand-gold text-brand-brown',
  outOfStock: 'bg-brand-brown text-brand-cream',
  featured: 'bg-brand-brown-dark text-brand-gold',
  new: 'bg-brand-cream text-brand-brown border border-brand-gold',
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
        'inline-block px-3 py-1 rounded-pill text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {label || defaultLabels[variant]}
    </span>
  );
}