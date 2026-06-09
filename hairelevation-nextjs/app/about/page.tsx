"use client";

import { Award, Heart, MapPin } from 'lucide-react';
import { GoldButton } from '@/components/shared/GoldButton';
import { OutlineButton } from '@/components/shared/OutlineButton';

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="py-20 bg-brand-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-brand-gold/80 font-body uppercase tracking-wider mb-4">
            Home / About
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-cream mb-4">
            Our Story
          </h1>
          <div className="w-16 h-0.5 bg-[var(--gradient-gold)] mx-auto mb-4" />
          <p className="text-lg text-brand-gold/80 font-body max-w-2xl mx-auto">
            Born from passion, crafted with love
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-brand-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12">{/* Watermark Quote - hidden on mobile */}
            <div className="hidden lg:block relative">
<p className="text-8xl font-heading italic text-brand-gold/10 absolute top-0 left-0 -z-10">
              &ldquo;Elevate Every Strand&rdquo;
            </p>
            </div>

            <div className="lg:pl-12">
              <h2 className="text-3xl font-heading font-bold text-brand-brown mb-8">
                About Hair Elevation Studio
              </h2>

              <div className="space-y-4 mb-8">
                <p className="text-ui-text-secondary font-body leading-relaxed">
                  Hair Elevation Studio was born from a deep passion for helping women express their most elevated selves. Founded in the heart of Kanda, Accra, we started with a single vision — to make luxury hair accessible to every queen in Ghana.
                </p>
                <p className="text-ui-text-secondary font-body leading-relaxed">
                  Every wig that leaves our studio is handcrafted with precision and care. We source only premium quality hair and use professional-grade techniques to ensure that each piece looks and feels natural, beautiful, and long-lasting.
                </p>
                <p className="text-ui-text-secondary font-body leading-relaxed">
                  Whether you are preparing for your wedding day, a special event, or simply want to elevate your everyday look — Hair Elevation Studio is your destination for premium wigs in Accra.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="bg-brand-warm-white border border-brand-gold rounded-full px-6 py-3">
                  <span className="text-2xl font-heading font-bold text-brand-gold">200+</span>
                  <span className="text-sm font-body text-brand-brown block">Happy Clients</span>
                </div>
                <div className="bg-brand-warm-white border border-brand-gold rounded-full px-6 py-3">
                  <span className="text-2xl font-heading font-bold text-brand-gold">4</span>
                  <span className="text-sm font-body text-brand-brown block">Collections</span>
                </div>
                <div className="bg-brand-warm-white border border-brand-gold rounded-full px-6 py-3">
                  <span className="text-2xl font-heading font-bold text-brand-gold">5★</span>
                  <span className="text-sm font-body text-brand-brown block">Rated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-brand-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-brand-cream mb-4">
              Our Values
            </h2>
            <p className="text-lg text-brand-gold/80 font-body">
              What drives everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[rgba(255,255,255,0.04)] rounded-2xl border border-brand-gold p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--gradient-gold)] flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-brand-brown" />
              </div>
              <h3 className="text-xl font-heading font-bold text-brand-cream mb-4">Quality First</h3>
              <p className="text-sm text-brand-cream/70 font-body">
                We never compromise on quality. Every product is carefully inspected before it reaches you.
              </p>
            </div>

            <div className="bg-[rgba(255,255,255,0.04)] rounded-2xl border border-brand-gold p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--gradient-gold)] flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-brand-brown" />
              </div>
              <h3 className="text-xl font-heading font-bold text-brand-cream mb-4">Customer Love</h3>
              <p className="text-sm text-brand-cream/70 font-body">
                Your satisfaction is our priority. We build lasting relationships with every client.
              </p>
            </div>

            <div className="bg-[rgba(255,255,255,0.04)] rounded-2xl border border-brand-gold p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--gradient-gold)] flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-brand-brown" />
              </div>
              <h3 className="text-xl font-heading font-bold text-brand-cream mb-4">Ghana Pride</h3>
              <p className="text-sm text-brand-cream/70 font-body">
                Proudly serving the Ghanaian community with excellence and dedication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--gradient-gold)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-brand-brown mb-6">
            Experience the Elevation
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GoldButton href="/collections" size="lg">
              Shop Collections
            </GoldButton>
            <OutlineButton href="/book" size="lg">
              Book Appointment
            </OutlineButton>
          </div>
        </div>
      </section>
    </>
  );
}