/**
 * Button Component
 * Reusable button with brand styling and accessibility support
 * Luxury presentation with refined interactions
 */

"use client";

import { motion } from "framer-motion";
import { buttonHoverVariants } from "@/lib/motion-variants";

interface ButtonProps {
  variant?: "primary" | "secondary" | "whatsapp" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  asLink?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  asLink = false,
  href,
  target,
  rel,
  disabled,
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-300 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A97E] focus-visible:ring-offset-2";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#C8A97E] via-[#B8956A] to-[#A67C52] text-[#3B2A23] shadow-[var(--shadow-button)] hover:shadow-[0_10px_30px_rgba(200,169,126,0.5)]",
    secondary:
      "bg-[#3B2A23] text-[#F5EFE6] hover:bg-[#2A1F1A]",
    whatsapp:
      "bg-gradient-to-r from-[#25D366] via-[#20B954] to-[#128C7E] text-white shadow-[var(--shadow-whatsapp)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.6)]",
    outline:
      "border-2 border-[#C8A97E] text-[#C8A97E] bg-transparent hover:bg-[#C8A97E] hover:text-[#3B2A23]",
  };

  const sizeStyles = {
    sm: "px-5 py-2 text-xs",
    md: "px-7 py-3 text-sm",
    lg: "px-10 py-4 text-base",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (asLink && href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={combinedClassName}
        variants={buttonHoverVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={combinedClassName}
      variants={buttonHoverVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  );
}