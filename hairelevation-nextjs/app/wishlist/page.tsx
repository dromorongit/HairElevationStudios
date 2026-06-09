"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { GoldButton } from '@/components/shared/GoldButton';
import { ProductCard } from '@/components/shared/ProductCard';

export default function WishlistPage() {
  const items = useWishlistStore(state => state.items);
  const clearWishlist = useWishlistStore(state => state.clearWishlist);

  const handleClearWishlist = () => {
    if (confirm('Are you sure you want to clear your wishlist?')) {
      clearWishlist();
    }
  };

  if (items.length === 0) {
    return (
      <>
        {/* Page Header */}
        <section className="py-20 bg-brand-brown">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-brand-gold/80 font-body uppercase tracking-wider mb-4">
              Home / Wishlist
            </p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-cream mb-4">
              Your Wishlist
            </h1>
            <p className="text-lg text-brand-gold/80 font-body">
              0 saved pieces
            </p>
          </div>
        </section>

        {/* Empty State */}
        <section className="py-20 bg-brand-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Heart className="w-24 h-24 text-brand-gold mx-auto mb-6" />
              <h2 className="text-4xl font-heading font-bold text-brand-brown mb-4">
                Your Wishlist is Empty
              </h2>
              <p className="text-lg text-ui-text-secondary font-body mb-8 max-w-md mx-auto">
                Save your favourite pieces and come back to them anytime.
              </p>
              <GoldButton href="/collections">
                Explore Collections
              </GoldButton>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Page Header */}
      <section className="py-20 bg-brand-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-brand-gold/80 font-body uppercase tracking-wider mb-4">
            Home / Wishlist
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-cream mb-4">
            Your Wishlist
          </h1>
          <p className="text-lg text-brand-gold/80 font-body">
            {items.length} saved pieces
          </p>
        </div>
      </section>

      {/* Wishlist Grid */}
      <section className="py-12 bg-brand-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {items.map((item) => (
                <motion.div
                  key={item.product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  layout
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={item.product} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          <div className="mt-12 text-center">
            <button
              onClick={handleClearWishlist}
              className="px-6 py-3 rounded-pill text-sm font-medium border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-brown transition-colors"
            >
              Clear Wishlist
            </button>
          </div>
        </div>
      </section>
    </>
  );
}