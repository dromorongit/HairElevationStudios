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

const collectionOptions = ['All', 'The Bridal Crowns', 'The Everyday Crown', "The Queen's Curls", 'The Signature Pixies'];
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
      <section className="py-20 bg-brand-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-brand-gold/80 font-body uppercase tracking-wider mb-4">
            Home / Collections
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-cream mb-4">
            Our Collections
          </h1>
          <div className="w-16 h-0.5 bg-[var(--gradient-gold)] mx-auto mb-4" />
          <p className="text-lg text-brand-cream/80 font-body max-w-2xl mx-auto">
            Discover our premium wig collections crafted for every queen.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 z-40 bg-brand-warm-white py-4 border-b border-brand-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Collection Tabs */}
            <div className="flex-1 overflow-x-auto">
              <div className="flex items-center gap-2">
                {collectionOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => setSelectedCollection(option)}
                    className={cn(
                      'px-4 py-2 rounded-pill text-sm font-medium whitespace-nowrap transition-all',
                      selectedCollection === option
                        ? 'bg-[var(--gradient-gold)] text-brand-brown'
                        : 'bg-transparent text-ui-text-secondary border border-brand-gold/30 hover:border-brand-gold/50'
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle Filters and Sort */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-ui-text-secondary font-body">
                {filteredProducts.length} products found
              </span>

              <button
                onClick={() => setOnSale(!onSale)}
                className={cn(
                  'px-3 py-1.5 rounded-pill text-sm font-medium transition-all',
                  onSale
                    ? 'bg-brand-gold text-brand-brown'
                    : 'bg-transparent border border-brand-gold/50 text-brand-gold'
                )}
              >
                On Sale
              </button>

              <button
                onClick={() => setInStock(!inStock)}
                className={cn(
                  'px-3 py-1.5 rounded-pill text-sm font-medium transition-all',
                  inStock
                    ? 'bg-brand-gold text-brand-brown'
                    : 'bg-transparent border border-brand-gold/50 text-brand-gold'
                )}
              >
                In Stock
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-pill text-sm font-medium bg-transparent border border-brand-gold/50 text-brand-gold focus:outline-none focus:border-brand-gold"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option} className="bg-brand-brown">
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-brand-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-brand-warm-white rounded-card border border-ui-border shadow-card animate-pulse"
                  >
                    <div className="aspect-[3/4] bg-gradient-to-r from-brand-gold/20 via-brand-gold/10 to-brand-gold/20 rounded-t-card" />
                    <div className="p-4">
                      <div className="h-6 bg-brand-gold/20 rounded mb-2" />
                      <div className="h-4 bg-brand-gold/15 rounded mb-4 w-2/3" />
                      <div className="h-10 bg-brand-gold/20 rounded" />
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
                <h3 className="text-2xl font-heading text-brand-brown mb-4">No products found</h3>
                <p className="text-ui-text-secondary font-body mb-6">
                  Try adjusting your filters to discover more options.
                </p>
                <GoldButton onClick={clearFilters}>Clear Filters</GoldButton>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
      <div className="min-h-screen bg-brand-warm-white flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CollectionsContent />
    </Suspense>
  );
}