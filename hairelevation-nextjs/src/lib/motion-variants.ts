/**
 * Motion Variants for Luxury Experience
 * Cinematic, restrained animations following luxury design principles
 */

import { Variants } from "framer-motion";

// Luxury easing curves - smooth and sophisticated
export const luxuryEasing = [0.25, 0.1, 0.25, 1] as const;
export const luxuryEasingFast = [0.4, 0, 0.2, 1] as const;
export const luxuryEasingSlow = [0.3, 0, 0.1, 1] as const;

// Stagger configurations for elegant reveals
export const staggerChildren = {
  initial: 0,
  animate: 0.1,
  exit: 0,
};

export const staggerFast = {
  initial: 0,
  animate: 0.05,
  exit: 0,
};

// Page transition variants
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: luxuryEasing,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: luxuryEasingFast,
    },
  },
};

// Section reveal variants - elegant fade in with subtle upward motion
export const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: luxuryEasing,
    },
  },
};

// Staggered content reveal
export const contentContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const contentItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: luxuryEasing,
    },
  },
};

// Hero content reveal - cinematic timing
export const heroContentVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export const heroItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: luxuryEasing,
    },
  },
};

// Product card hover - subtle and premium
export const productCardHoverVariants: Variants = {
  initial: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.3,
      ease: luxuryEasing,
    },
  },
};

// Image zoom on hover - restrained
export const imageZoomVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.5,
      ease: luxuryEasing,
    },
  },
};

// Button hover - subtle lift
export const buttonHoverVariants: Variants = {
  initial: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -2,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: luxuryEasingFast,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

// Fade in for images
export const imageFadeVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: luxuryEasing,
    },
  },
};

// Scale in for premium feel
export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: luxuryEasing,
    },
  },
};

// Collection card stagger
export const collectionGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Modal animation - smooth and elegant
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: luxuryEasing,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.3,
      ease: luxuryEasingFast,
    },
  },
};

// Loading skeleton shimmer
export const shimmerVariants: Variants = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 1.5,
      ease: "linear",
      repeat: Infinity,
    },
  },
};