/**
 * SizeSelector Component
 * Allows users to select product size with accessible radio buttons
 * Luxury presentation with refined styling
 */

"use client";

import { motion } from "framer-motion";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
  disabled?: boolean;
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSizeChange,
  disabled = false,
}: SizeSelectorProps) {
  return (
    <div className="size-selector">
      <fieldset>
        <legend className="block text-sm font-medium text-[#3B2A23] mb-3">
          Select Size
        </legend>
        <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Select product size">
          {sizes.map((size) => (
            <motion.div
              key={size}
              whileHover={{ scale: disabled ? 1 : 1.05 }}
              whileTap={{ scale: disabled ? 1 : 0.95 }}
            >
              <label
                className={`
                  relative flex items-center justify-center
                  w-20 h-12 rounded-full border-2 cursor-pointer
                  transition-all duration-200
                  ${
                    selectedSize === size
                      ? "border-[#C8A97E] bg-gradient-to-r from-[#F5EFE6] to-[#FAF8F5]"
                      : "border-[#E8D5C4] bg-white hover:border-[#C8A97E]"
                  }
                  ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                <input
                  type="radio"
                  name="size"
                  value={size}
                  checked={selectedSize === size}
                  onChange={() => onSizeChange(size)}
                  disabled={disabled}
                  className="sr-only"
                  aria-label={`Select ${size} size`}
                />
                <span className="text-sm font-medium text-[#3B2A23]">{size}</span>
                {selectedSize === size && (
                  <motion.div
                    layoutId="size-indicator"
                    className="absolute inset-0 border-2 border-[#C8A97E] rounded-full pointer-events-none"
                    initial={false}
                    transition={{ type: "spring", duration: 0.3 }}
                  />
                )}
              </label>
            </motion.div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}