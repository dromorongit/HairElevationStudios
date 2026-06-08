/**
 * Header Component
 * Site header with logo, navigation, cart icon, and hamburger menu
 * Refined for luxury-grade experience
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/brand";
import { cartService } from "@/services/cartService";
import { SocialLinks } from "./SocialLinks";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(cartService.getCartCount());
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: ROUTES.home, label: "Home" },
    { href: ROUTES.about, label: "About" },
    { href: ROUTES.collections, label: "Collections" },
    { href: ROUTES.services, label: "Services" },
    { href: ROUTES.book, label: "Book Appointment" },
    { href: ROUTES.contact, label: "Contact" },
  ];

  return (
    <header className={`
      header bg-gradient-to-r from-[#3B2A23]/95 to-[#2A1F1A]/95 
      backdrop-blur-md text-[#F5EFE6] sticky top-0 z-50 
      transition-all duration-300
      ${isScrolled ? "shadow-[0_4px_20px_rgba(59,42,35,0.3)]" : "border-b border-[#C8A97E]/20"}
    `}>
      <div className="container max-w-[1200px] mx-auto px-5">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-between py-4">
          {/* Left: Logo */}
          <div className="logo">
            <Link href={ROUTES.home} className="flex items-center">
              <span className="text-2xl font-bold text-[#F5EFE6] tracking-wide hover:text-[#C8A97E] transition-colors">
                HES
              </span>
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <ul className="nav-list flex items-center gap-10 list-none">
            {navLinks.slice(0, 5).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[#F5EFE6] font-medium text-sm uppercase tracking-wider relative group"
                >
                  {link.label}
                  <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-[#C8A97E] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: Cart and CTA */}
          <div className="flex items-center gap-6">
            {/* Cart Icon */}
            <Link href={ROUTES.cart} aria-label="Shopping Cart" className="relative">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:text-[#C8A97E] transition-colors"
              >
                <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="2" />
                <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M1 1h4l2.68 13.39c.2 1 1 1.73 2 1.73h9.72c1 0 1.8-.73 2-1.73L23 6H6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C8A97E] text-[#3B2A23] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* CTA Button */}
            <Link
              href={ROUTES.book}
              className="btn-book inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#C8A97E] via-[#B8956A] to-[#A67C52] text-[#3B2A23] font-semibold uppercase tracking-wider rounded-full shadow-[0_6px_20px_rgba(200,169,126,0.4)] hover:shadow-[0_8px_25px_rgba(200,169,126,0.5)] hover:-translate-y-[2px] transition-all duration-300 text-sm"
            >
              Book Now
            </Link>
          </div>
        </nav>

        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center py-4">
          {/* Logo */}
          <div className="logo">
            <Link href={ROUTES.home} className="flex items-center">
              <span className="text-xl font-bold text-[#F5EFE6] tracking-wide">
                HES
              </span>
            </Link>
          </div>

          {/* Cart and Hamburger */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <Link href={ROUTES.cart} aria-label="Shopping Cart" className="relative p-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#F5EFE6]"
              >
                <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="2" />
                <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M1 1h4l2.68 13.39c.2 1 1 1.73 2 1.73h9.72c1 0 1.8-.73 2-1.73L23 6H6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C8A97E] text-[#3B2A23] rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger Menu */}
            <button
              className={`hamburger flex flex-col cursor-pointer p-2 ${isMenuOpen ? "active" : ""}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className={`w-6 h-0.5 bg-[#F5EFE6] mb-1.5 transition-all duration-300 rounded ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-6 h-0.5 bg-[#F5EFE6] mb-1.5 transition-all duration-300 rounded ${isMenuOpen ? "opacity-0" : ""}`} />
              <span className={`w-6 h-0.5 bg-[#F5EFE6] transition-all duration-300 rounded ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile Full-Screen Menu Overlay */}
        <div
          className={`fixed inset-0 bg-gradient-to-b from-[#3B2A23] to-[#2A1F1A] z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col items-center gap-8 mb-12">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#F5EFE6] text-2xl font-medium hover:text-[#C8A97E] transition-colors"
                style={{
                  animation: isMenuOpen
                    ? `fadeInUp 0.3s ease forwards ${index * 0.05}s`
                    : "none",
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social icons in mobile menu */}
          <div className="mt-8">
            <SocialLinks />
          </div>

          {/* Close hint */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-[#F5EFE6]/60 hover:text-[#F5EFE6] transition-colors"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Inline styles for mobile menu animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}