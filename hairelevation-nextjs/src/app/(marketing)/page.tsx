/**
 * Homepage
 * Replicates index.html exactly with Next.js components
 */

import { Hero } from "@/sections/Hero";
import { CollectionsPreview } from "@/sections/CollectionsPreview";
import { FeaturedProducts } from "@/sections/FeaturedProducts";
import { ServicesPreview } from "@/sections/ServicesPreview";
import { WhatsAppChannelBanner } from "@/sections/WhatsAppChannelBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CollectionsPreview />
      <FeaturedProducts />
      <ServicesPreview />
      <WhatsAppChannelBanner />
    </>
  );
}
