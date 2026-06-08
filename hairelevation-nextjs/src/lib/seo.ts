/**
 * SEO Configuration
 * Centralized SEO utilities for metadata generation
 */

import type { Metadata } from "next";

const siteConfig = {
  name: "Hair Elevation Studio",
  description:
    "Premium glueless wigs, custom coloring, styling, and luxury wig experiences for modern women in Accra, Ghana.",
  url: "https://hairelevationstudios.com",
  ogImage: "https://hairelevationstudios.com/og-image.jpg",
  locale: "en_GH",
  keywords: [
    "wigs",
    "premium wigs",
    "glueless wigs",
    "hair extensions",
    "wig installation",
    "custom wigs",
    "Ghana",
    "Accra",
    "luxury wigs",
    "human hair wigs",
  ],
};

export function createMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: "@hairelevation",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    ...overrides,
  };
}

export function createPageMetadata(
  title: string,
  description: string,
  path: string,
  image?: string
): Metadata {
  return createMetadata({
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}${path}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${path}`,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      title,
      description,
      images: image ? [image] : undefined,
    },
  });
}

export { siteConfig };