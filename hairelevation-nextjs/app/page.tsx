"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getFeaturedProducts } from '@/lib/api';
import { IProduct } from '@/lib/types';
import { GoldButton } from '@/components/shared/GoldButton';
import { OutlineButton } from '@/components/shared/OutlineButton';
import { ProductCard } from '@/components/shared/ProductCard';
import { SectionHeading } from '@/components/shared/SectionHeading';

const collections = [
  { name: 'The Bridal Crowns', description: 'Timeless elegance for your most important day', emoji: '👑' },
  { name: 'The Everyday Crown', description: 'Effortless beauty crafted for daily wear', emoji: '✨' },
  { name: 'The Queen\'s Curls', description: 'Bold, voluminous curls for the fearless queen', emoji: '🌀' },
  { name: 'The Signature Pixies', description: 'Sharp, chic pixie cuts for the bold statement', emoji: '💫' },
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
      <section className="min-h-screen bg-brand-brown flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(ellipse_at_10%_50%,rgba(200,169,126,0.12)_0%,transparent_60%)]" />
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="diagonalLines" width="20" height="20" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="20" stroke="rgba(200,169,126,0.04)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonalLines)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8">
            {/* Left Content */}
            <motion.div
              className="lg:w-[55%] flex flex-col justify-center"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.p
                className="text-brand-gold uppercase tracking-[0.2em] font-body text-xs mb-4"
                variants={fadeInUp}
              >
                Premium Wigs — Accra, Ghana
              </motion.p>
              <motion.h1
                className="text-5xl md:text-7xl font-heading font-black text-brand-cream mb-6 leading-tight"
                variants={fadeInUp}
              >
                Elevate Your{' '}
                <span className="text-brand-gold italic">Crown.</span>
              </motion.h1>
              <motion.p
                className="text-lg text-brand-cream/70 font-body max-w-md mb-8"
                variants={fadeInUp}
              >
                Handcrafted luxury wigs tailored for queens. From bridal perfection to everyday elegance — discover your signature look.
              </motion.p>
              <motion.div className="flex flex-wrap gap-4 mb-8" variants={fadeInUp}>
                <GoldButton href="/collections">Shop Collections</GoldButton>
                <OutlineButton href="/book">Book Appointment</OutlineButton>
              </motion.div>
              <motion.div className="flex items-center gap-4 text-sm font-body text-brand-cream/70" variants={fadeInUp}>
                <span>200+ Queens Served</span>
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                <span>Handcrafted Quality</span>
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                <span>Accra-Based Studio</span>
              </motion.div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              className="lg:w-[45%] flex items-center justify-center"
              initial="initial"
              animate="animate"
              variants={fadeInRight}
            >
              <div className="relative">
                <div className="absolute -inset-8 rounded-full border border-brand-gold/8" />
                <div className="bg-white/4 rounded-2xl border border-brand-gold/15 p-4 relative z-10">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                    {loading ? (
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/20 via-brand-gold/10 to-brand-gold/20 animate-pulse" />
                    ) : featuredProducts.length > 0 ? (
                      <>
                        <Image
                          src={featuredProducts[0].coverImage}
                          alt={featuredProducts[0].name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-brand-brown/6 to-transparent pointer-events-none" />
                      </>
                    ) : null}
                    {!loading && featuredProducts.length > 0 && (
                      <div className="absolute bottom-3 left-3 bg-brand-cream rounded-xl px-4 py-2 shadow-lg">
                        <p className="font-heading font-bold text-sm text-brand-brown mb-1">
                          {featuredProducts[0].name}
                        </p>
                        <p className="font-body text-xs text-brand-gold">
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
      <section className="py-24 bg-brand-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Featured Pieces"
            subtitle="Handpicked styles our queens love most"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-brand-warm-white rounded-card border border-ui-border shadow-card animate-pulse"
                  >
                    <div className="aspect-[3/4] bg-gradient-to-r from-brand-gold/20 via-brand-gold/10 to-brand-gold/20 rounded-t-card" />
                    <div className="p-4">
                      <div className="h-6 bg-brand-gold/20 rounded mb-2" />
                      <div className="h-4 bg-brand-gold/15 rounded mb-4 w-2/3" />
                      <div className="h-10 bg-brand-gold/20 rounded" />
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
            <p className="text-center text-ui-text-secondary mt-8">No featured products available at the moment.</p>
          )}

          <div className="mt-12 text-center">
            <GoldButton href="/collections">View All Products</GoldButton>
          </div>
        </div>
      </section>

      {/* Section 3: Collections Showcase */}
      <section className="py-24 bg-brand-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-cream mb-4 font-heading">
              Our Collections
            </h2>
            <div className="w-16 h-0.5 bg-[var(--gradient-gold)] mx-auto mb-4" />
            <p className="text-lg text-brand-cream/80 font-body max-w-2xl mx-auto">
              Four distinct worlds of luxury
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collections.map((collection, index) => (
              <motion.a
                key={collection.name}
                href={`/collections?collection=${encodeURIComponent(collection.name)}`}
                className="bg-white/4 rounded-[20px] border border-brand-gold/15 p-8 transition-all duration-300 hover:border-brand-gold/40 hover:bg-brand-gold/8 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(59,42,35,0.3)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-5xl mb-4">{collection.emoji}</div>
                <h3 className="text-2xl font-heading font-bold text-brand-cream mb-3">
                  {collection.name}
                </h3>
                <p className="text-brand-cream/70 font-body mb-4">
                  {collection.description}
                </p>
                <span className="text-brand-gold font-body text-sm">
                  Explore →
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Services */}
      <section className="py-24 bg-brand-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Services"
            subtitle="Expert craftsmanship, delivered with care"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-brand-warm-white rounded-2xl border-t-4 border-[var(--gradient-gold)] p-8 shadow-card transition-all duration-300 hover:shadow-card_hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center mb-4">
                  {service.icon === 'scissors' && <span className="text-brand-brown text-xl">✂️</span>}
                  {service.icon === 'sparkles' && <span className="text-brand-brown text-xl">✨</span>}
                  {service.icon === 'star' && <span className="text-brand-brown text-xl">⭐</span>}
                </div>
                <h3 className="text-xl font-heading font-bold text-brand-brown mb-3">{service.title}</h3>
                <p className="text-ui-text-secondary font-body mb-6">{service.description}</p>
                <GoldButton href="/book" size="sm">
                  Book Now
                </GoldButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Brand Story */}
      <section className="py-24 bg-gradient-to-br from-brand-brown to-brand-brown-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left */}
            <motion.div
              className="lg:w-1/2 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-8xl font-heading italic text-brand-gold/15 mb-4">— Est. 2020 —</p>
              <div className="w-0.5 h-20 bg-[var(--gradient-gold)] mb-4" />
              <span className="text-3xl font-heading text-brand-gold">Est. 2020</span>
            </motion.div>

            {/* Right */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                title="Our Story"
                align="left"
                className="mb-6"
              />
              <div className="space-y-4 mb-6">
                <p className="text-brand-cream font-body">
                  Hair Elevation Studio was born from a passion for helping women express their most elevated selves. Based in the heart of Kanda, Accra, we blend artistry with craftsmanship to create wigs that do more than complete a look — they complete a feeling.
                </p>
                <p className="text-brand-cream font-body">
                  Every piece that leaves our studio carries the promise of quality, care, and confidence. Whether it is your bridal day or a Tuesday morning, you deserve to feel like royalty.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 border border-brand-gold rounded-full text-brand-gold font-body text-sm">
                  200+ Happy Clients
                </span>
                <span className="px-4 py-2 border border-brand-gold rounded-full text-brand-gold font-body text-sm">
                  4 Signature Collections
                </span>
                <span className="px-4 py-2 border border-brand-gold rounded-full text-brand-gold font-body text-sm">
                  5★ Rated Studio
                </span>
              </div>

              <GoldButton href="/about">Meet Our Studio</GoldButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 6: CTA Banner */}
      <section className="py-20 bg-[var(--gradient-gold)]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full border border-brand-brown -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full border border-brand-brown translate-y-24 -translate-x-24" />
        </div>

        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-brown mb-4">
            Ready to Elevate Your Look?
          </h2>
          <p className="text-lg text-brand-brown/75 font-body mb-8 max-w-2xl mx-auto">
            Book your appointment today or explore our premium collections.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GoldButton href="/collections" className="bg-brand-brown text-brand-cream hover:bg-brand-brown-dark">
              Shop Now
            </GoldButton>
            <OutlineButton href="/book">Book Appointment</OutlineButton>
          </div>
        </motion.div>
      </section>
    </>
  );
}