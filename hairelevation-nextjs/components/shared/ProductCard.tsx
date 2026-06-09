"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { IProduct } from '@/lib/types';
import { cn, formatPrice, truncateText, toArray } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);

  return (
    <Link href={`/products/${product._id}`} className="block">
      <motion.div
        className="group bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-gold)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:border-[rgba(200,169,126,0.3)] h-full flex flex-col overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
<div className="relative aspect-[4/5] overflow-hidden rounded-t-xl">
              {!product.inStock && (
                <div className="absolute top-2 left-2 z-10">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider bg-[rgba(255,255,255,0.1)] text-[rgba(245,239,230,0.6)]">
                    Out of Stock
                  </span>
                </div>
              )}
              {product.onSale && product.inStock && (
                <div className="absolute top-2 left-2 z-10">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider bg-[var(--brand-gold)] text-[var(--bg-primary)]">
                    Sale
                  </span>
                </div>
              )}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[rgba(59,42,35,0.7)] backdrop-blur-sm flex items-center justify-center hover:bg-[var(--brand-gold)] transition-colors"
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart
                  className={cn(
                    'w-3.5 h-3.5 transition-colors',
                    inWishlist ? 'fill-[var(--brand-gold)] text-[var(--brand-gold)]' : 'text-[rgba(245,239,230,0.7)]'
                  )}
                />
              </button>
              <Image
                src={product.coverImage}
                alt={product.name}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[rgba(59,42,35,0.8)] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

        <div className="flex flex-col flex-1 px-3 pt-2 pb-3">
          <h3 className="text-[13px] font-medium text-[var(--text-primary)] truncate mb-1 font-body">
            {truncateText(product.name, 30)}
          </h3>

          {toArray(product.collections).length > 0 && (
            <p className="text-[11px] text-[var(--text-gold)] uppercase tracking-wider truncate mb-2 font-body">
              {toArray(product.collections)[0]}
            </p>
          )}

          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[14px] font-bold text-[var(--brand-gold)] font-body">
                {formatPrice(product.onSale && product.promoPrice ? product.promoPrice : product.price)}
              </span>
              {product.onSale && product.promoPrice && (
                <span className="text-[11px] line-through text-[var(--text-muted)]">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product);
              }}
              disabled={!product.inStock}
              className="w-full h-9 rounded-full border border-[var(--brand-gold)] text-[var(--text-primary)] font-body text-[12px] uppercase tracking-widest bg-transparent hover:bg-[var(--brand-gold)] hover:text-[var(--bg-primary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}