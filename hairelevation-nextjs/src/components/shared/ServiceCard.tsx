/**
 * ServiceCard Component
 * Displays a service with name and description
 */

import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/brand";

interface ServiceCardProps {
  name: string;
  description: string;
}

export function ServiceCard({ name, description }: ServiceCardProps) {
  return (
    <div className="service-card bg-white rounded-[10px] shadow-[0_8px_20px_rgba(99,42,35,0.1)] p-6 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(99,42,35,0.15)] hover:-translate-y-1">
      <h3 className="text-[1.3rem] font-bold text-[#3B2A23] mb-3">{name}</h3>
      <p className="text-[#666666] text-sm mb-4">{description}</p>
      <Button asLink href={ROUTES.book} size="sm">
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
    <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </div>
  );
}
