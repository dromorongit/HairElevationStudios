"use client";

import { Suspense } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { getAllProducts } from '@/lib/api';
import { IProduct } from '@/lib/types';
import { ProductCard } from '@/components/shared/ProductCard';
import { GoldButton } from '@/components/shared/GoldButton';
import { cn, toArray } from '@/lib/utils';

const collectionOptions = ['All', 'Straight', 'Wavy/Layers/Bouncy', 'Curly', 'Pixie Cut'];
const sortOptions = ['Default', 'Price: Low to High', 'Price: High to Low', 'Newest First'];

function CollectionsContent() {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const [selectedCollection, setSelectedCollection] = useState('All');
  const [onSale, setOnSale] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [sortBy, setSortBy] = useState('Default');

  useEffect(() => {
    const collectionParam = searchParams.get('collection');
    if (collectionParam) {
      const decoded = decodeURIComponent(collectionParam);
      if (collectionOptions.includes(decoded)) {
        setSelectedCollection(decoded);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    getAllProducts()
      .then(setAllProducts)
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (selectedCollection !== 'All') {
      result = result.filter(product =>
        toArray(product.collections).includes(selectedCollection)
      );
    }

    if (onSale) {
      result = result.filter(product => product.onSale);
    }

    if (inStock) {
      result = result.filter(product => product.inStock);
    }

    switch (sortBy) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Newest First':
        result.sort((a, b) => {
          if (!a.createdAt || !b.createdAt) return 0;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        break;
      default:
        break;
    }

    return result;
  }, [allProducts, selectedCollection, onSale, inStock, sortBy]);

  const clearFilters = () => {
    setSelectedCollection('All');
    setOnSale(false);
    setInStock(false);
    setSortBy('Default');
  };

  return (
    <>
      {/* Page Header */}
      <section className="py-16 md:py-20 bg-[var(--bg-primary)] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center overflow-x-hidden">
          <p className="text-[11px] font-body uppercase tracking-wider text-[var(--brand-gold)] mb-4 truncate">
            Home / Collections
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[var(--text-primary)] mb-4 break-words">
            Our Collections
          </h1>
          <div className="w-16 h-0.5 bg-[var(--gradient-gold)] mx-auto mb-4" />
          <p className="text-base lg:text-lg font-body text-[var(--text-muted)] max-w-2xl mx-auto">
            Discover our premium wig collections crafted for every queen.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 z-40 bg-[var(--bg-primary)] py-4 border-b border-[var(--border-gold)] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Collection Tabs */}
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2 pb-1">
                {collectionOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => setSelectedCollection(option)}
                    className={cn(
                      'px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all font-body uppercase tracking-wider flex-shrink-0',
                      selectedCollection === option
                        ? 'bg-[var(--gradient-gold)] text-[var(--bg-primary)]'
                        : 'bg-transparent text-[var(--brand-gold)] border border-[var(--brand-gold)] hover:border-[rgba(200,169,126,0.5)]'
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle Filters and Sort */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-xs font-body text-[var(--text-muted)]">
                {filteredProducts.length} products
              </span>

              <button
                onClick={() => setOnSale(!onSale)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-all font-body uppercase tracking-wider flex-shrink-0',
                  onSale
                    ? 'bg-[var(--brand-gold)] text-[var(--bg-primary)]'
                    : 'bg-transparent border border-[var(--brand-gold)] text-[var(--brand-gold)]'
                )}
              >
                On Sale
              </button>

              <button
                onClick={() => setInStock(!inStock)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-all font-body uppercase tracking-wider flex-shrink-0',
                  inStock
                    ? 'bg-[var(--brand-gold)] text-[var(--bg-primary)]'
                    : 'bg-transparent border border-[var(--brand-gold)] text-[var(--brand-gold)]'
                )}
              >
                In Stock
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--bg-secondary)] border border-[var(--brand-gold)] text-[var(--brand-gold)] font-body focus:outline-none"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option} className="bg-[var(--bg-primary)] font-body">
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-[var(--bg-primary)] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-gold)] animate-pulse"
                  >
                    <div className="aspect-[4/5] bg-gradient-to-r from-[var(--brand-gold)]/20 via-[var(--brand-gold)]/10 to-[var(--brand-gold)]/20 rounded-t-xl" />
                    <div className="p-3">
                      <div className="h-5 bg-[var(--brand-gold)]/20 rounded mb-2" />
                      <div className="h-3 bg-[var(--brand-gold)]/15 rounded mb-3 w-2/3" />
                      <div className="h-8 bg-[var(--brand-gold)]/20 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="text-6xl mb-4">✨</div>
                <h3 className="text-2xl font-heading text-[var(--text-primary)] mb-4">No products found</h3>
                <p className="text-sm font-body text-[var(--text-muted)] mb-6">
                  Try adjusting your filters to discover more options.
                </p>
                <GoldButton onClick={clearFilters}>Clear Filters</GoldButton>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{
                  initial: {},
                  animate: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    layout
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[var(--brand-gold)] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CollectionsContent />
    </Suspense>
  );
}