/**
 * Hero Section
 * Full-width hero with background image and CTA
 * Enhanced with luxury motion and cinematic composition
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
    <section className="hero relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with subtle parallax */}
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
          className="object-cover"
        />
        {/* Overlay with gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
      </motion.div>

      {/* Hero Content with staggered reveal */}
      <motion.div
        className="hero-content relative z-10 text-center px-5 max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={heroContentVariants}
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#F5EFE6] mb-6 leading-tight tracking-tight"
          style={{ textShadow: "0 4px 12px rgba(0,0,0,0.5)" }}
          variants={heroItemVariants}
        >
          Elevate Your Style with Premium Wigs
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-[#F5EFE6] mb-10 max-w-2xl mx-auto leading-relaxed font-light"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
          variants={heroItemVariants}
        >
          Discover high-quality glueless wigs, custom coloring, styling, and luxury wig experiences.
        </motion.p>

        <motion.div variants={heroItemVariants}>
          <Link href={ROUTES.collections}>
            <Button size="lg" className="shadow-lg">
              Shop Collections
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
