"use client";

import { motion } from 'framer-motion';
import { Scissors, Sparkles, Star } from 'lucide-react';
import { GoldButton } from '@/components/shared/GoldButton';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

function ServiceCard({ icon, title, description, features }: ServiceCardProps) {
  return (
    <div className="bg-brand-warm-white rounded-2xl border-t-4 border-brand-gold p-10 shadow-xl">
      <div className="w-16 h-16 rounded-full bg-[var(--gradient-gold)] flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-heading font-bold text-brand-brown mb-4">{title}</h3>
      <p className="text-ui-text-secondary font-body mb-6 leading-relaxed">{description}</p>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm font-body text-brand-brown">
            <span className="text-brand-gold mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <GoldButton href="/book" size="lg">
        Book This Service
      </GoldButton>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="py-20 bg-brand-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-brand-gold/80 font-body uppercase tracking-wider mb-4">
            Home / Services
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-cream mb-4">
            Our Services
          </h1>
          <div className="w-16 h-0.5 bg-[var(--gradient-gold)] mx-auto mb-4" />
          <p className="text-lg text-brand-gold/80 font-body max-w-2xl mx-auto">
            Expert craftsmanship, delivered with care
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-brand-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Scissors className="w-8 h-8 text-brand-brown" />}
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
              icon={<Sparkles className="w-8 h-8 text-brand-brown" />}
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
              icon={<Star className="w-8 h-8 text-brand-brown" />}
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
      <section className="py-24 bg-brand-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-heading font-bold text-brand-cream mb-4">
              How It Works
            </h2>
            <p className="text-lg text-brand-gold/80 font-body">
              Simple steps to your dream look
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-8 lg:gap-16">
            {[
              { num: '01', title: 'Book Appointment', desc: 'Schedule your consultation online or via WhatsApp' },
              { num: '02', title: 'Consultation', desc: 'Discuss your vision and requirements in detail' },
              { num: '03', title: 'Creation/Service', desc: 'We craft or service your wig with precision' },
              { num: '04', title: 'Pick Up & Slay', desc: 'Collect your transformed look and shine' },
            ].map((step, index) => (
              <motion.div
                key={step.num}
                className="text-center lg:text-left flex-1 max-w-xs"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-5xl font-heading font-bold text-brand-gold mb-2">
                  {step.num}
                </div>
                <h3 className="text-xl font-heading text-brand-cream mb-2">{step.title}</h3>
                <p className="text-sm text-brand-cream/70 font-body">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-[var(--gradient-gold)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-brand-brown mb-4">
            Ready to Elevate Your Look?
          </h2>
          <p className="text-ui-text-secondary font-body mb-6">
            Book your appointment today and experience the transformation
          </p>
          <GoldButton href="/book" size="lg">
            Book Appointment
          </GoldButton>
        </div>
      </section>
    </>
  );
}