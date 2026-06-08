/**
 * ProductCard Component
 * Displays a single product with image, name, price, and add-to-cart
 * Enhanced with luxury motion and premium interactions
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
      className="product-card bg-white rounded-xl shadow-[0_8px_20px_rgba(99,42,35,0.1)] overflow-hidden"
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
          <div className="absolute top-3 left-3">
            <Badge variant="sale">Sale</Badge>
          </div>
        )}

        {/* Out of Stock Badge */}
        {isOutOfStock && (
          <div className="absolute top-3 right-3">
            <Badge variant="outOfStock">Out of Stock</Badge>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-6">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-xl font-bold text-[#3B2A23] mb-3 hover:text-[#C8A97E] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Product Details */}
        {(product.length || product.lace || product.density || product.texture) && (
          <div className="text-sm text-[#666666] mb-3 space-y-1">
            {product.length && <p>Length: {product.length}</p>}
            {product.lace && <p>Lace: {product.lace}</p>}
            {product.density && <p>Density: {product.density}</p>}
            {product.texture && <p>Texture: {product.texture}</p>}
          </div>
        )}

        {/* Price */}
        <div className="mb-5">
          <PriceDisplay
            price={product.price}
            promoPrice={product.promoPrice}
            onSale={product.onSale}
          />
        </div>

        {/* Add to Cart */}
        {!isOutOfStock ? (
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
        ) : (
          <Button disabled size="sm" className="w-full">
            Out of Stock
          </Button>
        )}
      </div>
    </motion.div>
  );
}