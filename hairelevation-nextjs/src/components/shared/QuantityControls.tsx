/**
 * QuantityControls Component
 * +/- quantity controls for cart and product cards
 */

interface QuantityControlsProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}

export function QuantityControls({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max,
  size = "md",
}: QuantityControlsProps) {
  const sizeStyles = {
    sm: "w-7 h-7 text-xs",
    md: "w-8 h-8 text-sm",
  };

  const isDecreaseDisabled = quantity <= min;
  const isIncreaseDisabled = max !== undefined && quantity >= max;

  return (
    <div className="quantity-controls flex items-center gap-1">
      <button
        type="button"
        onClick={onDecrease}
        disabled={isDecreaseDisabled}
        className={`quantity-btn ${sizeStyles[size]} flex items-center justify-center bg-[#F5EFE6] text-[#3B2A23] rounded-full font-bold hover:bg-[#E8D5C4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="quantity w-8 text-center font-semibold text-[#3B2A23]">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={isIncreaseDisabled}
        className={`quantity-btn ${sizeStyles[size]} flex items-center justify-center bg-[#F5EFE6] text-[#3B2A23] rounded-full font-bold hover:bg-[#E8D5C4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
