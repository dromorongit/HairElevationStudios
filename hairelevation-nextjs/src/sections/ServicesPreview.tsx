/**
 * ServicesPreview Section
 * Displays service preview cards on the homepage
 * Luxury presentation with refined motion
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
    description: "Tailored wigs designed to your exact specifications, including color, length, and style. Perfect for a unique look that matches your personality.",
  },
  {
    name: "Wig Revamp & Maintenance",
    description: "Restore your wig's original beauty with our professional cleaning, styling, and repair services. Keep your wig looking fresh and luxurious.",
  },
  {
    name: "Wig Installation & Sew-in",
    description: "Expert installation services for a seamless, natural look. Available by appointment only for personalized attention.",
  },
];

export function ServicesPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      className="services-preview py-24 px-8 bg-gradient-to-b from-[#F5EFE6] to-white"
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
            Our Services
          </motion.h2>
          <motion.p
            className="text-center text-[#666666] max-w-2xl mx-auto mb-14 leading-relaxed"
            variants={contentItemVariants}
          >
            Professional wig services tailored to your needs. From custom creations to maintenance,
            we ensure every detail meets our luxury standards.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <ServicesGrid services={services} />
        </motion.div>
      </div>
    </motion.section>
  );
}