"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { getProductById, getAllProducts } from '@/lib/api';
import { IProduct } from '@/lib/types';
import { cn, formatPrice, toArray } from '@/lib/utils';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Badge } from '@/components/shared/Badge';
import { GoldButton } from '@/components/shared/GoldButton';
import { OutlineButton } from '@/components/shared/OutlineButton';
import { ImageGallery } from '@/components/shared/ImageGallery';
import { ProductSpecs } from '@/components/shared/ProductSpecs';
import { RelatedProducts } from '@/components/shared/RelatedProducts';
import { ToastProvider, useToast } from '@/components/shared/Toast';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { BsHeart, BsHeartFill, BsWhatsapp, BsLink, BsDash, BsPlus } from 'react-icons/bs';

interface ProductInfoProps {
  product: IProduct;
}

function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cartSuccess, setCartSuccess] = useState(false);
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = () => {
    addItem(product, selectedSize || undefined);
    setCartSuccess(true);
    showToast(`${product.name} added to cart`);
    setTimeout(() => setCartSuccess(false), 2000);
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
  };

  const handleQuantityChange = (change: number) => {
    const max = Math.max(product.stock || 10, 1);
    setQuantity((prev) => Math.min(Math.max(prev + change, 1), max));
  };

  const handleWhatsAppShare = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      const message = encodeURIComponent(`Check out this wig from Hair Elevation Studio:`);
      window.open(`https://wa.me/?text=${message}%20${url}`, '_blank');
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard');
    }
  };

  const sizeOptions = toArray(product.size);

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      <motion.div
        className="flex items-center gap-2 mb-4 flex-wrap"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {product.featured && <Badge variant="featured" />}
        {product.onSale && product.inStock && <Badge variant="sale" />}
        {!product.inStock && <Badge variant="outOfStock" />}
        {toArray(product.collections).length > 0 && (
          <>
            {toArray(product.collections).map((collection, index) => (
              <span
                key={index}
                className="text-[10px] px-3 py-1 border border-[var(--brand-gold)] rounded-full text-[var(--text-primary)] font-body uppercase tracking-wider"
              >
                {collection}
              </span>
            ))}
          </>
        )}
      </motion.div>

      <motion.h1
        className="text-2xl md:text-4xl font-heading font-bold text-[var(--text-primary)] mt-3 mb-4"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {product.name}
      </motion.h1>

      <motion.div
        className="mb-6"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {product.onSale && product.promoPrice ? (
          <div className="flex items-baseline gap-3">
            <span className="text-2xl md:text-3xl font-bold text-[var(--brand-gold)]">
              {formatPrice(product.promoPrice)}
            </span>
            <span className="text-base md:text-lg text-[var(--text-muted)] line-through">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs bg-[var(--brand-gold)] text-[var(--bg-primary)] px-2 py-1 rounded-full font-body font-medium">
              Save GHS {(product.price - product.promoPrice).toFixed(2)}
            </span>
          </div>
        ) : (
          <span className="text-2xl md:text-3xl font-bold text-[var(--brand-gold)]">
            {formatPrice(product.price)}
          </span>
        )}
      </motion.div>

      <motion.div
        className="border-b border-[var(--border-gold)] mb-6"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      />

      {sizeOptions.length > 0 && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-3 font-body">
            Select Size
          </label>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all font-body uppercase tracking-wider',
                  selectedSize === size
                    ? 'bg-[var(--gradient-gold)] text-[var(--bg-primary)]'
                    : 'bg-[var(--bg-secondary)] border border-[var(--brand-gold)] text-[var(--text-primary)] hover:bg-[var(--brand-gold)]/10'
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        className="mb-6"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-3 font-body">
          Quantity
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-10 h-10 rounded-full border border-[var(--brand-gold)] flex items-center justify-center text-[var(--brand-gold)] hover:bg-[var(--brand-gold)]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <BsDash className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-body text-lg text-[var(--text-primary)]">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= (product.stock || 10)}
              className="w-10 h-10 rounded-full border border-[var(--brand-gold)] flex items-center justify-center text-[var(--brand-gold)] hover:bg-[var(--brand-gold)]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <BsPlus className="w-4 h-4" />
            </button>
          </div>
          {product.stock > 0 && product.stock <= 5 && (
            <span className="text-sm text-[var(--brand-gold)] font-body">
              Only {product.stock} left
            </span>
          )}
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col gap-3 mt-6"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
      >
        <GoldButton
          size="lg"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {!product.inStock
            ? 'Out of Stock'
            : cartSuccess
            ? 'Added! ✓'
            : 'Add to Cart'}
        </GoldButton>

        <OutlineButton
          size="lg"
          onClick={handleWishlistToggle}
        >
          {inWishlist ? (
            <BsHeartFill className="w-4 h-4 mr-2 text-[var(--brand-gold)]" />
          ) : (
            <BsHeart className="w-4 h-4 mr-2 text-[var(--brand-gold)]" />
          )}
          {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </OutlineButton>
      </motion.div>

      <motion.div
        className="border-b border-[var(--border-gold)] my-6"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      />

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.9 }}
      >
        <ProductSpecs product={product} />
      </motion.div>

      {product.description && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 1.0 }}
        >
          <h3 className="text-lg font-heading font-semibold text-[var(--text-primary)] mb-2">
            Description
          </h3>
          <p className="text-sm text-[var(--text-muted)] font-body leading-relaxed">
            {product.description}
          </p>
        </motion.div>
      )}

      <motion.div
        className="flex items-center gap-3 mt-8"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 1.1 }}
      >
        <span className="text-sm text-[var(--text-muted)] font-body">Share:</span>
        <button
          onClick={handleWhatsAppShare}
          className="p-2 rounded-full hover:bg-[var(--brand-gold)]/10 transition-colors"
          aria-label="Share on WhatsApp"
        >
          <BsWhatsapp className="w-4 h-4 text-[var(--brand-gold)]" />
        </button>
        <button
          onClick={handleCopyLink}
          className="p-2 rounded-full hover:bg-[var(--brand-gold)]/10 transition-colors"
          aria-label="Copy link"
        >
          <BsLink className="w-4 h-4 text-[var(--brand-gold)]" />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<IProduct | null>(null);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, productsData] = await Promise.all([
          getProductById(id),
          getAllProducts(),
        ]);
        setProduct(productData);
        setAllProducts(productsData);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <ToastProvider>
        <LoadingSpinner fullPage />
      </ToastProvider>
    );
  }

  if (!product) {
    return (
      <ToastProvider>
        <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
          <div className="text-center">
            <svg className="w-16 h-16 text-[var(--brand-gold)] mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m8-1V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10z" />
            </svg>
            <h1 className="text-3xl font-heading font-bold text-[var(--text-primary)] mb-2">
              Product Not Found
            </h1>
            <p className="text-[var(--text-muted)] font-body mb-6">
              This product may have been removed or is no longer available.
            </p>
            <GoldButton href="/collections">Back to Collections</GoldButton>
          </div>
        </div>
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[var(--bg-primary)]">
        <nav className="pt-6 pb-4 px-4 sm:px-6 max-w-7xl mx-auto">
          <p className="text-xs font-body text-[var(--text-muted)]">
            Home <span className="text-[var(--brand-gold)]">/</span> Collections{' '}
            <span className="text-[var(--brand-gold)]">/</span> <span className="text-[var(--text-primary)]">{product.name}</span>
          </p>
        </nav>

        <main className="py-6 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ImageGallery
                images={[product.coverImage, ...(product.additionalImages || [])]}
                videos={product.videos || []}
                productName={product.name}
              />
            </motion.div>

            <ProductInfo product={product} />
          </div>
        </main>

        <RelatedProducts currentProduct={product} allProducts={allProducts} />
      </div>
    </ToastProvider>
  );
}