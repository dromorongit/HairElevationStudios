"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { IProduct } from '@/lib/types';
import { cn, formatPrice, truncateText } from '@/lib/utils';
import { GoldButton } from './GoldButton';
import { Badge } from './Badge';
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
      <div className="group bg-brand-warm-white rounded-card border border-ui-border shadow-card hover:shadow-card_hover transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-card">
          {!product.inStock && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="outOfStock" />
            </div>
          )}
          {product.onSale && product.inStock && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="sale" />
            </div>
          )}
          <Image
            src={product.coverImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-4">
          <h3 className="text-xl font-heading font-bold text-brand-brown mb-2">
            {truncateText(product.name, 30)}
          </h3>

          {product.collections && product.collections.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.collections.slice(0, 2).map((collection, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-brand-gold-light text-brand-brown rounded-pill"
                >
                  {collection}
                </span>
              ))}
            </div>
          )}

          <div className="mb-4">
            {product.onSale && product.promoPrice ? (
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-brand-gold">
                  {formatPrice(product.promoPrice)}
                </span>
                <span className="text-sm text-ui-text-secondary line-through">
                  {formatPrice(product.price)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-brand-gold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <GoldButton
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product);
              }}
              disabled={!product.inStock}
            >
              Add to Cart
            </GoldButton>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(product);
              }}
              className="p-2 rounded-full hover:bg-brand-gold-light transition-colors"
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                className={cn(
                  'w-5 h-5 transition-colors',
                  inWishlist ? 'fill-brand-gold text-brand-gold' : 'text-brand-brown'
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}