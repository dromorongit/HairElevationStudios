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
        <section className="py-12 md:py-16 bg-[var(--bg-primary)] overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center overflow-x-hidden">
            <p className="text-xs font-body uppercase tracking-wider text-[var(--brand-gold)] mb-3 truncate">
              Home / Wishlist
            </p>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-[var(--text-primary)] mb-3 break-words">
              Your Wishlist
            </h1>
            <p className="text-base font-body text-[var(--text-muted)]">
              0 saved pieces
            </p>
          </div>
        </section>

        {/* Empty State */}
        <section className="py-12 bg-[var(--bg-secondary)] overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Heart className="w-20 h-20 md:w-24 md:h-24 text-[var(--brand-gold)] mx-auto mb-5 md:mb-6" />
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-[var(--text-primary)] mb-3 md:mb-4 break-words">
                Your Wishlist is Empty
              </h2>
              <p className="text-base md:text-lg font-body text-[var(--text-muted)] mb-6 md:mb-8 max-w-md mx-auto break-words">
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
      <section className="py-12 md:py-16 bg-[var(--bg-primary)] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center overflow-x-hidden">
          <p className="text-xs font-body uppercase tracking-wider text-[var(--brand-gold)] mb-3 truncate">
            Home / Wishlist
          </p>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-[var(--text-primary)] mb-3 break-words">
            Your Wishlist
          </h1>
          <p className="text-base font-body text-[var(--text-muted)]">
            {items.length} saved pieces
          </p>
        </div>
      </section>

      {/* Wishlist Grid */}
      <section className="py-10 md:py-12 bg-[var(--bg-secondary)] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <AnimatePresence mode="wait">
<div
               className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
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

          <div className="mt-10 md:mt-12 text-center">
            <button
              onClick={handleClearWishlist}
              className="px-6 py-3 rounded-full text-sm font-medium border border-[var(--brand-gold)] text-[var(--brand-gold)] hover:bg-[var(--brand-gold)] hover:text-[var(--bg-primary)] transition-colors font-body"
            >
              Clear Wishlist
            </button>
          </div>
        </div>
      </section>
    </>
  );
}