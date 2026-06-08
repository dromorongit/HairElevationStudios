/**
 * CollectionCard Component
 * Displays a collection with premium image and content
 * Luxury presentation with refined interactions
 */

import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/brand";

interface CollectionCardProps {
  name: string;
  description: string;
  imageSrc: string;
  slug: string;
}

export function CollectionCard({
  name,
  description,
  imageSrc,
  slug,
}: CollectionCardProps) {
  return (
    <Link
      href={ROUTES.collectionDetail(slug)}
      className="collection-card block bg-white rounded-xl shadow-[var(--shadow-card)] overflow-hidden transition-all duration-500 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-2 cursor-pointer"
    >
      <div className="collection-image relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      <div className="collection-content p-8">
        <h2 className="text-xl font-bold text-[#3B2A23] mb-3 tracking-tight">{name}</h2>
        <p className="text-[#666666] text-sm leading-relaxed">{description}</p>
        <div className="mt-5 inline-flex items-center text-[#C8A97E] font-medium text-sm uppercase tracking-wider hover:text-[#A67C52] transition-colors">
          View Collection
          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
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
    <div className="collections-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {collections.map((collection) => (
        <CollectionCard key={collection.slug} {...collection} />
      ))}
    </div>
  );
}