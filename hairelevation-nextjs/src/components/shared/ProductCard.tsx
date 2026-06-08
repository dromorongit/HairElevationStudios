/**
 * ProductCard Component
 * Displays a single product with image, name, price, and add-to-cart
 * Luxury presentation with premium interactions
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/types/api/product";
import { productService } from "@/services/productService";
import { cartService } from "@/services/cartService";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PriceDisplay } from "./PriceDisplay";
import { QuantityControls } from "./QuantityControls";
import {
  productCardHoverVariants,
  imageZoomVariants,
  buttonHoverVariants,
} from "@/lib/motion-variants";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const imageUrl = productService.getImageUrl(product.coverImage);
  const isOutOfStock = !product.inStock || product.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    setIsAdding(true);
    cartService.addToCart(product, quantity);
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 500);
  };

  return (
    <motion.div
      className="product-card bg-white rounded-xl shadow-[var(--shadow-card)] overflow-hidden"
      variants={productCardHoverVariants}
      initial="initial"
      whileHover="hover"
    >
      {/* Product Image */}
      <Link href={`/products/${product._id}`} className="block relative aspect-[3/4] overflow-hidden bg-[#F5EFE6]">
        <motion.div
          variants={imageZoomVariants}
          initial="initial"
          whileHover="hover"
          className="w-full h-full"
        >
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        </motion.div>

        {/* Sale Badge */}
        {product.onSale && (
          <div className="absolute top-4 left-4">
            <Badge variant="sale">Sale</Badge>
          </div>
        )}

        {/* Out of Stock Badge */}
        {isOutOfStock && (
          <div className="absolute top-4 right-4">
            <Badge variant="outOfStock">Out of Stock</Badge>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-7 flex flex-col h-[200px]">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-xl font-bold text-[#3B2A23] mb-3 hover:text-[#C8A97E] transition-colors leading-tight tracking-tight">
            {product.name}
          </h3>
        </Link>

        {/* Product Details - Condensed */}
        {(product.length || product.lace || product.density || product.texture) && (
          <div className="text-sm text-[#666666] mb-4 space-y-1 leading-relaxed">
            {product.length && <p className="truncate">Length: {product.length}</p>}
            {product.lace && <p className="truncate">Lace: {product.lace}</p>}
            {product.density && <p className="truncate">Density: {product.density}</p>}
            {product.texture && <p className="truncate">Texture: {product.texture}</p>}
          </div>
        )}

        {/* Price - Pushed to bottom with mt-auto */}
        <div className="mt-auto">
          <div className="mb-5">
            <PriceDisplay
              price={product.price}
              promoPrice={product.promoPrice}
              onSale={product.onSale}
            />
          </div>

          {/* Add to Cart */}
          {!isOutOfStock && (
            <div className="flex items-center gap-4">
              <QuantityControls
                quantity={quantity}
                onIncrease={() => setQuantity((q) => Math.min(q + 1, product.stock))}
                onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
                max={product.stock}
                size="sm"
              />
              <motion.div
                variants={buttonHoverVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  size="sm"
                  className="flex-1"
                >
                  {isAdding ? "Added!" : "Add to Cart"}
                </Button>
              </motion.div>
            </div>
          )}

          {isOutOfStock && (
            <Button disabled size="sm" className="w-full">
              Out of Stock
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}