"use client";

import { IProduct } from '@/lib/types';
import { cn, toArray } from '@/lib/utils';

interface ProductSpecsProps {
  product: IProduct;
  className?: string;
}

export function ProductSpecs({ product, className }: ProductSpecsProps) {
  const specs: Array<{ label: string; value: string | undefined }> = [
    { label: 'Length', value: product.length },
    { label: 'Lace Type', value: product.lace },
    { label: 'Density', value: product.density },
    { label: 'Texture', value: product.texture },
    { label: 'Quality', value: product.quality },
    { label: 'Color', value: toArray(product.color).join(', ') },
    { label: 'Stock Status', value: product.inStock ? 'In Stock' : 'Out of Stock' },
  ];

  const visibleSpecs = specs.filter((spec) => spec.value);

  if (visibleSpecs.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'bg-[var(--bg-secondary)] rounded-xl p-5 border border-[var(--border-gold)]',
        className
      )}
    >
      <h3 className="text-lg font-heading font-semibold text-[var(--text-primary)] mb-4">
        Product Details
      </h3>

      <div className="space-y-0">
        {visibleSpecs.map((spec, index) => (
          <div
            key={spec.label}
            className={cn(
              'flex justify-between items-center py-3',
              index < visibleSpecs.length - 1 && 'border-b border-[var(--border-gold)]'
            )}
          >
            <span className="text-sm font-body font-medium text-[var(--text-muted)]">
              {spec.label}
            </span>
            <span
              className={cn(
                'text-sm font-body text-[var(--text-primary)]',
                spec.label === 'Stock Status' && !product.inStock && 'text-red-400'
              )}
            >
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}