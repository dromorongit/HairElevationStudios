/**
 * Badge Component
 * Reusable badge for sale, out-of-stock, etc.
 */

interface BadgeProps {
  children: React.ReactNode;
  variant?: "sale" | "outOfStock" | "default";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variantStyles = {
    sale: "bg-[#D32F2F] text-white",
    outOfStock: "bg-[#DC3545] text-white",
    default: "bg-[#C8A97E] text-[#3B2A23]",
  };

  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
