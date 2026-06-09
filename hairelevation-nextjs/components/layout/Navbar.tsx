"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/collections', label: 'Collections' },
  { href: '/services', label: 'Services' },
  { href: '/book', label: 'Book Appointment' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <>
      <nav className="sticky top-0 z-50 bg-ui-overlay backdrop-blur-md border-b border-ui-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/HESLOGO.PNG"
                alt="Hair Elevation Studio"
                width={120}
                height={40}
                className="h-10 w-auto brightness-110 invert"
              />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-ui-text-light font-medium hover:text-brand-gold transition-colors"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 hover:w-full" />
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/cart" className="relative p-2">
                <ShoppingBag className="w-6 h-6 text-ui-text-light" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-brown text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link href="/wishlist" className="relative p-2">
                <Heart className="w-6 h-6 text-ui-text-light" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-brown text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 text-ui-text-light"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-ui-overlay flex flex-col">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-ui-text-light"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center space-y-8 text-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-ui-text-light hover:text-brand-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}