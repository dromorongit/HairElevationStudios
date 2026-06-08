/**
 * Collection Detail Page
 * Dynamic route for individual collection pages
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { productService } from "@/services/productService";
import { generateCollectionSchema, generateBreadcrumbSchema, JsonLdScript } from "@/lib/structured-data";
import type { Product } from "@/types/api/product";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Map slugs to collection names
const slugToCollectionName: Record<string, string> = {
  "bridal-crowns": "The Bridal Crowns",
  "everyday-crown": "The Everyday Crown",
  "queens-curls": "The Queen's Curls",
  "signature-pixies": "The Signature Pixies",
};

const collectionDescriptions: Record<string, string> = {
  "bridal-crowns":
    "Elegant and sophisticated wigs perfect for weddings and special occasions.",
  "everyday-crown":
    "Comfortable, versatile wigs for daily wear and casual occasions.",
  "queens-curls":
    "Luxurious curly wigs that add volume and bounce to your look.",
  "signature-pixies":
    "Playful and trendy pixie cuts for a bold, modern statement.",
};

async function getCollectionProducts(collectionName: string): Promise<Product[]> {
  try {
    return await productService.getProductsByCollection(collectionName);
  } catch (error) {
    console.error("Error fetching collection products:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collectionName = slugToCollectionName[slug];

  if (!collectionName) {
    return {
      title: "Collection Not Found - Hair Elevation Studio",
    };
  }

  return {
    title: `${collectionName} - Hair Elevation Studio`,
    description: collectionDescriptions[slug] || `Browse ${collectionName} collection at Hair Elevation Studio.`,
    alternates: {
      canonical: `https://hairelevationstudios.com/collections/${slug}`,
    },
    openGraph: {
      title: `${collectionName} - Hair Elevation Studio`,
      description: collectionDescriptions[slug] || `Browse ${collectionName} collection.`,
      url: `https://hairelevationstudios.com/collections/${slug}`,
      type: "website",
    },
  };
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const collectionName = slugToCollectionName[slug];

  if (!collectionName) {
    notFound();
  }

  const products = await getCollectionProducts(collectionName);
  const description = collectionDescriptions[slug] || "";

  // Generate breadcrumb schema
  const breadcrumbItems = [
    { name: "Home", url: "https://hairelevationstudios.com" },
    { name: "Collections", url: "https://hairelevationstudios.com/collections" },
    { name: collectionName, url: `https://hairelevationstudios.com/collections/${slug}` },
  ];

  return (
    <>
      <JsonLdScript data={generateCollectionSchema(collectionName, description)} />
      <JsonLdScript data={generateBreadcrumbSchema(breadcrumbItems)} />
      <main>
        <section className="collection-detail py-16 px-5">
          <div className="container max-w-[1200px] mx-auto">
            <h1 className="text-[2rem] font-bold text-[#3B2A23] text-center mb-4">
              {collectionName}
            </h1>
            <p className="text-center text-[#666666] mb-10 max-w-2xl mx-auto">
              {description}
            </p>
            <ProductGrid
              products={products}
              emptyMessage={`No products found in ${collectionName}.`}
            />
          </div>
        </section>
      </main>
    </>
  );
}
