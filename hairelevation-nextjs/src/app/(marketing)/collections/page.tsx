/**
 * Collections Page
 * Replicates collections.html
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
      <section className="collections py-16 px-5">
        <div className="container max-w-[1200px] mx-auto">
          <h1 className="text-[2rem] font-bold text-[#3B2A23] text-center mb-4">
            Our Wig Collections
          </h1>
          <p className="text-center text-[#666666] mb-10 max-w-2xl mx-auto">
            Discover our premium wig collections, each designed to meet different
            styling needs and occasions. Click on any collection to explore our
            range.
          </p>
          <CollectionsGrid />
        </div>
      </section>
    </main>
  );
}
