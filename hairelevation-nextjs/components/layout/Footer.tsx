"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Send, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0A0704] text-[var(--text-primary)]">
      <div className="w-full h-1 bg-[var(--gradient-gold)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image
              src="/HESLOGO.PNG"
              alt="Hair Elevation Studio"
              width={140}
              height={48}
              className="h-12 w-auto brightness-125 mb-4"
            />
            <p className="text-lg font-heading font-bold mb-2 text-[var(--text-primary)]">Elevate Your Style</p>
            <p className="text-sm font-body text-[var(--text-muted)] max-w-xs">
              Premium wig solutions crafted for the modern Ghanaian woman. Experience luxury and elegance
              with every strand.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-heading font-bold mb-4 text-[var(--text-primary)]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm font-body text-[var(--text-muted)] hover:text-[var(--brand-gold)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-sm font-body text-[var(--text-muted)] hover:text-[var(--brand-gold)] transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm font-body text-[var(--text-muted)] hover:text-[var(--brand-gold)] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-sm font-body text-[var(--text-muted)] hover:text-[var(--brand-gold)] transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm font-body text-[var(--text-muted)] hover:text-[var(--brand-gold)] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm font-body text-[var(--text-muted)] hover:text-[var(--brand-gold)] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-heading font-bold mb-4 text-[var(--text-primary)]">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span className="font-body text-[var(--text-primary)]">053 405 7109 (Phone/WhatsApp)</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span className="font-body text-[var(--text-primary)]">hairelevationstudio@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span className="font-body text-[var(--text-primary)]">Kanda, Accra, Ghana</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🕒</span>
                <span className="font-body text-[var(--text-primary)]">Tues-Sat: 9am-6pm</span>
              </li>
            </ul>

            <div className="flex gap-3 mt-4">
              <Link
                href="https://instagram.com"
                className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--brand-gold)] flex items-center justify-center hover:bg-[var(--brand-gold)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-[var(--brand-gold)]" />
              </Link>
              <Link
                href="https://tiktok.com"
                className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--brand-gold)] flex items-center justify-center hover:bg-[var(--brand-gold)] transition-colors"
                aria-label="TikTok"
              >
                <Send className="w-5 h-5 text-[var(--brand-gold)]" />
              </Link>
              <Link
                href="https://whatsapp.com"
                className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--brand-gold)] flex items-center justify-center hover:bg-[var(--brand-gold)] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-[var(--brand-gold)]" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border-gold)] mt-8 pt-6">
          <p className="text-xs font-body text-[var(--text-muted)]">
            Hair Elevation Studio © 2026. Developed by Dromor Narh
          </p>
        </div>
      </div>
    </footer>
  );
}