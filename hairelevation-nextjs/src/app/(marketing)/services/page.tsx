/**
 * Services Page
 * Replicates services.html
 */

import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/brand";

const services = [
  {
    name: "Custom Wig Making",
    description:
      "Tailored wigs designed to your exact specifications, including color, length, and style. Perfect for a unique look that matches your personality.",
    cta: "Book Consultation",
  },
  {
    name: "Wig Revamp & Maintenance",
    description:
      "Restore your wig's original beauty with our professional cleaning, styling, and repair services. Keep your wig looking fresh and luxurious.",
    cta: "Book Service",
  },
  {
    name: "Wig Installation & Sew-in",
    description:
      "Expert installation services for a seamless, natural look. Available by appointment only for personalized attention.",
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
      <section className="services py-16 px-5">
        <div className="container max-w-[1200px] mx-auto">
          <h1 className="text-[2rem] font-bold text-[#3B2A23] text-center mb-10">
            Our Services
          </h1>
          <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card bg-white rounded-[10px] shadow-[0_8px_20px_rgba(99,42,35,0.1)] p-6 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(99,42,35,0.15)] hover:-translate-y-1"
              >
                <h3 className="text-[1.3rem] font-bold text-[#3B2A23] mb-3">
                  {service.name}
                </h3>
                <p className="text-[#666666] text-sm mb-4">
                  {service.description}
                </p>
                <Button asLink href={ROUTES.book} size="sm">
                  {service.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price List Section */}
      <section className="price-list-section py-16 px-5 bg-[#f8f9fa] text-center">
        <div className="container max-w-[800px] mx-auto">
          <h2 className="text-[2.5rem] font-bold text-[#3B2A23] mb-8">
            Our Service Prices
          </h2>
          <div className="relative rounded-[12px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
            <Image
              src="/pricelist.jpg"
              alt="Hair Elevation Studio Price List"
              width={800}
              height={1000}
              className="w-full h-auto transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
          <p className="price-list-note mt-6 text-[#666666] italic">
            *Prices may vary based on complexity and specific requirements.
            Contact us for a personalized quote.
          </p>
        </div>
      </section>
    </main>
  );
}
