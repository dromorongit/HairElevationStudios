/**
 * Header Component
 * Site header with logo, navigation, cart icon, and hamburger menu
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES, WHATSAPP } from "@/constants/brand";
import { cartService } from "@/services/cartService";
import { SocialLinks } from "./SocialLinks";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  // Update cart count on mount and when cart changes
  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(cartService.getCartCount());
    };

    updateCartCount();

    // Listen for storage changes (cart updates from other tabs)
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
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

  const mobileNavLinks = [
    { href: ROUTES.home, label: "Home" },
    { href: ROUTES.collections, label: "Collections" },
    { href: ROUTES.services, label: "Services" },
    { href: ROUTES.book, label: "Book Appointment" },
  ];

  return (
    <header className="header bg-[rgba(59,42,35,0.95)] backdrop-blur-[10px] text-[#F5EFE6] sticky top-0 z-50 border-b border-[rgba(200,169,126,0.2)]">
      <div className="container max-w-[1200px] mx-auto px-5">
        {/* Header Top - Logo and Hamburger */}
        <div className="header-top flex justify-between items-center py-3">
          <div className="logo">
            <Link href={ROUTES.home} className="flex items-center">
              {/* Logo text fallback */}
              <span className="text-[1.8rem] font-bold text-[#F5EFE6] tracking-wide">
                HES
              </span>
            </Link>
          </div>

          <div className="header-right flex items-center gap-3">
            {/* Mobile Cart Icon */}
            <div className="cart-icon-mobile md:hidden">
              <Link href={ROUTES.cart} aria-label="Shopping Cart" className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="9" cy="21" r="1" stroke="#F5EFE6" strokeWidth="2" />
                  <circle cx="20" cy="21" r="1" stroke="#F5EFE6" strokeWidth="2" />
                  <path
                    d="M1 1h4l2.68 13.39c.2 1 1 1.73 2 1.73h9.72c1 0 1.8-.73 2-1.73L23 6H6"
                    stroke="#F5EFE6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="cart-count absolute -top-1 -right-1 bg-[#C8A97E] text-[#3B2A23] rounded-full w-[18px] h-[18px] flex items-center justify-center text-xs font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Hamburger Menu */}
            <button
              className={`hamburger flex flex-col cursor-pointer p-1 md:hidden ${
                isMenuOpen ? "active" : ""
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="w-[25px] h-[3px] bg-[#F5EFE6] m-[3px_0] transition-all duration-300 rounded-[2px]" />
              <span className="w-[25px] h-[3px] bg-[#F5EFE6] m-[3px_0] transition-all duration-300 rounded-[2px]" />
              <span className="w-[25px] h-[3px] bg-[#F5EFE6] m-[3px_0] transition-all duration-300 rounded-[2px]" />
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Navigation */}
        <div className="mobile-nav-container md:hidden overflow-x-auto">
          <ul className="nav-list horizontal flex gap-3 py-2 overflow-x-auto">
            {mobileNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[#F5EFE6] font-medium whitespace-nowrap text-sm py-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={ROUTES.cart}
                aria-label="Shopping Cart"
                className="relative inline-flex items-center"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="9" cy="21" r="1" stroke="#F5EFE6" strokeWidth="2" />
                  <circle cx="20" cy="21" r="1" stroke="#F5EFE6" strokeWidth="2" />
                  <path
                    d="M1 1h4l2.68 13.39c.2 1 1 1.73 2 1.73h9.72c1 0 1.8-.73 2-1.73L23 6H6"
                    stroke="#F5EFE6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C8A97E] text-[#3B2A23] rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav hidden md:flex items-center justify-between py-2">
          <ul className="nav-list full flex gap-8 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[#F5EFE6] font-medium relative group"
                >
                  {link.label}
                  <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-[#C8A97E] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={ROUTES.cart}
                aria-label="Shopping Cart"
                className="relative inline-flex items-center"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="9" cy="21" r="1" stroke="#F5EFE6" strokeWidth="2" />
                  <circle cx="20" cy="21" r="1" stroke="#F5EFE6" strokeWidth="2" />
                  <path
                    d="M1 1h4l2.68 13.39c.2 1 1 1.73 2 1.73h9.72c1 0 1.8-.73 2-1.73L23 6H6"
                    stroke="#F5EFE6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C8A97E] text-[#3B2A23] rounded-full w-[18px] h-[18px] flex items-center justify-center text-xs font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
          <div className="cta ml-8">
            <Link
              href={ROUTES.book}
              className="btn inline-block px-6 py-3 bg-gradient-to-r from-[#C8A97E] via-[#B8956A] to-[#A67C52] text-[#3B2A23] font-semibold uppercase tracking-wider rounded-full shadow-[0_6px_20px_rgba(200,169,126,0.4)] hover:shadow-[0_8px_25px_rgba(200,169,126,0.5)] hover:-translate-y-[3px] hover:scale-[1.05] transition-all duration-300 text-sm"
            >
              Book Now
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Full-Screen Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[rgba(42,31,26,0.98)] z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-6">
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
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={ROUTES.cart}
            className="text-[#F5EFE6] text-2xl font-medium hover:text-[#C8A97E] transition-colors"
            style={{
              animation: isMenuOpen
                ? `fadeInUp 0.3s ease forwards ${navLinks.length * 0.05}s`
                : "none",
            }}
          >
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link>
        </nav>

        {/* Social icons in mobile menu */}
        <div className="mt-12">
          <SocialLinks />
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
