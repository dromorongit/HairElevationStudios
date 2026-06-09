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
        'bg-brand-cream rounded-xl p-5 border border-ui-border',
        className
      )}
    >
      <h3 className="text-lg font-heading font-semibold text-brand-brown mb-4">
        Product Details
      </h3>
      
      <div className="space-y-0">
        {visibleSpecs.map((spec, index) => (
          <div
            key={spec.label}
            className={cn(
              'flex justify-between items-center py-3',
              index < visibleSpecs.length - 1 && 'border-b border-brand-gold/15'
            )}
          >
            <span className="text-sm font-body font-medium text-brand-brown/70">
              {spec.label}
            </span>
            <span
              className={cn(
                'text-sm font-body text-brand-brown',
                spec.label === 'Stock Status' && !product.inStock && 'text-red-600'
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