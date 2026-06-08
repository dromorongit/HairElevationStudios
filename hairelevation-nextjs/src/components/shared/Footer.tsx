/**
 * Footer Component
 * Site footer with contact info, social icons, and WhatsApp channel
 * Premium multi-column structure for luxury experience
 */

import Link from "next/link";
import { ROUTES, WHATSAPP, BUSINESS } from "@/constants/brand";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="footer bg-gradient-to-b from-[#3B2A23] to-[#2A1F1A] text-[#F5EFE6] pt-24 pb-10">
      <div className="container max-w-[1400px] mx-auto px-8">
        {/* Footer Top - 5 Column Grid */}
        <div className="footer-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Section */}
          <div className="footer-section lg:col-span-2">
            <Link href={ROUTES.home} className="inline-block mb-6">
              <span className="text-3xl font-bold text-[#F5EFE6] tracking-tight hover:text-[#C8A97E] transition-colors">
                Hair Elevation Studio
              </span>
            </Link>
            <p className="text-sm text-[#999999] leading-relaxed pr-4">
              Premium wig brand specializing in high-quality glueless wigs, 
              custom coloring, styling, and luxury wig experiences for the modern woman.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="text-sm font-semibold text-[#C8A97E] mb-5 tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="footer-links space-y-3">
              <li><Link href={ROUTES.home} className="text-sm text-[#999999] hover:text-[#F5EFE6] transition-colors">Home</Link></li>
              <li><Link href={ROUTES.about} className="text-sm text-[#999999] hover:text-[#F5EFE6] transition-colors">About</Link></li>
              <li><Link href={ROUTES.collections} className="text-sm text-[#999999] hover:text-[#F5EFE6] transition-colors">Collections</Link></li>
              <li><Link href={ROUTES.products} className="text-sm text-[#999999] hover:text-[#F5EFE6] transition-colors">Products</Link></li>
              <li><Link href={ROUTES.services} className="text-sm text-[#999999] hover:text-[#F5EFE6] transition-colors">Services</Link></li>
              <li><Link href={ROUTES.contact} className="text-sm text-[#999999] hover:text-[#F5EFE6] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h3 className="text-sm font-semibold text-[#C8A97E] mb-5 tracking-wider uppercase">
              Services
            </h3>
            <ul className="footer-links space-y-3">
              <li><Link href={ROUTES.book} className="text-sm text-[#999999] hover:text-[#F5EFE6] transition-colors">Book Appointment</Link></li>
              <li><Link href={ROUTES.cart} className="text-sm text-[#999999] hover:text-[#F5EFE6] transition-colors">Your Cart</Link></li>
              <li><Link href={WHATSAPP.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#999999] hover:text-[#F5EFE6] transition-colors">WhatsApp Support</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="text-sm font-semibold text-[#C8A97E] mb-5 tracking-wider uppercase">
              Contact
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-[#999999]">Phone:</span>{" "}
                <a
                  href={WHATSAPP.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5EFE6] hover:text-[#C8A97E] transition-colors"
                >
                  053 405 7109
                </a>
              </div>
              <div>
                <span className="text-[#999999]">Email:</span>{" "}
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="text-[#F5EFE6] hover:text-[#C8A97E] transition-colors"
                >
                  {BUSINESS.email}
                </a>
              </div>
              <div>
                <span className="text-[#999999] block mb-1">Location:</span>{" "}
                <span className="text-[#F5EFE6]">{BUSINESS.location}</span>
              </div>
              <div>
                <span className="text-[#999999] block mb-1">Hours:</span>{" "}
                <span className="text-[#F5EFE6]">{BUSINESS.hours}</span>
              </div>
            </div>
          </div>

          {/* Social Section */}
          <div className="footer-section">
            <h3 className="text-sm font-semibold text-[#C8A97E] mb-5 tracking-wider uppercase">
              Follow Us
            </h3>
            <SocialLinks />
          </div>
        </div>

        {/* WhatsApp Channel Section */}
        <div className="whatsapp-section border-t border-[#C8A97E]/15 pt-10 mb-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[#C8A97E] mb-2 sm:mb-0">
                Join Our WhatsApp Channel
              </h3>
              <p className="text-sm text-[#999999]">
                Get exclusive updates, new collections, and special offers.
              </p>
            </div>
            <Link
              href={WHATSAPP.channel}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#25D366] via-[#20B954] to-[#128C7E] text-white font-semibold uppercase tracking-wider rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.5)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all duration-300 text-sm"
            >
              Join Channel
            </Link>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom border-t border-[#C8A97E]/15 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#999999] order-2 sm:order-1">
              &copy; 2026 Hair Elevation Studio. All rights reserved.
            </p>
            <div className="flex items-center gap-6 order-1 sm:order-2">
              <Link href={ROUTES.home} className="text-xs text-[#999999] hover:text-[#C8A97E] transition-colors">
                Privacy Policy
              </Link>
              <Link href={ROUTES.home} className="text-xs text-[#999999] hover:text-[#C8A97E] transition-colors">
                Terms of Service
              </Link>
            </div>
            <p className="text-sm text-[#999999] order-3">
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