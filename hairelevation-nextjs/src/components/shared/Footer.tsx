/**
 * Footer Component
 * Site footer with contact info, social icons, and WhatsApp channel
 */

import Link from "next/link";
import { ROUTES, WHATSAPP, BUSINESS } from "@/constants/brand";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="footer bg-gradient-to-b from-[#3B2A23] to-[#2A1F1A] text-[#F5EFE6]">
      <div className="container max-w-[1200px] mx-auto px-5 py-12">
        <div className="footer-content grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Section */}
          <div className="footer-section">
            <h3 className="text-[1.3rem] font-bold mb-4 text-[#C8A97E]">
              Contact Us
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                Phone/WhatsApp:{" "}
                <a
                  href={WHATSAPP.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C8A97E] transition-colors"
                >
                  0534057109
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="hover:text-[#C8A97E] transition-colors"
                >
                  {BUSINESS.email}
                </a>
              </p>
              <p>Location: {BUSINESS.location}</p>
              <p>Opening Hours: {BUSINESS.hours}</p>
            </div>
          </div>

          {/* Social Icons Section */}
          <div className="footer-section">
            <h3 className="text-[1.3rem] font-bold mb-4 text-[#C8A97E]">
              Follow Us
            </h3>
            <SocialLinks />
          </div>

          {/* WhatsApp Channel Section */}
          <div className="footer-section">
            <h3 className="text-[1.3rem] font-bold mb-4 text-[#C8A97E]">
              WhatsApp Channel
            </h3>
            <p className="text-sm mb-4">
              Stay updated with our latest collections and services!
            </p>
            <Link
              href={WHATSAPP.channel}
              target="_blank"
              rel="noopener noreferrer"
              className="btn whatsapp-channel-btn-footer inline-block px-6 py-3 bg-gradient-to-r from-[#25D366] via-[#20B954] to-[#128C7E] text-white font-semibold uppercase tracking-wider rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.5)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.6)] hover:-translate-y-[3px] transition-all duration-300 text-sm"
            >
              Join Our Channel
            </Link>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom mt-8 pt-6 border-t border-[rgba(200,169,126,0.2)] text-center">
          <p className="text-sm">&copy; 2026 Hair Elevation Studio. All rights reserved.</p>
          <p className="developer-credits text-sm mt-2">
            Developed by{" "}
            <span className="developer-name text-[#C8A97E] font-medium">
              Dromor Narh
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
