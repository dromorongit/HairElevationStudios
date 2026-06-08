/**
 * Structured Data (JSON-LD) Components
 * Implements schema.org markup for SEO
 */

import type { Product } from "@/types/api/product";
import Script from "next/script";

// Local Business Schema
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://hairelevationstudios.com/#localbusiness",
    name: "Hair Elevation Studio",
    image: "https://hairelevationstudios.com/HESLOGO.PNG",
    url: "https://hairelevationstudios.com",
    telephone: "+233534057109",
    email: "hairelevationstudio@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kanda",
      addressLocality: "Accra",
      addressRegion: "Greater Accra",
      addressCountry: "GH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 5.5502,
      longitude: -0.2075,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "GHS",
    paymentAccepted: ["Cash", "Mobile Money", "Bank Transfer"],
    sameAs: [
      "https://www.instagram.com/hair_elevation_studio",
      "https://www.tiktok.com/@hair_elevation_studio",
    ],
  };
}

// Product Schema
export function generateProductSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://hairelevationstudios.com/products/${product._id}#product`,
    name: product.name,
    description: product.description || `${product.name} - Premium wig from Hair Elevation Studio`,
    image: product.coverImage ? [product.coverImage] : undefined,
    sku: product._id,
    offers: {
      "@type": "Offer",
      url: `https://hairelevationstudios.com/products/${product._id}`,
      priceCurrency: "GHS",
      price: product.onSale && product.promoPrice ? product.promoPrice : product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "LocalBusiness",
        name: "Hair Elevation Studio",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "24",
    },
    brand: {
      "@type": "Brand",
      name: "Hair Elevation Studio",
    },
  };
}

// Collection Schema
export function generateCollectionSchema(collectionName: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `https://hairelevationstudios.com/collections/${collectionName.toLowerCase().replace(/\s+/g, "-")}`,
    name: collectionName,
    description: description,
    url: `https://hairelevationstudios.com/collections/${collectionName.toLowerCase().replace(/\s+/g, "-")}`,
    isPartOf: {
      "@id": "https://hairelevationstudios.com/#website",
    },
  };
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Website Schema
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://hairelevationstudios.com/#website",
    url: "https://hairelevationstudios.com",
    name: "Hair Elevation Studio",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://hairelevationstudios.com/products?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

// JSON-LD Script Component
export function JsonLdScript({ data }: { data: object }) {
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}