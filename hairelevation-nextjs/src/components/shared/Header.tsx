/**
 * Header Component
 * Site header with logo, navigation, cart icon, and hamburger menu
 * Luxury-grade experience with refined navigation
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
    { href: ROUTES.about, label: "Our Story" },
    { href: ROUTES.collections, label: "Collections" },
    { href: ROUTES.products, label: "Products" },
    { href: ROUTES.services, label: "Services" },
    { href: ROUTES.contact, label: "Contact" },
  ];

  return (
    <header className={`
      header bg-white/95 backdrop-blur-md text-[#3B2A23] sticky top-0 z-50 
      transition-all duration-500 border-b border-[#C8A97E]/10
      ${isScrolled ? "shadow-[var(--shadow-header)]" : "shadow-[var(--shadow-sm)]"}
    `}>
      <div className="container max-w-[1400px] mx-auto px-8">
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-between py-6">
          {/* Left: Logo */}
          <div className="logo">
            <Link href={ROUTES.home} className="flex items-center">
              <span className="text-3xl font-bold text-[#3B2A23] tracking-tight hover:text-[#C8A97E] transition-colors">
                Hair Elevation Studio
              </span>
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <ul className="nav-list flex items-center gap-12 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-[#3B2A23] font-medium text-sm uppercase tracking-wider relative py-2 transition-colors
                    ${pathname === link.href ? "text-[#C8A97E]" : "hover:text-[#C8A97E]"}`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#C8A97E] to-[#A67C52]" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: Cart and CTA */}
          <div className="flex items-center gap-8">
            {/* Cart Icon */}
            <Link href={ROUTES.cart} aria-label="Shopping Cart" className="relative group">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#3B2A23] group-hover:text-[#C8A97E] transition-colors"
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
                <span className="absolute -top-2 -right-2 bg-[#C8A97E] text-[#3B2A23] rounded-full min-w-5 h-5 flex items-center justify-center text-xs font-bold px-1">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* CTA Button */}
            <Link
              href={ROUTES.book}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#C8A97E] via-[#B8956A] to-[#A67C52] text-[#3B2A23] font-semibold uppercase tracking-wider rounded-full shadow-[0_6px_20px_rgba(200,169,126,0.4)] hover:shadow-[0_10px_30px_rgba(200,169,126,0.5)] hover:-translate-y-1 transition-all duration-300 text-sm"
            >
              Book Appointment
            </Link>
          </div>
        </nav>

        {/* Tablet Navigation */}
        <nav className="hidden md:flex lg:hidden items-center justify-between py-5">
          {/* Logo */}
          <div className="logo">
            <Link href={ROUTES.home} className="flex items-center">
              <span className="text-2xl font-bold text-[#3B2A23] tracking-tight">
                HES
              </span>
            </Link>
          </div>

          {/* Cart and Hamburger */}
          <div className="flex items-center gap-5">
            {/* Cart Icon */}
            <Link href={ROUTES.cart} aria-label="Shopping Cart" className="relative p-2">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#3B2A23]"
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
              <span className={`w-6 h-0.5 bg-[#3B2A23] mb-1.5 transition-all duration-300 rounded ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-6 h-0.5 bg-[#3B2A23] mb-1.5 transition-all duration-300 rounded ${isMenuOpen ? "opacity-0" : ""}`} />
              <span className={`w-6 h-0.5 bg-[#3B2A23] transition-all duration-300 rounded ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </nav>

        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center py-5">
          {/* Logo */}
          <div className="logo">
            <Link href={ROUTES.home} className="flex items-center">
              <span className="text-xl font-bold text-[#3B2A23] tracking-tight">
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
                className="text-[#3B2A23]"
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
              <span className={`w-6 h-0.5 bg-[#3B2A23] mb-1.5 transition-all duration-300 rounded ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-6 h-0.5 bg-[#3B2A23] mb-1.5 transition-all duration-300 rounded ${isMenuOpen ? "opacity-0" : ""}`} />
              <span className={`w-6 h-0.5 bg-[#3B2A23] transition-all duration-300 rounded ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile Full-Screen Menu Overlay */}
        <div
          className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col items-center gap-10 mb-12">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[#3B2A23] text-2xl font-medium hover:text-[#C8A97E] transition-colors tracking-tight
                  ${pathname === link.href ? "text-[#C8A97E]" : ""}`}
                style={{
                  animation: isMenuOpen
                    ? `fadeInUp 0.4s ease forwards ${index * 0.07}s`
                    : "none",
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA in Mobile Menu */}
          <Link
            href={ROUTES.book}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#C8A97E] via-[#B8956A] to-[#A67C52] text-[#3B2A23] font-semibold uppercase tracking-wider rounded-full shadow-[0_6px_20px_rgba(200,169,126,0.4)] mb-8"
            onClick={() => setIsMenuOpen(false)}
          >
            Book Appointment
          </Link>

          {/* Social icons in mobile menu */}
          <div className="mt-6">
            <SocialLinks />
          </div>

          {/* Close hint */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-8 text-[#3B2A23]/60 hover:text-[#3B2A23] transition-colors p-2"
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