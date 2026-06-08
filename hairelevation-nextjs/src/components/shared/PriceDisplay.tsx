/**
 * PriceDisplay Component
 * Displays product price with sale/promo pricing
 */

import { BRAND } from "@/constants/brand";

interface PriceDisplayProps {
  price: number;
  promoPrice?: number;
  onSale?: boolean;
  size?: "sm" | "md" | "lg";
}

export function PriceDisplay({
  price,
  promoPrice,
  onSale = false,
  size = "md",
}: PriceDisplayProps) {
  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  const displayPrice = onSale && promoPrice ? promoPrice : price;

  return (
    <div className="price-container flex items-center gap-2 flex-wrap">
      {onSale && promoPrice && (
        <span
          className={`original-price text-[${BRAND.colors.grayLight}] line-through ${sizeStyles[size]}`}
        >
          GH₵{price.toLocaleString()}
        </span>
      )}
      <span
        className={`font-bold ${
          onSale ? `text-[${BRAND.colors.saleRed}]` : `text-[${BRAND.colors.black}]`
        } ${sizeStyles[size]}`}
      >
        GH₵{displayPrice.toLocaleString()}
      </span>
    </div>
  );
}
