"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, MessageCircle, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-brown text-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image
              src="/HESLOGO.PNG"
              alt="Hair Elevation Studio"
              width={120}
              height={48}
              className="h-12 w-auto brightness-110 invert mb-4"
            />
            <p className="text-lg font-heading font-bold mb-2">Elevate Your Style</p>
            <p className="text-sm text-ui-text-light max-w-xs">
              Premium wig solutions crafted for the modern Ghanaian woman. Experience luxury and elegance
              with every strand.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-heading font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-brand-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-brand-gold transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-gold transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-brand-gold transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-gold transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-heading font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>053 405 7109 (Phone/WhatsApp)</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span>hairelevationstudio@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Kanda, Accra, Ghana</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🕒</span>
                <span>Tues-Sat: 9am-6pm</span>
              </li>
            </ul>

            <div className="flex gap-3 mt-4">
              <Link
                href="https://instagram.com"
                className="p-2 rounded-full bg-ui-border hover:bg-brand-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://tiktok.com"
                className="p-2 rounded-full bg-ui-border hover:bg-brand-gold transition-colors"
                aria-label="TikTok"
              >
                <Send className="w-5 h-5" />
              </Link>
              <Link
                href="https://whatsapp.com"
                className="p-2 rounded-full bg-ui-border hover:bg-brand-gold transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-ui-border mt-8 pt-6 text-center text-xs text-ui-text-secondary">
          <p>Hair Elevation Studio © 2026. Developed by Dromor Narh</p>
        </div>
      </div>
    </footer>
  );
}