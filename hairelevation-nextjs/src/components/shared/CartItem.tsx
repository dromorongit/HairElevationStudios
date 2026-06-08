/**
 * CartItem Component
 * Displays a single cart item with image, details, quantity controls, and remove button
 * Luxury presentation with refined styling
 */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { CartItem as CartItemType } from "@/types/api/cart";
import { productService } from "@/services/productService";
import { PriceDisplay } from "./PriceDisplay";
import { QuantityControls } from "./QuantityControls";

interface CartItemProps {
  item: CartItemType;
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const { product, quantity, selectedSize } = item;
  const imageUrl = productService.getImageUrl(product.coverImage);
  const itemPrice = product.onSale && product.promoPrice ? product.promoPrice : product.price;
  const itemTotal = itemPrice * quantity;

  return (
    <motion.div
      className="cart-item flex flex-col sm:flex-row gap-5 p-6 bg-white rounded-xl shadow-[var(--shadow-card)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Product Image */}
      <Link
        href={`/products/${product._id}`}
        className="relative w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-[#F5EFE6] shadow-[var(--shadow-sm)]"
      >
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          sizes="128px"
          className="object-cover"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/products/${product._id}`}>
            <h3 className="text-xl font-bold text-[#3B2A23] hover:text-[#C8A97E] transition-colors mb-3">
              {product.name}
            </h3>
          </Link>

          {/* Product specs */}
          <div className="text-sm text-[#666666] space-y-1">
            {product.length && <p>Length: {product.length}</p>}
            {product.lace && <p>Lace: {product.lace}</p>}
            {product.density && <p>Density: {product.density}</p>}
            {product.texture && <p>Texture: {product.texture}</p>}
            {selectedSize && (
              <p className="text-[#C8A97E] font-medium">Size: {selectedSize}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-5">
          {/* Quantity Controls */}
          <QuantityControls
            quantity={quantity}
            onIncrease={() => onUpdateQuantity(product._id, quantity + 1)}
            onDecrease={() => onUpdateQuantity(product._id, quantity - 1)}
            max={product.stock}
          />

          {/* Price and Remove */}
          <div className="flex items-center gap-5">
            <div className="text-right">
              <PriceDisplay
                price={product.price}
                promoPrice={product.promoPrice}
                onSale={product.onSale}
              />
              <p className="text-xs text-[#666666] mt-1">
                Subtotal: <span className="font-semibold text-[#3B2A23]">GH₵{itemTotal.toLocaleString()}</span>
              </p>
            </div>
            <button
              onClick={() => onRemove(product._id)}
              className="text-[#DC3545] hover:text-[#D32F2F] transition-colors text-sm font-medium px-4 py-2 rounded-full hover:bg-[#DC3545]/10"
              aria-label={`Remove ${product.name} from cart`}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}