/**
 * Services Page
 * Luxury service presentation with refined cards
 */

import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/brand";

const services = [
  {
    name: "Custom Wig Making",
    description:
      "Tailored wigs designed to your exact specifications, including color, length, and style. Perfect for a unique look that matches your personality and provides a perfect fit.",
    cta: "Book Consultation",
  },
  {
    name: "Wig Revamp & Maintenance",
    description:
      "Restore your wig's original beauty with our professional cleaning, styling, and repair services. Keep your wig looking fresh and luxurious with regular maintenance.",
    cta: "Book Service",
  },
  {
    name: "Wig Installation & Sew-in",
    description:
      "Expert installation services for a seamless, natural look. Available by appointment only for personalized attention and professional care.",
    cta: "Book Appointment",
  },
];

export const metadata: Metadata = {
  title: "Services - Hair Elevation Studio",
  description:
    "Explore our premium wig services including custom wig making, revamp, maintenance, and installation at Hair Elevation Studio.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className="services py-24 px-8 bg-gradient-to-b from-white to-[#F5EFE6]">
        <div className="container max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#3B2A23] mb-6 tracking-tight">
              Our Services
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#C8A97E] to-transparent mx-auto mb-12"></div>
          </div>

          <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {services.map((service) => (
              <div
                key={service.name}
                className="service-card bg-white rounded-xl shadow-[var(--shadow-card)] p-10 transition-all duration-500 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-2 flex flex-col h-full"
              >
                <h3 className="text-xl font-bold text-[#3B2A23] mb-4 tracking-tight">{service.name}</h3>
                <p className="text-[#666666] text-sm mb-8 leading-relaxed flex-grow">{service.description}</p>
                <Button asLink href={ROUTES.book} size="sm" className="mt-auto">
                  {service.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price List Section */}
      <section className="price-list-section py-20 px-8 bg-white">
        <div className="container max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#3B2A23] mb-6 tracking-tight">
              Our Service Prices
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#C8A97E] to-transparent mx-auto"></div>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-[var(--shadow-lg)]">
            <Image
              src="/pricelist.jpg"
              alt="Hair Elevation Studio Price List"
              width={900}
              height={1200}
              className="w-full h-auto transition-transform duration-700 hover:scale-105"
            />
          </div>

          <p className="price-list-note mt-10 text-center text-[#666666] italic">
            *Prices may vary based on complexity and specific requirements. Contact us for a personalized quote.
          </p>
        </div>
      </section>
    </main>
  );
}