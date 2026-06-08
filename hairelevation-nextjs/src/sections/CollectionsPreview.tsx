/**
 * CollectionsPreview Section
 * Displays all collections on the homepage
 * Enhanced with luxury motion and scroll-triggered reveals
 */

"use client";

import { motion } from "framer-motion";
import { CollectionsGrid } from "@/components/shared/CollectionCard";
import {
  sectionVariants,
  contentContainerVariants,
  contentItemVariants,
  collectionGridVariants,
} from "@/lib/motion-variants";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function CollectionsPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      className="collections py-20 px-5 bg-gradient-to-b from-white to-[#F5EFE6]"
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
            className="text-[2rem] sm:text-[2.2rem] font-bold text-[#3B2A23] text-center mb-4 tracking-tight"
            variants={contentItemVariants}
          >
            Our Collections
          </motion.h2>
          <motion.p
            className="text-center text-[#666666] mb-12 max-w-2xl mx-auto text-lg leading-relaxed"
            variants={contentItemVariants}
          >
            Explore our premium wig collections. Click on any collection to browse our products.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={collectionGridVariants}
        >
          <CollectionsGrid />
        </motion.div>
      </div>
    </motion.section>
  );
}
