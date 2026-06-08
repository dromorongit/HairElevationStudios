/**
 * CollectionCard Component
 * Displays a collection with image and content
 */

import Image from "next/image";
import Link from "next/link";
import { ROUTES, COLLECTIONS } from "@/constants/brand";

interface CollectionCardProps {
  name: string;
  description: string;
  imageSrc: string;
  slug: string;
}

// Map collection names to their HTML file slugs
const collectionSlugMap: Record<string, string> = {
  "The Bridal Crowns": "bridal-crowns",
  "The Everyday Crown": "everyday-crown",
  "The Queen's Curls": "queens-curls",
  "The Signature Pixies": "signature-pixies",
};

export function CollectionCard({
  name,
  description,
  imageSrc,
  slug,
}: CollectionCardProps) {
  return (
    <Link
      href={ROUTES.collectionDetail(slug)}
      className="collection-card block bg-white rounded-[10px] shadow-[0_8px_20px_rgba(99,42,35,0.1)] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_30px_rgba(99,42,35,0.15)] hover:-translate-y-1 cursor-pointer"
    >
      <div className="collection-image relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="collection-content p-5">
        <h2 className="text-[1.3rem] font-bold text-[#3B2A23] mb-2">{name}</h2>
        <p className="text-[#666666] text-sm">{description}</p>
      </div>
    </Link>
  );
}

// Pre-configured collection cards for the homepage
const collectionData = [
  {
    name: "The Bridal Crowns",
    description: "Elegant and sophisticated wigs perfect for weddings and special occasions.",
    imageSrc: "/bridalcrowns.jpg",
    slug: "bridal-crowns",
  },
  {
    name: "The Everyday Crown",
    description: "Comfortable, versatile wigs for daily wear and casual occasions.",
    imageSrc: "/everydaycrown.jpg",
    slug: "everyday-crown",
  },
  {
    name: "The Queen's Curls",
    description: "Luxurious curly wigs that add volume and bounce to your look.",
    imageSrc: "/queenscurls.jpg",
    slug: "queens-curls",
  },
  {
    name: "The Signature Pixies",
    description: "Playful and trendy pixie cuts for a bold, modern statement.",
    imageSrc: "/signaturepixies.jpg",
    slug: "signature-pixies",
  },
];

interface CollectionsGridProps {
  collections?: typeof collectionData;
}

export function CollectionsGrid({ collections = collectionData }: CollectionsGridProps) {
  return (
    <div className="collections-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {collections.map((collection) => (
        <CollectionCard key={collection.slug} {...collection} />
      ))}
    </div>
  );
}
