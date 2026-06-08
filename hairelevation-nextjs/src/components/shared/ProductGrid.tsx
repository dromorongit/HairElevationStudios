/**
 * ProductGrid Component
 * Responsive grid of product cards
 * Enhanced with luxury motion and staggered reveals
 */

"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types/api/product";
import { ProductCard } from "./ProductCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { collectionGridVariants } from "@/lib/motion-variants";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  isLoading = false,
  emptyMessage = "No products found.",
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 text-[#666666]">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={collectionGridVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </motion.div>
  );
}
