/**
 * Footer Component
 * Site footer with contact info, social icons, and WhatsApp channel
 * Refined for professional multi-column structure
 */

import Link from "next/link";
import { ROUTES, WHATSAPP, BUSINESS } from "@/constants/brand";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="footer bg-gradient-to-b from-[#3B2A23] to-[#2A1F1A] text-[#F5EFE6] pt-20 pb-8">
      <div className="container max-w-[1200px] mx-auto px-5">
        {/* Footer Top - 4 Column Grid */}
        <div className="footer-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="footer-section">
            <Link href={ROUTES.home} className="inline-block mb-4">
              <span className="text-2xl font-bold text-[#F5EFE6] tracking-wide hover:text-[#C8A97E] transition-colors">
                HES
              </span>
            </Link>
            <p className="text-sm text-[#999999] leading-relaxed max-w-xs">
              Premium wig brand specializing in high-quality glueless wigs, 
              custom coloring, styling, and luxury wig experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="text-lg font-semibold text-[#C8A97E] mb-4">
              Quick Links
            </h3>
            <ul className="footer-links space-y-3">
              <li><Link href={ROUTES.home} className="text-sm hover:text-[#C8A97E] transition-colors">Home</Link></li>
              <li><Link href={ROUTES.about} className="text-sm hover:text-[#C8A97E] transition-colors">About</Link></li>
              <li><Link href={ROUTES.collections} className="text-sm hover:text-[#C8A97E] transition-colors">Collections</Link></li>
              <li><Link href={ROUTES.products} className="text-sm hover:text-[#C8A97E] transition-colors">Products</Link></li>
              <li><Link href={ROUTES.services} className="text-sm hover:text-[#C8A97E] transition-colors">Services</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h3 className="text-lg font-semibold text-[#C8A97E] mb-4">
              Customer Service
            </h3>
            <ul className="footer-links space-y-3">
              <li><Link href={ROUTES.book} className="text-sm hover:text-[#C8A97E] transition-colors">Book Appointment</Link></li>
              <li><Link href={ROUTES.contact} className="text-sm hover:text-[#C8A97E] transition-colors">Contact Us</Link></li>
              <li><Link href={ROUTES.cart} className="text-sm hover:text-[#C8A97E] transition-colors">Your Cart</Link></li>
              <li><Link href={WHATSAPP.url} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-[#C8A97E] transition-colors">WhatsApp Support</Link></li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="footer-section">
            <h3 className="text-lg font-semibold text-[#C8A97E] mb-4">
              Follow Us
            </h3>
            <SocialLinks />
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="text-lg font-semibold text-[#C8A97E] mb-4">
              Contact Information
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-[#999999]">Phone/WhatsApp:</span>{" "}
                <a
                  href={WHATSAPP.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C8A97E] transition-colors"
                >
                  0534057109
                </a>
              </div>
              <div>
                <span className="text-[#999999]">Email:</span>{" "}
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="hover:text-[#C8A97E] transition-colors"
                >
                  {BUSINESS.email}
                </a>
              </div>
              <div>
                <span className="text-[#999999]">Location:</span>{" "}
                <span className="block mt-1">{BUSINESS.location}</span>
              </div>
              <div>
                <span className="text-[#999999]">Hours:</span>{" "}
                <span className="block mt-1">{BUSINESS.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Channel Section */}
        <div className="whatsapp-section border-t border-[#C8A97E]/20 pt-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-[#C8A97E] mb-2 sm:mb-0">
                Stay Updated
              </h3>
              <p className="text-sm text-[#999999]">
                Join our WhatsApp channel for exclusive updates and collections.
              </p>
            </div>
            <Link
              href={WHATSAPP.channel}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#25D366] via-[#20B954] to-[#128C7E] text-white font-semibold uppercase tracking-wider rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.5)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.6)] hover:-translate-y-[2px] transition-all duration-300 text-sm"
            >
              Join Channel
            </Link>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom border-t border-[#C8A97E]/20 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#999999]">
              &copy; 2026 Hair Elevation Studio. All rights reserved.
            </p>
            <p className="text-sm text-[#999999]">
              Developed by{" "}
              <span className="text-[#C8A97E] font-medium">
                Dromor Narh
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}