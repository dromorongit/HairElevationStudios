"use client";

import Link from 'next/link';
import { BsInstagram, BsTiktok, BsWhatsapp } from 'react-icons/bs';

export function Footer() {
  return (
    <footer className="bg-[var(--gradient-brown)] text-[var(--text-primary)] overflow-x-hidden w-full">
      <div className="w-full h-1 bg-[var(--gradient-gold)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 overflow-x-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="w-full">
            <img
              src="/assets/images/HESLOGO.PNG"
              alt="Hair Elevation Studio"
              className="h-10 sm:h-12 w-auto max-w-[160px] object-contain mb-3 sm:mb-4 filter brightness-0 invert flex-shrink-0"
              loading="lazy"
            />
            <p className="text-lg font-heading font-bold mb-1 sm:mb-2 text-[var(--text-primary)] break-words">Elevate Your Style</p>
            <p className="text-sm font-body text-[var(--text-muted)] max-w-xs break-words">
              Premium wig solutions crafted for the modern Ghanaian woman. Experience luxury and elegance
              with every strand.
            </p>
          </div>

          <div className="w-full">
            <h3 className="text-lg font-heading font-bold mb-3 sm:mb-4 text-[var(--text-primary)]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm font-body text-[var(--text-muted)] hover:text-[var(--brand-gold)] transition-colors break-words">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-sm font-body text-[var(--text-muted)] hover:text-[var(--brand-gold)] transition-colors break-words">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm font-body text-[var(--text-muted)] hover:text-[var(--brand-gold)] transition-colors break-words">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-sm font-body text-[var(--text-muted)] hover:text-[var(--brand-gold)] transition-colors break-words">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm font-body text-[var(--text-muted)] hover:text-[var(--brand-gold)] transition-colors break-words">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm font-body text-[var(--text-muted)] hover:text-[var(--brand-gold)] transition-colors break-words">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full">
            <h3 className="text-lg font-heading font-bold mb-3 sm:mb-4 text-[var(--text-primary)]">Connect</h3>
            <ul className="space-y-3 text-sm mb-4">
              <li className="flex items-center gap-2 break-words">
                <span>📞</span>
                <span className="font-body text-[var(--text-primary)]">053 405 7109 (Phone/WhatsApp)</span>
              </li>
              <li className="flex items-center gap-2 break-words">
                <span>✉️</span>
                <span className="font-body text-[var(--text-primary)] truncate">hairelevationstudio@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 break-words">
                <span>📍</span>
                <span className="font-body text-[var(--text-primary)]">Kanda, Accra, Ghana</span>
              </li>
              <li className="flex items-center gap-2 break-words">
                <span>🕒</span>
                <span className="font-body text-[var(--text-primary)]">Tues-Sat: 9am-6pm</span>
              </li>
            </ul>

            <p className="text-sm font-body text-[var(--text-muted)] mb-2">Stay updated with our latest collections!</p>
            <Link
              href="https://whatsapp.com/channel/0029VaFJhHx6BIEiRMOt7f26"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-sm font-medium uppercase tracking-widest transition-all duration-300 inline-flex items-center justify-center bg-transparent border border-[var(--brand-gold)] text-[var(--brand-gold)] hover:bg-[var(--brand-gold)] hover:text-[var(--bg-primary)]"
            >
              Join Our Channel
            </Link>

            <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
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

          <div className="border-t border-[var(--border-gold)] mt-6 md:mt-8 pt-4 md:pt-6 md:col-span-3">
            <p className="text-xs font-body text-[var(--text-muted)] break-words">
              Hair Elevation Studio © 2026. Developed by Dromor Narh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}