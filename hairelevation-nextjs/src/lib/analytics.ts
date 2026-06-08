/**
 * Analytics Tracking Infrastructure
 * Prepares GA4 and Meta Pixel integration architecture
 */

// Event types for type safety
export type AnalyticsEvent =
  | "view_product"
  | "add_to_cart"
  | "begin_checkout"
  | "complete_purchase"
  | "book_appointment"
  | "contact_submit"
  | "cta_click"
  | "whatsapp_click";

interface BaseEventData {
  event: AnalyticsEvent;
  timestamp: number;
}

interface ProductEventData extends BaseEventData {
  event: "view_product" | "add_to_cart";
  product_id: string;
  product_name: string;
  price: number;
  currency: string;
  quantity?: number;
}

interface CheckoutEventData extends BaseEventData {
  event: "begin_checkout" | "complete_purchase";
  value: number;
  currency: string;
  items: Array<{
    product_id: string;
    product_name: string;
    price: number;
    quantity: number;
  }>;
}

interface BookingEventData extends BaseEventData {
  event: "book_appointment";
  service_type?: string;
}

interface CTAEventData extends BaseEventData {
  event: "cta_click" | "whatsapp_click";
  cta_location: string;
  cta_text?: string;
}

type EventData = ProductEventData | CheckoutEventData | BookingEventData | CTAEventData;

// Analytics configuration
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Track event to GA4
function trackToGA4(data: EventData) {
  if (typeof window === "undefined" || !window.gtag) return;
  
  window.gtag("event", data.event, {
    ...data,
    ...(data.event === "add_to_cart" && {
      currency: data.currency,
      value: data.price * (data.quantity || 1),
    }),
    ...(data.event === "begin_checkout" || data.event === "complete_purchase"
      ? {
          currency: data.currency,
          value: data.value,
          items: data.items,
        }
      : {}),
  });
}

// Track event to Meta Pixel
function trackToMetaPixel(data: EventData) {
  if (typeof window === "undefined" || !window.fbq) return;

  const pixelEventMap: Record<AnalyticsEvent, string> = {
    view_product: "ViewContent",
    add_to_cart: "AddToCart",
    begin_checkout: "InitiateCheckout",
    complete_purchase: "Purchase",
    book_appointment: "Lead",
    contact_submit: "Lead",
    cta_click: "Lead",
    whatsapp_click: "Lead",
  };

  const pixelEvent = pixelEventMap[data.event];
  
  window.fbq("track", pixelEvent, {
    ...data,
    ...(data.event === "add_to_cart" && {
      currency: data.currency,
      value: data.price * (data.quantity || 1),
    }),
    ...(data.event === "begin_checkout" || data.event === "complete_purchase"
      ? {
          currency: data.currency,
          value: data.value,
        }
      : {}),
  });
}

// Main tracking function
export function trackEvent(data: EventData) {
  // Track to GA4
  if (GA4_MEASUREMENT_ID) {
    trackToGA4(data);
  }

  // Track to Meta Pixel
  if (META_PIXEL_ID) {
    trackToMetaPixel(data);
  }

  // Log in development
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", data);
  }
}

// Specific tracking functions
export function trackProductView(productId: string, productName: string, price: number) {
  trackEvent({
    event: "view_product",
    product_id: productId,
    product_name: productName,
    price,
    currency: "GHS",
    timestamp: Date.now(),
  });
}

export function trackAddToCart(
  productId: string,
  productName: string,
  price: number,
  quantity: number = 1
) {
  trackEvent({
    event: "add_to_cart",
    product_id: productId,
    product_name: productName,
    price,
    currency: "GHS",
    quantity,
    timestamp: Date.now(),
  });
}

export function trackBeginCheckout(value: number, items: CheckoutEventData["items"]) {
  trackEvent({
    event: "begin_checkout",
    value,
    currency: "GHS",
    items,
    timestamp: Date.now(),
  });
}

export function trackCompletePurchase(value: number, items: CheckoutEventData["items"]) {
  trackEvent({
    event: "complete_purchase",
    value,
    currency: "GHS",
    items,
    timestamp: Date.now(),
  });
}

export function trackBookAppointment(serviceType?: string) {
  trackEvent({
    event: "book_appointment",
    service_type: serviceType,
    timestamp: Date.now(),
  });
}

export function trackCTAClick(location: string, text?: string) {
  trackEvent({
    event: "cta_click",
    cta_location: location,
    cta_text: text,
    timestamp: Date.now(),
  });
}

export function trackWhatsAppClick(location: string) {
  trackEvent({
    event: "whatsapp_click",
    cta_location: location,
    timestamp: Date.now(),
  });
}

// Type declarations for global window object
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
    fbq?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}