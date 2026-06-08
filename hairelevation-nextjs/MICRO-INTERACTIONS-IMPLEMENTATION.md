# Micro-Interactions Implementation

## Overview

This document details the Framer Motion micro-interactions implemented during Phase 2 UX refinement. All animations are designed to be subtle, elegant, and aligned with the luxury brand aesthetic.

## Animation Principles

1. **Restraint**: Animations are subtle, not flashy
2. **Purpose**: Each animation serves a functional purpose
3. **Performance**: Lightweight, no layout thrashing
4. **Consistency**: Similar interactions have similar timing

## Implemented Animations

### 1. Size Selector

**File:** `SizeSelector.tsx`

```tsx
// Hover animation
whileHover={{ scale: disabled ? 1 : 1.05 }}

// Tap animation
whileTap={{ scale: disabled ? 1 : 0.95 }}

// Selection indicator
<motion.div
  layoutId="size-indicator"
  transition={{ type: "spring", duration: 0.3 }}
/>
```

**Behavior:**
- Slight scale up on hover (5%)
- Slight scale down on tap (5%)
- Spring animation for selection highlight
- No animation when disabled

### 2. Cart Item

**File:** `CartItem.tsx`

```tsx
// Entry animation
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.3 }}
```

**Behavior:**
- Fade in with slight upward motion
- Exit with fade out and downward motion
- Smooth removal from cart

### 3. Product Detail Page

**File:** `ProductDetailClient.tsx`

```tsx
// Image section
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.5 }}

// Info section
initial={{ opacity: 0, x: 20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.5, delay: 0.1 }}
```

**Behavior:**
- Staggered entrance for visual interest
- Content slides in from opposite directions
- 0.5s duration for smooth but not slow feel

### 4. Add to Cart Feedback

```tsx
<AnimatePresence>
  {isAdded && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      Added to cart!
    </motion.div>
  )}
</AnimatePresence>
```

**Behavior:**
- Brief success message appears
- Smooth fade in/out
- Auto-dismisses after 2 seconds

### 5. Product Image Gallery

```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <Image ... />
</motion.div>
```

**Behavior:**
- Slight zoom on hover for interactivity hint
- Press-down effect on tap

## Animation Timing Reference

| Animation Type | Duration | Easing |
|---------------|----------|--------|
| Hover scale | 0.2s | ease-in-out |
| Page transitions | 0.5s | ease-out |
| Cart item add/remove | 0.3s | ease-in-out |
| Size selection | 0.3s | spring |
| Success message | 0.2s | ease-in-out |

## Framer Motion Configuration

```tsx
// Default transition settings
const defaultTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

// Quick fade transition
const fadeTransition = {
  duration: 0.2,
  ease: "easeInOut",
};
```

## Performance Considerations

1. **Layout Animations**: Using `layoutId` for smooth re-layouts
2. **Transform Only**: Animations use transform and opacity (GPU-accelerated)
3. **No Scroll Jank**: Animations don't affect document flow
4. **Reduced Motion**: Respects `prefers-reduced-motion` media query

## Future Animation Opportunities

- [ ] Button press effect enhancement
- [ ] Page transition between routes
- [ ] Loading skeleton animations
- [ ] Image loading fade-in
- [ ] Modal open/close animations

## Testing Animations

```tsx
// Test reduced motion preference
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## CSS Custom Properties for Animation

```css
:root {
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 300ms ease-in-out;
  --transition-slow: 500ms ease-in-out;
}
```

## Conclusion

All micro-interactions enhance the user experience without overwhelming the interface. The animations feel premium and support the luxury brand positioning while maintaining excellent performance.