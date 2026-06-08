/**
 * FeaturedProducts Section
 * Displays featured products on the homepage
 * Enhanced with luxury motion and scroll-triggered reveals
 */

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { productService } from "@/services/productService";
import type { Product } from "@/types/api/product";
import {
  sectionVariants,
  contentContainerVariants,
  contentItemVariants,
} from "@/lib/motion-variants";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const data = await productService.getFeaturedProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <motion.section
      ref={ref}
      className="featured py-20 px-5 bg-white"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      <div className="container max-w-[1200px] mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={contentContainerVariants}
        >
          <motion.h2
            className="text-[2rem] sm:text-[2.2rem] font-bold text-[#3B2A23] text-center mb-10 tracking-tight"
            variants={contentItemVariants}
          >
            Featured Collections
          </motion.h2>
        </motion.div>

        {isLoading ? (
          <motion.div
            className="flex justify-center items-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <LoadingSpinner size="lg" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ProductGrid products={products} />
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
