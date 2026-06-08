/**
 * PriceDisplay Component
 * Displays product price with sale/promo pricing
 * Luxury presentation with refined typography
 */

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
    <div className="price-container flex items-center gap-3 flex-wrap">
      {onSale && promoPrice && (
        <span
          className={`original-price text-[#999999] line-through ${sizeStyles[size]}`}
        >
          GH₵{price.toLocaleString()}
        </span>
      )}
      <span
        className={`font-bold ${
          onSale ? "text-[#D32F2F]" : "text-[#3B2A23]"
        } ${sizeStyles[size]}`}
      >
        GH₵{displayPrice.toLocaleString()}
      </span>
    </div>
  );
}