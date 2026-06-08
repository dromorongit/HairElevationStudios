/**
 * ServicesPreview Section
 * Displays service preview cards on the homepage
 * Enhanced with luxury motion and scroll-triggered reveals
 */

"use client";

import { motion } from "framer-motion";
import { ServicesGrid } from "@/components/shared/ServiceCard";
import {
  sectionVariants,
  contentContainerVariants,
  contentItemVariants,
} from "@/lib/motion-variants";
import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    name: "Custom Wig Making",
    description: "Tailored wigs designed to your specifications.",
  },
  {
    name: "Wig Revamp & Maintenance",
    description: "Restore and maintain your wig's beauty.",
  },
  {
    name: "Wig Installation & Sew-in",
    description: "Professional installation services.",
  },
];

export function ServicesPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      className="services-preview py-20 px-5 bg-gradient-to-b from-[#F5EFE6] to-white"
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
            className="text-3xl md:text-4xl font-bold text-[#3B2A23] text-center mb-12 tracking-tight"
            variants={contentItemVariants}
          >
            Our Services
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ServicesGrid services={services} />
        </motion.div>
      </div>
    </motion.section>
  );
}
