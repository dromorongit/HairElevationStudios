/**
 * About Page
 * Replicates about.html
 */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Hair Elevation Studio",
  description:
    "Learn about Hair Elevation Studio, a premium wig brand specializing in high quality glueless wigs and luxury wig experiences.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="about py-16 px-5">
        <div className="container max-w-[1200px] mx-auto">
          <h1 className="text-[2rem] font-bold text-[#3B2A23] mb-6">
            About Hair Elevation Studio
          </h1>
          <div className="space-y-4 text-[#666666] leading-relaxed">
            <p>
              Hair Elevation is a premium wig brand specializing in high quality
              glueless wigs, custom coloring, styling, and luxury wig experiences
              for modern women. We are dedicated to providing top-tier products
              and services that empower our clients to feel confident and
              beautiful in their own skin.
            </p>
            <p>
              Our mission is to elevate the wig-wearing experience through
              innovation, quality, and personalized care. Whether you're
              looking for ready-to-wear glueless wigs or bespoke custom
              creations, Hair Elevation Studio is your go-to destination for all
              things luxurious and feminine.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
