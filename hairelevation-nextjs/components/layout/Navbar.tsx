"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Heart, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { getAllProducts } from '@/lib/api';
import { IProduct } from '@/lib/types';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/collections', label: 'Collections' },
  { href: '/services', label: 'Services' },
  { href: '/book', label: 'Book' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const { cartCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!productsLoaded) {
      getAllProducts().then(setAllProducts).then(() => setProductsLoaded(true));
    }
  }, [productsLoaded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    if (searchQuery && allProducts.length > 0) {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.texture && product.texture.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.lace && product.lace.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.collections && product.collections.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())))
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, allProducts]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[var(--bg-primary)]/95 backdrop-blur-xl border-b border-[var(--border-gold)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/HESLOGO.PNG"
                alt="Hair Elevation Studio"
                width={140}
                height={40}
                className="h-10 w-auto brightness-125"
              />
            </Link>

            {!searchOpen && (
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-[13px] font-body uppercase tracking-widest transition-colors ${
                      pathname === link.href ? 'text-[var(--brand-gold)]' : 'text-[var(--text-primary)]/80'
                    }`}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--gradient-gold)]" />
                    )}
                  </Link>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-[var(--brand-gold)] hover:text-[var(--brand-gold)] transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link href="/cart" className="relative p-2">
                <ShoppingBag className="w-5 h-5 text-[var(--brand-gold)]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--brand-gold)] text-[var(--bg-primary)] text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link href="/wishlist" className="relative p-2">
                <Heart className="w-5 h-5 text-[var(--brand-gold)]" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--brand-gold)] text-[var(--bg-primary)] text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 text-[var(--brand-gold)]"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {searchOpen && (
              <motion.div
                ref={searchRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 bg-[var(--bg-primary)]/95 backdrop-blur-xl border-b border-[var(--border-gold)] p-4"
              >
                <div className="max-w-7xl mx-auto relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search wigs..."
                    className="w-full px-4 py-2 pl-10 rounded-full border border-[var(--brand-gold)] bg-[var(--bg-secondary)] text-[var(--text-primary)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                    autoFocus
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--brand-gold)]/50" />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--brand-gold)]/50 hover:text-[var(--brand-gold)]"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {searchQuery && (
                    <div className="absolute top-full left-0 right-0 mt-2 max-h-80 overflow-y-auto bg-[var(--bg-secondary)]/98 backdrop-blur-md border border-[var(--brand-gold)] rounded-2xl shadow-xl z-50">
                      {searchResults.length > 0 ? (
                        searchResults.map((product) => (
                          <Link
                            key={product._id}
                            href={`/products/${product._id}`}
                            onClick={closeSearch}
                            className="flex items-center gap-3 p-3 hover:bg-[var(--brand-gold)]/10 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                          >
                            <div
                              style={{ backgroundImage: `url(${product.coverImage})` }}
                              className="w-10 h-10 rounded-lg bg-cover bg-center"
                            />
                            <div>
                              <p className="text-sm font-body text-[var(--text-primary)]">{product.name}</p>
                              {product.collections && (
                                <p className="text-xs text-[var(--brand-gold)]">
                                  {typeof product.collections === 'string' ? product.collections : product.collections[0]}
                                </p>
                              )}
                            </div>
                            <span className="ml-auto text-sm font-body text-[var(--brand-gold)]">
                              GHS {product.price.toFixed(2)}
                            </span>
                          </Link>
                        ))
                      ) : (
                        <p className="text-center py-4 text-sm font-body text-[var(--text-muted)]">
                          No products found for &ldquo;{searchQuery}&rdquo;
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-[var(--bg-primary)] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[var(--brand-gold)]"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center space-y-8 text-3xl flex-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`hover:text-[var(--brand-gold)] transition-colors font-heading ${
                      pathname === link.href ? 'text-[var(--brand-gold)]' : 'text-[var(--text-primary)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}