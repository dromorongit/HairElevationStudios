/**
 * Collections Page
 * Luxury collection presentation with refined spacing
 */

import { Metadata } from "next";
import { CollectionsGrid } from "@/components/shared/CollectionCard";

export const metadata: Metadata = {
  title: "Collections - Hair Elevation Studio",
  description:
    "Browse our collection of premium glueless wigs and custom wig options at Hair Elevation Studio.",
};

export default function CollectionsPage() {
  return (
    <main>
      <section className="collections py-24 px-8 bg-gradient-to-b from-white to-[#F5EFE6]">
        <div className="container max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#3B2A23] mb-6 tracking-tight">
              Our Wig Collections
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#C8A97E] to-transparent mx-auto mb-6"></div>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed">
              Discover our premium wig collections, each designed to meet different
              styling needs and occasions. Click on any collection to explore our
              range.
            </p>
          </div>
          <CollectionsGrid />
        </div>
      </section>
    </main>
  );
}