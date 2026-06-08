/**
 * Product Detail Page
 * Dynamic route for individual product pages
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { productService } from "@/services/productService";
import { ProductDetailClient } from "./ProductDetailClient";
import { generateProductSchema, JsonLdScript } from "@/lib/structured-data";
import type { Product } from "@/types/api/product";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    return await productService.getProductById(id);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found - Hair Elevation Studio",
    };
  }

  const imageUrl = productService.getImageUrl(product.coverImage);

  return {
    title: `${product.name} - Hair Elevation Studio`,
    description:
      product.description ||
      `Shop ${product.name} at Hair Elevation Studio. Premium quality wig with ${product.texture || "beautiful"} texture.`,
    alternates: {
      canonical: `https://hairelevationstudios.com/products/${id}`,
    },
    openGraph: {
      title: `${product.name} - Hair Elevation Studio`,
      description: product.description,
      url: `https://hairelevationstudios.com/products/${id}`,
      images: product.coverImage ? [{ url: imageUrl, width: 1200, height: 1200, alt: product.name }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - Hair Elevation Studio`,
      description: product.description,
      images: product.coverImage ? [imageUrl] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const imageUrl = productService.getImageUrl(product.coverImage);
  const additionalImages = product.additionalImages
    .map((img) => productService.getImageUrl(img))
    .filter(Boolean);
  const isOutOfStock = !product.inStock || product.stock === 0;

  return (
    <>
      <JsonLdScript data={generateProductSchema(product)} />
      <ProductDetailClient
        product={product}
        imageUrl={imageUrl}
        additionalImages={additionalImages}
        isOutOfStock={isOutOfStock}
      />
    </>
  );
}
