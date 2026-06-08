# Motion System Implementation

## Overview

This document details the luxury motion system implemented for Hair Elevation Studio using Framer Motion. The system follows the principle of "subtle over loud" - creating elegant, restrained animations that enhance the brand experience without distraction.

## Core Principles

### Luxury Easing Curves

```typescript
// Primary easing - smooth and sophisticated
export const luxuryEasing = [0.25, 0.1, 0.25, 1] as const;

// Fast interactions - responsive
export const luxuryEasingFast = [0.4, 0, 0.2, 1] as const;

// Slow transitions - cinematic
export const luxuryEasingSlow = [0.3, 0, 0.1, 1] as const;
```

### Stagger Configurations

```typescript
// Standard stagger for content reveals
export const staggerChildren = {
  initial: 0,
  animate: 0.1,
  exit: 0,
};

// Fast stagger for product grids
export const staggerFast = {
  initial: 0,
  animate: 0.05,
  exit: 0,
};
```

## Animation Variants

### Page Transitions

```typescript
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
```

### Section Reveal

```typescript
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
```

### Hero Content Stagger

```typescript
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
```

### Product Card Interactions

```typescript
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
```

### Button Interactions

```typescript
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
```

## Implementation Patterns

### Scroll-Triggered Animations

```tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function AnimatedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      {/* Content */}
    </motion.section>
  );
}
```

### Staggered Grid Animations

```tsx
export function ProductGrid({ products }) {
  return (
    <motion.div
      className="product-grid"
      variants={collectionGridVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </motion.div>
  );
}
```

### Hover Interactions

```tsx
export function ProductCard({ product }) {
  return (
    <motion.div
      variants={productCardHoverVariants}
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        variants={imageZoomVariants}
        initial="initial"
        whileHover="hover"
      >
        <Image src={imageUrl} alt={product.name} />
      </motion.div>
    </motion.div>
  );
}
```

## Performance Considerations

1. **Hardware Acceleration:** All animations use `transform` and `opacity` properties
2. **Single Execution:** `useInView` with `once: true` prevents repeated animations
3. **Stagger Limits:** Maximum 0.15s stagger to maintain performance
4. **Duration Limits:** Animations between 0.3s - 0.8s for optimal perception

## Accessibility

The motion system respects user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Usage Guidelines

1. **Use sparingly:** Only animate key elements that benefit from motion
2. **Maintain consistency:** Use the same variants across similar components
3. **Test on mobile:** Ensure animations perform well on lower-end devices
4. **Consider context:** Some pages may need reduced motion for better UX