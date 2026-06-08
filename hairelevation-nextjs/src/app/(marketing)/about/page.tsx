/**
 * About Page
 * Editorial storytelling layout for luxury brand experience
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
      <section className="about py-24 px-8 bg-gradient-to-b from-white to-[#F5EFE6]">
        <div className="container max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#3B2A23] mb-6 tracking-tight">
              About Hair Elevation Studio
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#C8A97E] to-transparent mx-auto mb-12"></div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-xl shadow-[var(--shadow-card)] p-12 mb-12">
              <p className="text-lg text-[#666666] leading-relaxed mb-6">
                Hair Elevation is a premium wig brand specializing in high quality
                glueless wigs, custom coloring, styling, and luxury wig experiences
                for modern women. We are dedicated to providing top-tier products
                and services that empower our clients to feel confident and
                beautiful in their own skin.
              </p>
              <p className="text-lg text-[#666666] leading-relaxed">
                Our mission is to elevate the wig-wearing experience through
                innovation, quality, and personalized care. Whether you&apos;re
                looking for ready-to-wear glueless wigs or bespoke custom
                creations, Hair Elevation Studio is your go-to destination for all
                things luxurious and feminine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl shadow-[var(--shadow-card)] p-8">
                <h3 className="text-xl font-bold text-[#3B2A23] mb-4">Our Vision</h3>
                <p className="text-[#666666] leading-relaxed">
                  To redefine beauty standards and provide every woman with access to
                  premium, luxury wig solutions that enhance confidence and style.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-[var(--shadow-card)] p-8">
                <h3 className="text-xl font-bold text-[#3B2A23] mb-4">Our Values</h3>
                <p className="text-[#666666] leading-relaxed">
                  Quality craftsmanship, personalized service, and empowering women
                  to express their unique beauty through our premium offerings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}