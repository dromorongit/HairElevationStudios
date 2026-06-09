"use client";

import { GoldButton } from '@/components/shared/GoldButton';
import { OutlineButton } from '@/components/shared/OutlineButton';
import { BsTrophy, BsHeartFill, BsGeoAlt } from 'react-icons/bs';

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="py-16 md:py-20 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-body uppercase tracking-wider text-[var(--brand-gold)] mb-4">
            Home / About
          </p>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-[var(--text-primary)] mb-4">
            Our Story
          </h1>
          <div className="w-16 h-0.5 bg-[var(--gradient-gold)] mx-auto mb-4" />
          <p className="text-lg font-body text-[var(--text-muted)] max-w-2xl mx-auto">
            Born from passion, crafted with love
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12">
            {/* Watermark Quote - hidden on mobile */}
            <div className="hidden lg:block relative">
              <p className="text-8xl font-heading italic text-[var(--brand-gold)]/15 absolute top-0 left-0 -z-10">
                &ldquo;Elevate Every Strand&rdquo;
              </p>
            </div>

            <div className="lg:pl-12">
              <h2 className="text-3xl font-heading font-bold text-[var(--text-primary)] mb-8">
                About Hair Elevation Studio
              </h2>

              <div className="space-y-4 mb-8">
                <p className="text-[var(--text-primary)] font-body leading-relaxed text-base">
                  Hair Elevation Studio was born from a deep passion for helping women express their most elevated selves. Founded in the heart of Kanda, Accra, we started with a single vision — to make luxury hair accessible to every queen in Ghana.
                </p>
                <p className="text-[var(--text-primary)] font-body leading-relaxed text-base">
                  Every wig that leaves our studio is handcrafted with precision and care. We source only premium quality hair and use professional-grade techniques to ensure that each piece looks and feels natural, beautiful, and long-lasting.
                </p>
                <p className="text-[var(--text-primary)] font-body leading-relaxed text-base">
                  Whether you are preparing for your wedding day, a special event, or simply want to elevate your everyday look — Hair Elevation Studio is your destination for premium wigs in Accra.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <div className="px-4 py-2 border border-[var(--brand-gold)] rounded-full">
                  <span className="text-xl md:text-2xl font-heading font-bold text-[var(--brand-gold)]">200+</span>
                  <span className="text-xs font-body text-[var(--text-primary)] block">Happy Clients</span>
                </div>
                <div className="px-4 py-2 border border-[var(--brand-gold)] rounded-full">
                  <span className="text-xl md:text-2xl font-heading font-bold text-[var(--brand-gold)]">4</span>
                  <span className="text-xs font-body text-[var(--text-primary)] block">Collections</span>
                </div>
                <div className="px-4 py-2 border border-[var(--brand-gold)] rounded-full">
                  <span className="text-xl md:text-2xl font-heading font-bold text-[var(--brand-gold)]">5★</span>
                  <span className="text-xs font-body text-[var(--text-primary)] block">Rated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-heading font-bold text-[var(--text-primary)] mb-4">
              Our Values
            </h2>
            <p className="text-lg font-body text-[var(--text-muted)]">
              What drives everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-[rgba(200,169,126,0.05)] rounded-xl border border-[var(--border-gold)] p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--gradient-gold)] flex items-center justify-center mx-auto mb-6">
                <BsTrophy className="w-7 h-7 text-[var(--bg-primary)]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-[var(--text-primary)] mb-4">Quality First</h3>
              <p className="text-sm font-body text-[var(--text-muted)]">
                We never compromise on quality. Every product is carefully inspected before it reaches you.
              </p>
            </div>

            <div className="bg-[rgba(200,169,126,0.05)] rounded-xl border border-[var(--border-gold)] p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--gradient-gold)] flex items-center justify-center mx-auto mb-6">
                <BsHeartFill className="w-7 h-7 text-[var(--bg-primary)]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-[var(--text-primary)] mb-4">Customer Love</h3>
              <p className="text-sm font-body text-[var(--text-muted)]">
                Your satisfaction is our priority. We build lasting relationships with every client.
              </p>
            </div>

            <div className="bg-[rgba(200,169,126,0.05)] rounded-xl border border-[var(--border-gold)] p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--gradient-gold)] flex items-center justify-center mx-auto mb-6">
                <BsGeoAlt className="w-7 h-7 text-[var(--bg-primary)]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-[var(--text-primary)] mb-4">Ghana Pride</h3>
              <p className="text-sm font-body text-[var(--text-muted)]">
                Proudly serving the Ghanaian community with excellence and dedication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--gradient-gold)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-heading font-bold text-[var(--bg-primary)] mb-6">
            Experience the Elevation
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GoldButton href="/collections" size="lg" className="bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]">
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