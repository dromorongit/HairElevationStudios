"use client";

import { useEffect } from 'react';
import { OutlineButton } from '@/components/shared/OutlineButton';
import { BsTrophy, BsHeartFill, BsGeoAlt } from 'react-icons/bs';

export default function AboutPage() {
   useEffect(() => {
     document.title = 'Our Story | Hair Elevation Studio';
   }, []);

   return (
    <>
      {/* Page Header */}
      <section className="py-12 md:py-16 bg-[var(--bg-primary)] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center overflow-x-hidden">
          <p className="text-xs font-body uppercase tracking-wider text-[var(--brand-gold)] mb-3 truncate">
            Home / About
          </p>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-[var(--text-primary)] mb-3 break-words">
            Our Story
          </h1>
          <div className="w-16 h-0.5 bg-[var(--gradient-gold)] mx-auto mb-3" />
          <p className="text-base font-body text-[var(--text-muted)] max-w-2xl mx-auto break-words">
            Born from passion, crafted with love
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-10 md:py-12 bg-cover bg-center bg-fixed relative overflow-x-hidden" style={{ backgroundImage: "url('/assets/images/background.jpg')" }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Watermark Quote - hidden on mobile */}
            <div className="hidden lg:block relative overflow-hidden">
              <p className="text-8xl font-heading italic text-[var(--brand-gold)]/15 absolute top-0 left-0 -z-10">
                &ldquo;Elevate Every Strand&rdquo;
              </p>
            </div>

            <div className="lg:pl-12 w-full">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-[var(--text-primary)] mb-5 md:mb-8 break-words">
                About Hair Elevation Studio
              </h2>

              <div className="space-y-3 md:space-y-4 mb-5 md:mb-8">
                <p className="text-[var(--text-primary)] font-body leading-relaxed text-sm md:text-base break-words">
                  Hair Elevation Studio was born from a deep passion for helping women express their most elevated selves. Founded in the heart of Kanda, Accra, we started with a single vision — to make luxury hair accessible to every queen in Ghana.
                </p>
                <p className="text-[var(--text-primary)] font-body leading-relaxed text-sm md:text-base break-words">
                  Every wig that leaves our studio is handcrafted with precision and care. We source only premium quality hair and use professional-grade techniques to ensure that each piece looks and feels natural, beautiful, and long-lasting.
                </p>
                <p className="text-[var(--text-primary)] font-body leading-relaxed text-sm md:text-base break-words">
                  Whether you are preparing for your wedding day, a special event, or simply want to elevate your everyday look — Hair Elevation Studio is your destination for premium wigs in Accra.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3 mb-5 md:mb-6">
                <div className="px-3 py-2 sm:px-4 sm:py-2 border border-[var(--brand-gold)] rounded-full">
                  <span className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-[var(--brand-gold)]">200+</span>
                  <span className="text-[10px] sm:text-xs font-body text-[var(--text-primary)] block">Happy Clients</span>
                </div>
                <div className="px-3 py-2 sm:px-4 sm:py-2 border border-[var(--brand-gold)] rounded-full">
                  <span className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-[var(--brand-gold)]">4</span>
                  <span className="text-[10px] sm:text-xs font-body text-[var(--text-primary)] block">Collections</span>
                </div>
                <div className="px-3 py-2 sm:px-4 sm:py-2 border border-[var(--brand-gold)] rounded-full">
                  <span className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-[var(--brand-gold)]">5★</span>
                  <span className="text-[10px] sm:text-xs font-body text-[var(--text-primary)] block">Rated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-10 md:py-12 bg-[var(--bg-primary)] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-[var(--text-primary)] mb-3 md:mb-4 break-words">
              Our Values
            </h2>
            <p className="text-base font-body text-[var(--text-muted)] break-words">
              What drives everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <div className="bg-[rgba(200,169,126,0.05)] rounded-xl border border-[var(--border-gold)] p-6 md:p-8 text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[var(--gradient-gold)] flex items-center justify-center mx-auto mb-4 md:mb-6">
                <BsTrophy className="w-6 h-6 md:w-7 md:h-7 text-[var(--bg-primary)]" />
              </div>
              <h3 className="text-lg md:text-xl font-heading font-bold text-[var(--text-primary)] mb-2 md:mb-4 break-words">Quality First</h3>
              <p className="text-xs md:text-sm font-body text-[var(--text-muted)] break-words">
                We never compromise on quality. Every product is carefully inspected before it reaches you.
              </p>
            </div>

            <div className="bg-[rgba(200,169,126,0.05)] rounded-xl border border-[var(--border-gold)] p-6 md:p-8 text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[var(--gradient-gold)] flex items-center justify-center mx-auto mb-4 md:mb-6">
                <BsHeartFill className="w-6 h-6 md:w-7 md:h-7 text-[var(--bg-primary)]" />
              </div>
              <h3 className="text-lg md:text-xl font-heading font-bold text-[var(--text-primary)] mb-2 md:mb-4 break-words">Customer Love</h3>
              <p className="text-xs md:text-sm font-body text-[var(--text-muted)] break-words">
                Your satisfaction is our priority. We build lasting relationships with every client.
              </p>
            </div>

            <div className="bg-[rgba(200,169,126,0.05)] rounded-xl border border-[var(--border-gold)] p-6 md:p-8 text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[var(--gradient-gold)] flex items-center justify-center mx-auto mb-4 md:mb-6">
                <BsGeoAlt className="w-6 h-6 md:w-7 md:h-7 text-[var(--bg-primary)]" />
              </div>
              <h3 className="text-lg md:text-xl font-heading font-bold text-[var(--text-primary)] mb-2 md:mb-4 break-words">Ghana Pride</h3>
              <p className="text-xs md:text-sm font-body text-[var(--text-muted)] break-words">
                Proudly serving the Ghanaian community with excellence and dedication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-[var(--gradient-gold)] overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center overflow-x-hidden">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-[var(--bg-primary)] mb-4 md:mb-6 break-words">
            Experience the Elevation
          </h2>
<div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <OutlineButton href="/collections" size="lg" className="text-[var(--bg-primary)] w-full sm:w-auto">Shop Collections</OutlineButton>
            <OutlineButton href="/book" size="lg" className="text-[var(--bg-primary)] w-full sm:w-auto">
              Book Appointment
            </OutlineButton>
          </div>
        </div>
      </section>
    </>
  );
 }