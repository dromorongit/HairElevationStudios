/**
 * ServiceCard Component
 * Displays a service with name and description
 * Luxury presentation with refined spacing
 */

import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/brand";

interface ServiceCardProps {
  name: string;
  description: string;
}

export function ServiceCard({ name, description }: ServiceCardProps) {
  return (
    <div className="service-card bg-white rounded-xl shadow-[var(--shadow-card)] p-10 transition-all duration-500 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-2 flex flex-col h-full">
      <h3 className="text-xl font-bold text-[#3B2A23] mb-4 tracking-tight">{name}</h3>
      <p className="text-[#666666] text-sm mb-8 leading-relaxed flex-grow">{description}</p>
      <Button asLink href={ROUTES.book} size="sm" className="mt-auto">
        Book Now
      </Button>
    </div>
  );
}

interface Service {
  name: string;
  description: string;
}

interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </div>
  );
}