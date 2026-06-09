"use client";

import { motion } from 'framer-motion';
import { GoldButton } from '@/components/shared/GoldButton';
import { BsScissors, BsStar } from 'react-icons/bs';
import { BiSparkles } from 'react-icons/bi';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

function ServiceCard({ icon, title, description, features }: ServiceCardProps) {
  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl border-l-4 border-[var(--gradient-gold)] p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
      <div className="w-12 h-12 rounded-full bg-[var(--gradient-gold)] flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-heading font-bold text-[var(--text-primary)] mb-3">{title}</h3>
      <p className="text-sm font-body text-[var(--text-muted)] mb-6 leading-relaxed">{description}</p>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm font-body text-[var(--text-primary)]">
            <span className="text-[var(--brand-gold)] mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <GoldButton href="/book" size="sm">
        Book Now
      </GoldButton>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="py-16 md:py-20 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-body uppercase tracking-wider text-[var(--brand-gold)] mb-4">
            Home / Services
          </p>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-[var(--text-primary)] mb-4">
            Our Services
          </h1>
          <div className="w-16 h-0.5 bg-[var(--gradient-gold)] mx-auto mb-4" />
          <p className="text-lg font-body text-[var(--text-muted)] max-w-2xl mx-auto">
            Expert craftsmanship, delivered with care
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <ServiceCard
              icon={<BsScissors className="w-6 h-6 text-[var(--bg-primary)]" />}
              title="Custom Wig Making"
              description="Bespoke wigs crafted to your exact measurements, preferences, and style vision. Every strand placed with intention."
              features={[
                '100% Human Hair Options',
                'Custom Measurements',
                'Style Consultation Included',
                '2-3 Week Turnaround',
              ]}
            />
            <ServiceCard
              icon={<BiSparkles className="w-6 h-6 text-[var(--bg-primary)]" />}
              title="Wig Revamp & Maintenance"
              description="Restore and refresh your wigs to their original glory. From deep conditioning to full restyling."
              features={[
                'Deep Conditioning',
                'Colour Treatment',
                'Restyling & Reshape',
                'Same-Day Service Available',
              ]}
            />
            <ServiceCard
              icon={<BsStar className="w-6 h-6 text-[var(--bg-primary)]" />}
              title="Wig Installation & Sew-in"
              description="Professional installation for a flawless, natural look that lasts. Frontal, closure and full sew-in available."
              features={[
                'HD Lace Melting',
                'Frontal & Closure Install',
                'Bleached Knots',
                'Styling Included',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl lg:text-3xl font-heading font-bold text-[var(--text-primary)] mb-4">
              How It Works
            </h2>
            <p className="text-base lg:text-lg font-body text-[var(--brand-gold)]/80">
              Simple steps to your dream look
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:flex md:flex-row md:items-center md:justify-center gap-6 md:gap-16">
            {[
              { num: '01', title: 'Book Appointment', desc: 'Schedule your consultation online or via WhatsApp' },
              { num: '02', title: 'Consultation', desc: 'Discuss your vision and requirements in detail' },
              { num: '03', title: 'Creation/Service', desc: 'We craft or service your wig with precision' },
              { num: '04', title: 'Pick Up & Slay', desc: 'Collect your transformed look and shine' },
            ].map((step, index) => (
              <motion.div
                key={step.num}
                className="text-center md:text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-heading font-bold text-[var(--brand-gold)] mb-2">
                  {step.num}
                </div>
                <h3 className="text-base md:text-lg font-heading text-[var(--text-primary)] mb-1">{step.title}</h3>
                <p className="text-xs md:text-sm font-body text-[var(--text-muted)]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-[var(--gradient-gold)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-heading font-bold text-[var(--bg-primary)] mb-4">
            Ready to Elevate Your Look?
          </h2>
          <p className="text-base font-body text-[var(--bg-primary)]/80 mb-6">
            Book your appointment today and experience the transformation
          </p>
          <GoldButton href="/book" size="lg" className="bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]">
            Book Appointment
          </GoldButton>
        </div>
      </section>
    </>
  );
}