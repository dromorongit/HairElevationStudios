/**
 * Hero Section
 * Premium editorial hero with cinematic composition
 * Enhanced luxury experience with refined typography
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/brand";
import {
  heroContentVariants,
  heroItemVariants,
  imageFadeVariants,
} from "@/lib/motion-variants";

export function Hero() {
  return (
    <section className="hero relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial="hidden"
        animate="visible"
        variants={imageFadeVariants}
      >
        <Image
          src="/threeladies.PNG"
          alt="Hair Elevation Studio"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Premium overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/40 to-black/60" />
      </motion.div>

      <motion.div
        className="hero-content relative z-10 text-center px-6 max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={heroContentVariants}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-black text-[#F5EFE6] mb-10 leading-tight tracking-tight"
          style={{ textShadow: "0 6px 20px rgba(0,0,0,0.4)" }}
          variants={heroItemVariants}
        >
          Elevate Your Style with Premium Wigs
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-xl text-[#F5EFE6]/90 mb-14 max-w-2xl mx-auto leading-relaxed font-light"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
          variants={heroItemVariants}
        >
          Discover high-quality glueless wigs, custom coloring, styling, and luxury wig experiences 
          designed for the modern woman who demands elegance.
        </motion.p>

        <motion.div variants={heroItemVariants}>
          <Link href={ROUTES.collections}>
            <Button size="lg" className="shadow-xl">
              Explore Collections
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}