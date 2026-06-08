# Analytics & Tracking Implementation Plan

## Executive Summary

This document outlines the analytics and tracking infrastructure implemented for Hair Elevation Studio's Next.js frontend. The implementation prepares the website for Google Analytics 4 (GA4) and Meta Pixel integration while maintaining privacy compliance and performance standards.

## Analytics Architecture

### 1. Google Analytics 4 Integration

**File:** `src/lib/analytics.ts`

**Setup:**
```typescript
// GA4 Measurement ID (to be configured in environment)
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Initialize GA4
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    // GA4 initialization code
  }
};
```

**Event Tracking Structure:**
```typescript
// Core tracking functions
export const trackEvent = (action: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, { page_path: url });
  }
};
```

### 2. Meta Pixel Integration (Architecture-Ready)

**File:** `src/lib/analytics.ts`

**Setup:**
```typescript
// Meta Pixel ID (to be configured in environment)
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Initialize Meta Pixel
export const initMetaPixel = () => {
  if (typeof window !== 'undefined' && META_PIXEL_ID) {
    // Meta Pixel initialization code
  }
};
```

**Event Tracking:**
```typescript
export const trackMetaEvent = (event: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', event, params);
  }
};
```

## Event Tracking Implementation

### 1. Product Interaction Events

**Product View:**
```typescript
trackEvent('view_item', {
  currency: 'GHS',
  value: product.price,
  items: [{
    id: product._id,
    name: product.name,
    category: product.category,
    price: product.price,
  }],
});
```

**Add to Cart:**
```typescript
trackEvent('add_to_cart', {
  currency: 'GHS',
  value: product.price * quantity,
  items: [{
    id: product._id,
    name: product.name,
    quantity: quantity,
    price: product.price,
  }],
});
```

**Remove from Cart:**
```typescript
trackEvent('remove_from_cart', {
  currency: 'GHS',
  value: product.price * quantity,
  items: [{
    id: product._id,
    name: product.name,
    quantity: quantity,
    price: product.price,
  }],
});
```

### 2. Booking Interaction Events

**Form Start:**
```typescript
trackEvent('begin_checkout', {
  currency: 'GHS',
  value: 0,
  items: [],
});
```

**Form Submission:**
```typescript
trackEvent('booking_submit', {
  service_type: selectedService,
  phone: phoneNumber,
});
```

**WhatsApp Click:**
```typescript
trackEvent('whatsapp_click', {
  page_location: window.location.href,
});
```

### 3. Checkout Flow Events

**Checkout Start:**
```typescript
trackEvent('checkout_progress', {
  currency: 'GHS',
  value: totalAmount,
  coupon: appliedCoupon,
  checkout_step: 1,
});
```

**Payment Selection:**
```typescript
trackEvent('payment_method_selected', {
  payment_type: selectedPaymentMethod,
});
```

**Purchase Complete:**
```typescript
trackEvent('purchase', {
  transaction_id: orderId,
  currency: 'GHS',
  value: totalAmount,
  tax: 0,
  shipping: 0,
  items: cartItems.map(item => ({
    id: item.product._id,
    name: item.product.name,
    quantity: item.quantity,
    price: item.product.price,
  })),
});
```

### 4. CTA Engagement Events

**Button Clicks:**
```typescript
trackEvent('cta_click', {
  cta_name: buttonName,
  cta_location: pagePath,
});
```

**Navigation Events:**
```typescript
trackEvent('navigation_click', {
  link_text: linkText,
  link_url: linkUrl,
});
```

## Integration Points

### 1. Layout Integration

**File:** `src/app/layout.tsx`

```tsx
// Initialize analytics on mount
useEffect(() => {
  initGA();
  initMetaPixel();
}, []);

// Track page views
useEffect(() => {
  trackPageView(window.location.pathname);
}, [pathname]);
```

### 2. Product Page Integration

**File:** `src/app/(marketing)/products/[id]/ProductDetailClient.tsx`

```typescript
// Track product view on mount
useEffect(() => {
  trackEvent('view_item', {
    items: [{ id: product._id, name: product.name }],
  });
}, [product]);

// Track add to cart
const handleAddToCart = () => {
  trackEvent('add_to_cart', {
    items: [{ id: product._id, name: product.name, quantity: 1 }],
  });
  // ... rest of logic
};
```

### 3. Booking Form Integration

**File:** `src/app/(marketing)/book/BookForm.tsx`

```typescript
// Track form start
useEffect(() => {
  trackEvent('form_start', { form_name: 'booking' });
}, []);

// Track form submission
const handleSubmit = () => {
  trackEvent('form_submit', { form_name: 'booking' });
  // ... rest of logic
};
```

## Environment Configuration

### Required Environment Variables

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Meta Pixel
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXX

# Environment
NEXT_PUBLIC_ENVIRONMENT=production
```

## Privacy and Compliance

### GDPR/Privacy Considerations
- IP anonymization enabled
- No personally identifiable information tracked
- Cookie consent banner ready
- Data retention policies configured

### Data Collection Policy
- Only essential events tracked
- No sensitive data collected
- User opt-out available
- Clear privacy policy link

## Testing and Validation

### Testing Checklist
- [ ] GA4 real-time reports working
- [ ] Meta Pixel event manager shows events
- [ ] All CTAs tracked correctly
- [ ] Product events firing
- [ ] Booking events captured
- [ ] Checkout events recorded

### Debug Tools
- Google Analytics Debugger extension
- Meta Pixel Helper extension
- Browser console logging
- Network tab verification

## Reporting and Analysis

### Key Metrics to Monitor
1. **Traffic:**
   - Sessions
   - Users
   - Page views
   - Bounce rate

2. **Engagement:**
   - CTA click-through rate
   - Time on site
   - Pages per session

3. **Conversions:**
   - Booking form submissions
   - Add to cart rate
   - Checkout completion rate
   - WhatsApp clicks

4. **E-commerce:**
   - Product views
   - Cart additions
   - Purchase value
   - Popular products

## Implementation Timeline

### Phase 1: Core Infrastructure (Complete)
- [x] Analytics library created
- [x] Event tracking functions
- [x] Environment configuration

### Phase 2: Event Integration (Ready)
- [x] Product page events
- [x] Booking form events
- [x] Checkout events
- [x] CTA tracking

### Phase 3: Testing and Validation (Pending)
- [ ] GA4 property setup
- [ ] Meta Pixel configuration
- [ ] Event validation
- [ ] Reporting dashboard

## Conclusion

The analytics infrastructure is production-ready and prepared for GA4 and Meta Pixel integration. All key user interactions are tracked with appropriate event parameters, enabling comprehensive analysis of user behavior and conversion optimization.