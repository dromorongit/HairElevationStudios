/**
 * ProductDetailClient Component
 * Client component for product detail page with interactive state
 * Luxury presentation with refined spacing and premium shopping experience
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { QuantityControls } from "@/components/shared/QuantityControls";
import { SizeSelector } from "@/components/shared/SizeSelector";
import { cartService } from "@/services/cartService";
import { ROUTES } from "@/constants/brand";
import type { Product } from "@/types/api/product";

interface ProductDetailClientProps {
  product: Product;
  imageUrl: string;
  additionalImages: string[];
  isOutOfStock: boolean;
}

export function ProductDetailClient({
  product,
  imageUrl,
  additionalImages,
  isOutOfStock,
}: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.size && product.size.length > 0 ? product.size[0] : ""
  );
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    cartService.addToCart(product, quantity, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <main>
      <section className="product-detail py-24 px-8">
        <div className="container max-w-[1400px] mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-12 text-sm" aria-label="Breadcrumb">
            <Link href={ROUTES.products} className="text-[#C8A97E] hover:text-[#A67C52] transition-colors font-medium">
              Products
            </Link>
            <span className="mx-3 text-[#999999]" aria-hidden="true">/</span>
            <span className="text-[#666666]">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Images */}
            <motion.div
              className="product-images"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#F5EFE6] shadow-[var(--shadow-lg)] mb-8">
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                {/* Sale Badge */}
                {product.onSale && (
                  <div className="absolute top-5 left-5">
                    <span className="bg-[#C8A97E] text-white px-4 py-2 rounded-full text-xs font-bold uppercase shadow-lg">
                      Sale
                    </span>
                  </div>
                )}

                {/* Out of Stock Badge */}
                {isOutOfStock && (
                  <div className="absolute top-5 right-5">
                    <span className="bg-[#DC3545] text-white px-4 py-2 rounded-full text-xs font-bold uppercase shadow-lg">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Additional Images */}
              {additionalImages.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {additionalImages.slice(0, 4).map((img, index) => (
                    <motion.div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden bg-[#F5EFE6] cursor-pointer shadow-[var(--shadow-sm)]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} - Image ${index + 2}`}
                        fill
                        sizes="150px"
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              className="product-info"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-[#3B2A23] mb-8 tracking-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mb-10">
                <PriceDisplay
                  price={product.price}
                  promoPrice={product.promoPrice}
                  onSale={product.onSale}
                  size="lg"
                />
              </div>

              {/* Product Details */}
              <div className="space-y-4 mb-10 text-[#666666] py-6 border-y border-[#E8D5C4]">
                {product.length && (
                  <p>
                    <strong className="text-[#3B2A23]">Length:</strong> {product.length}
                  </p>
                )}
                {product.lace && (
                  <p>
                    <strong className="text-[#3B2A23]">Lace:</strong> {product.lace}
                  </p>
                )}
                {product.density && (
                  <p>
                    <strong className="text-[#3B2A23]">Density:</strong> {product.density}
                  </p>
                )}
                {product.texture && (
                  <p>
                    <strong className="text-[#3B2A23]">Texture:</strong> {product.texture}
                  </p>
                )}
                {product.quality && (
                  <p>
                    <strong className="text-[#3B2A23]">Quality:</strong> {product.quality}
                  </p>
                )}
                {product.color && (
                  <p>
                    <strong className="text-[#3B2A23]">Color:</strong> {product.color}
                  </p>
                )}
                <p>
                  <strong className="text-[#3B2A23]">Stock:</strong>{" "}
                  <span className={isOutOfStock ? "text-[#DC3545]" : "text-[#28A745]"}>
                    {isOutOfStock ? "Out of Stock" : `${product.stock} available`}
                  </span>
                </p>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-10">
                  <h3 className="text-xl font-semibold text-[#3B2A23] mb-4">
                    Description
                  </h3>
                  <p className="text-[#666666] leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Size Selection */}
              {product.size && product.size.length > 0 && !isOutOfStock && (
                <div className="mb-10">
                  <SizeSelector
                    sizes={product.size}
                    selectedSize={selectedSize}
                    onSizeChange={handleSizeChange}
                  />
                </div>
              )}

              {/* Add to Cart */}
              {!isOutOfStock && (
                <div className="space-y-6 mb-10">
                  <div className="flex items-center gap-5">
                    <QuantityControls
                      quantity={quantity}
                      onIncrease={() => setQuantity((q) => Math.min(q + 1, product.stock))}
                      onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
                      max={product.stock}
                    />
                  </div>

                  <AnimatePresence>
                    {isAdded && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-[#28A745] text-base font-medium"
                      >
                        Added to cart!
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </div>
              )}

              {/* Back to Products */}
              <Link
                href={ROUTES.products}
                className="inline-flex items-center text-[#C8A97E] hover:text-[#A67C52] transition-colors font-medium"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to Products
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}