"use client";

import Link from 'next/link';
import { BsInstagram, BsTiktok, BsWhatsapp } from 'react-icons/bs';

export function Footer() {
  return (
    <footer className="bg-[var(--gradient-brown)] text-[var(--text-primary)]">
      <div className="w-full h-1 bg-[var(--gradient-gold)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img
              src="/assets/images/HESLOGO.PNG"
              alt="Hair Elevation Studio"
              className="h-12 w-auto object-contain mb-4"
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
                href="https://instagram.com/hair_elevation_studio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[rgba(200,169,126,0.3)] flex items-center justify-center text-[#C8A97E] hover:bg-[#C8A97E] hover:text-[#3B2A23] transition-colors duration-200"
                aria-label="Instagram"
              >
                <BsInstagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://tiktok.com/@hair_elevation_studio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[rgba(200,169,126,0.3)] flex items-center justify-center text-[#C8A97E] hover:bg-[#C8A97E] hover:text-[#3B2A23] transition-colors duration-200"
                aria-label="TikTok"
              >
                <BsTiktok className="w-5 h-5" />
              </Link>
              <Link
                href="https://wa.me/233534057109"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[rgba(200,169,126,0.3)] flex items-center justify-center text-[#C8A97E] hover:bg-[#C8A97E] hover:text-[#3B2A23] transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <BsWhatsapp className="w-5 h-5" />
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