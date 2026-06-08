/**
 * WhatsAppChannelBanner Section
 * Green gradient banner with WhatsApp channel link
 * Enhanced with luxury motion and scroll-triggered reveals
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { WHATSAPP } from "@/constants/brand";
import {
  sectionVariants,
  contentItemVariants,
} from "@/lib/motion-variants";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function WhatsAppChannelBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      className="whatsapp-channel-banner py-16 px-5"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      <div className="container max-w-[1200px] mx-auto">
        <motion.div
          className="bg-gradient-to-r from-[#25D366] via-[#20B954] to-[#128C7E] rounded-[10px] p-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h3
            className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight"
            variants={contentItemVariants}
          >
            Join Our WhatsApp Channel
          </motion.h3>
          <motion.p
            className="mb-6 opacity-90 text-lg"
            variants={contentItemVariants}
          >
            Stay updated with our latest collections and services!
          </motion.p>
          <motion.div
            variants={contentItemVariants}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={WHATSAPP.channel}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-white text-[#25D366] font-semibold uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Our Channel
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
