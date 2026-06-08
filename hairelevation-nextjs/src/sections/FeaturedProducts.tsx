/**
 * FeaturedProducts Section
 * Displays featured products on the homepage
 * Luxury presentation with refined spacing
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
      className="featured py-24 px-8 bg-white"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      <div className="container max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={contentContainerVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-[#3B2A23] text-center mb-6 tracking-tight"
            variants={contentItemVariants}
          >
            Featured Collections
          </motion.h2>
          <motion.p
            className="text-center text-[#666666] max-w-2xl mx-auto mb-14 leading-relaxed"
            variants={contentItemVariants}
          >
            Discover our handpicked selection of premium wigs, each crafted with the finest materials 
            and designed to elevate your natural beauty.
          </motion.p>
        </motion.div>

        {isLoading ? (
          <motion.div
            className="flex justify-center items-center py-16"
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
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <ProductGrid products={products} />
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}