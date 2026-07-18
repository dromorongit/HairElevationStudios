"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getFeaturedProducts } from '@/lib/api';
import { IProduct } from '@/lib/types';
import { GoldButton } from '@/components/shared/GoldButton';
import { OutlineButton } from '@/components/shared/OutlineButton';
import { ProductCard } from '@/components/shared/ProductCard';
import { SectionHeading } from '@/components/shared/SectionHeading';

const collectionImages: Record<string, string> = {
  'Straight': '/assets/images/bridalcrowns.jpg',
  'Wavy/Layers/Bouncy': '/assets/images/everydaycrown.jpg',
  'Curly': '/assets/images/queenscurls.jpg',
  'Pixie Cut': '/assets/images/signaturepixies.jpg',
};

const collections = [
  { name: 'Straight', description: 'Sleek, smooth and effortlessly polished for every occasion', emoji: '✨' },
  { name: 'Wavy/Layers/Bouncy', description: 'Effortless waves and bouncy layers for a natural, voluminous look', emoji: '🌊' },
  { name: 'Curly', description: 'Bold, voluminous curls for the fearless queen', emoji: '🌀' },
  { name: 'Pixie Cut', description: 'Sharp, chic pixie cuts for the bold statement', emoji: '💫' },
];

const services = [
  { title: 'Custom Wig Making', description: 'Bespoke wigs crafted to your exact measurements, preferences, and style vision.', icon: 'scissors' },
  { title: 'Wig Revamp & Maintenance', description: 'Restore and refresh your wigs to their original glory with our expert care services.', icon: 'sparkles' },
  { title: 'Wig Installation & Sew-in', description: 'Professional installation for a flawless, natural look that lasts.', icon: 'star' },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const fadeInRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function HomePage() {
   const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
     getFeaturedProducts()
       .then(setFeaturedProducts)
       .finally(() => setLoading(false));
   }, []);

   return (
    <>
      {/* Section 1: Hero */}
      <section className="min-h-auto lg:min-h-screen bg-[var(--bg-primary)] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="diagonalLines" width="30" height="30" patternTransform="rotate(30)">
                <line x1="0" y1="0" x2="0" y2="30" stroke="rgba(200,169,126,0.02)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonalLines)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-16 lg:py-0 overflow-x-hidden">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8">
            {/* Left Content */}
            <motion.div
              className="w-full lg:w-[55%] flex flex-col justify-center"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.p
                className="text-[11px] font-body uppercase tracking-[0.3em] text-[var(--brand-gold)] mb-4 break-words"
                variants={fadeInUp}
              >
                PREMIUM WIGS — ACCRA, GHANA
              </motion.p>
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-7xl font-heading font-black text-[var(--text-primary)] mb-6 leading-[0.92] break-words"
                variants={fadeInUp}
              >
                Crown.{' '}
                <span className="text-[var(--brand-gold)] italic font-heading font-black">
                  Redefined.
                </span>
              </motion.h1>
              <motion.p
                className="text-base lg:text-lg font-body text-[var(--text-muted)] max-w-full mb-8"
                variants={fadeInUp}
              >
                Handcrafted luxury wigs tailored for queens. From bridal perfection to everyday elegance — discover your signature look.
              </motion.p>
<motion.div className="flex flex-col sm:flex-row gap-4 mb-8 w-full" variants={fadeInUp}>
               <OutlineButton href="/collections" size="lg" className="w-full sm:w-auto">Shop Collections</OutlineButton>
               <OutlineButton href="/book" className="w-full sm:w-auto">Book Appointment</OutlineButton>
               <OutlineButton href="/virtual-class-2026" className="w-full sm:w-auto flex items-center justify-center gap-2">
                 NEW: Pixie Cut Virtual Class — GHS 1,200
               </OutlineButton>
             </motion.div>
              <motion.div className="hidden sm:flex items-center gap-4 text-sm font-body text-[var(--text-primary)]" variants={fadeInUp}>
                <span className="text-[var(--text-primary)]">200+ Queens Served</span>
                <span className="w-1.5 h-1.5 bg-[var(--brand-gold)] rounded-full" />
                <span className="text-[var(--text-primary)]">Handcrafted Quality</span>
                <span className="w-1.5 h-1.5 bg-[var(--brand-gold)] rounded-full" />
                <span className="text-[var(--text-primary)]">Accra-Based Studio</span>
              </motion.div>
              <motion.div className="grid grid-cols-2 gap-2 sm:hidden text-xs font-body text-[var(--text-primary)]" variants={fadeInUp}>
                <span className="text-[var(--text-primary)]">200+ Queens Served</span>
                <span className="text-[var(--text-primary)]">Handcrafted Quality</span>
                <span className="text-[var(--text-primary)]">Accra-Based Studio</span>
              </motion.div>
            </motion.div>

{/* Right Content */}
            <motion.div
              className="w-full lg:w-[45%] flex items-center justify-center"
              initial="initial"
              animate="animate"
              variants={fadeInRight}
            >
              <div className="relative w-full max-w-sm lg:max-w-none mx-auto lg:mx-0">
                <div className="absolute -inset-2 sm:-inset-4 rounded-xl border border-[var(--border-gold-strong)]" />
                <div className="relative bg-[rgba(59,42,35,0.85)] backdrop-blur-md rounded-xl border border-[var(--border-gold)] p-3 sm:p-4">
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
<img
                         src="/assets/images/threeladies.jpg"
                         alt="Hair Elevation Studio"
                         className="w-full h-full object-cover object-top rounded-2xl"
                         loading="eager"
                         fetchPriority="high"
                       />
                      {!loading && featuredProducts.length > 0 && (
                        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-[rgba(59,42,35,0.85)] backdrop-blur-md border border-[var(--border-gold)] rounded-xl px-3 py-2 sm:px-4 sm:py-2 max-w-[calc(100%-16px)]">
                          <p className="font-heading font-bold text-xs sm:text-sm text-[var(--text-primary)] mb-1 truncate">
                            {featuredProducts[0].name}
                          </p>
                          <p className="font-body text-[10px] sm:text-xs text-[var(--brand-gold)]">
                            {new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }).format(featuredProducts[0].price)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Featured Products */}
      <section className="py-16 md:py-20 bg-[var(--bg-primary)] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <SectionHeading
            label="Featured"
            title="Pieces"
            subtitle="Handpicked styles our queens love most"
            align="center"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-gold)] animate-pulse"
                  >
                    <div className="aspect-[4/5] bg-gradient-to-r from-[var(--brand-gold)]/20 via-[var(--brand-gold)]/10 to-[var(--brand-gold)]/20 rounded-t-xl" />
                    <div className="p-3">
                      <div className="h-5 bg-[var(--brand-gold)]/20 rounded mb-2" />
                      <div className="h-3 bg-[var(--brand-gold)]/15 rounded mb-3 w-2/3" />
                      <div className="h-8 bg-[var(--brand-gold)]/20 rounded" />
                    </div>
                  </div>
                ))
              : featuredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
          </div>

          {!loading && featuredProducts.length === 0 && (
            <p className="text-center text-[var(--text-muted)] mt-8 font-body">No featured products available at the moment.</p>
          )}

          <div className="mt-10 md:mt-12 text-center">
            <GoldButton href="/collections">View All Products</GoldButton>
          </div>
        </div>
      </section>

      {/* Section 3: Collections Showcase */}
      <section className="py-16 md:py-20 bg-[var(--bg-secondary)] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <SectionHeading
            label="Collections"
            title="Our Worlds"
            subtitle="Four distinct realms of luxury"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {collections.map((collection, index) => (
              <motion.a
                key={collection.name}
                href={`/collections?collection=${encodeURIComponent(collection.name)}`}
                className="rounded-[20px] border border-[var(--border-gold)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] group"
                style={{
                  backgroundImage: `url(${collectionImages[collection.name]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  minHeight: '280px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B2A23] via-[rgba(59,42,35,0.6)] to-[rgba(59,42,35,0.3)]" />
                <div className="relative z-10 p-5 md:p-8">
                  <div className="text-3xl md:text-4xl mb-3">{collection.emoji}</div>
                  <h3 className="text-lg md:text-xl font-heading font-bold text-[var(--text-primary)] mb-2 md:mb-3 break-words">
                    {collection.name}
                  </h3>
                  <p className="text-xs md:text-sm font-body text-[var(--text-muted)] mb-3 md:mb-4 break-words">
                    {collection.description}
                  </p>
                  <span className="text-xs md:text-sm font-body text-[var(--brand-gold)]">
                    Explore →
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Services */}
      <section className="py-16 md:py-20 bg-[var(--bg-primary)] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <SectionHeading
            label="Services"
            title="Expert Craft"
            subtitle="Precision. Luxury. Care."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-[var(--bg-secondary)] rounded-xl border-l-4 border-[var(--gradient-gold)] p-5 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-[var(--gradient-gold)] rounded-full flex items-center justify-center mb-4">
                  {service.icon === 'scissors' && <span className="text-[var(--bg-primary)] text-xl">✂️</span>}
                  {service.icon === 'sparkles' && <span className="text-[var(--bg-primary)] text-xl">✨</span>}
                  {service.icon === 'star' && <span className="text-[var(--bg-primary)] text-xl">⭐</span>}
                </div>
                <h3 className="text-lg md:text-xl font-heading font-bold text-[var(--text-primary)] mb-2 md:mb-3 break-words">{service.title}</h3>
                <p className="text-sm font-body text-[var(--text-muted)] mb-5 md:mb-6 break-words">{service.description}</p>
                <GoldButton href="/book" size="sm">
                  Book Now
                </GoldButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* Section 5: Brand Story */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left */}
            <motion.div
              className="w-full lg:w-1/2 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="hidden lg:block text-6xl md:text-8xl font-heading italic text-[var(--brand-gold)]/15 mb-4">— EST. 2020 —</p>
              <div className="w-0.5 h-12 md:h-16 bg-[var(--gradient-gold)] mb-4" />
              <span className="text-2xl md:text-3xl font-heading text-[var(--brand-gold)]">Est. 2020</span>
            </motion.div>

            {/* Right */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                label="Our Story"
                title="Hair Elevation Studio"
                align="left"
                className="mb-6"
              />
              <div className="space-y-4 mb-6">
                <p className="text-[var(--text-primary)] font-body leading-relaxed text-sm md:text-base">
                  Hair Elevation Studio was born from a passion for helping women express their most elevated selves. Based in the heart of Kanda, Accra, we blend artistry with craftsmanship to create wigs that do more than complete a look — they complete a feeling.
                </p>
                <p className="text-[var(--text-primary)] font-body leading-relaxed text-sm md:text-base">
                  Every piece that leaves our studio carries the promise of quality, care, and confidence. Whether it is your bridal day or a Tuesday morning, you deserve to feel like royalty.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 border border-[var(--brand-gold)] rounded-full text-[var(--brand-gold)] font-body text-sm">
                  200+ Happy Clients
                </span>
                <span className="px-4 py-2 border border-[var(--brand-gold)] rounded-full text-[var(--brand-gold)] font-body text-sm">
                  4 Signature Collections
                </span>
                <span className="px-4 py-2 border border-[var(--brand-gold)] rounded-full text-[var(--brand-gold)] font-body text-sm">
                  5★ Rated Studio
                </span>
              </div>

              <GoldButton href="/about">Meet Our Studio</GoldButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 6: CTA Banner */}
      <section className="py-16 md:py-20 bg-[var(--gradient-gold)] overflow-x-hidden">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-[var(--bg-primary)] mb-4">
            Ready to Elevate Your Look?
          </h2>
          <p className="text-base font-body text-[var(--bg-primary)]/80 mb-8 max-w-2xl mx-auto">
            Book your appointment today or explore our premium collections.
          </p>
<div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
            <GoldButton href="/collections" className="bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] w-full sm:w-auto">
              Shop Now
            </GoldButton>
<OutlineButton href="/book" className="text-[var(--bg-primary)] w-full sm:w-auto">Book Appointment</OutlineButton>
          </div>
        </motion.div>
      </section>
    </>
  );
}