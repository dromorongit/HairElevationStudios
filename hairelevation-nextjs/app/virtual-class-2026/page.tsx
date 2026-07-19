"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsPlayCircle, BsCameraVideo, BsCalendar, BsLightbulb, BsChatDots, BsClock, BsCalendarCheck, BsPeople, BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { GoldButton } from '@/components/shared/GoldButton';
import { CoursePaymentModal } from '@/components/course/CoursePaymentModal';
import { CourseProofModal } from '@/components/course/CourseProofModal';
import { TelegramRevealModal } from '@/components/course/TelegramRevealModal';
import { uploadPaymentProof } from '@/lib/api';

interface Module {
  number: string;
  title: string;
  items: string[];
}

const modules: Module[] = [
  {
    number: '01',
    title: 'Introduction',
    items: [
      'Tools, equipment and products',
      'Hair types suitable for pixie cuts',
      'Understanding head shape and face shape',
      'Understanding different pixie styles',
    ],
  },
  {
    number: '02',
    title: 'Preparing the Wig',
    items: [
      'Wig construction guidelines',
      'Hair placement according to the desired pixie style',
      'Identifying the ear position on the canvas & taking accurate measurements',
      'Proper sectioning',
    ],
  },
  {
    number: '03',
    title: 'Pixie Cutting Techniques',
    items: [
      'Understanding guide lengths',
      'Basic pixie cut',
      'Graduation',
      'Tapering',
      'Balancing both sides',
    ],
  },
  {
    number: '04',
    title: 'Razor & Texturizing',
    items: [
      'When to use scissors',
      'When to use a razor comb',
      'Razor techniques',
      'Removing bulk — layers',
      'Making the cut look natural',
    ],
  },
  {
    number: '05',
    title: 'Styling',
    items: [
      'Molding',
      'Curling techniques',
      'Product selection',
      'Finishing touches',
      'Packaging and client presentation',
    ],
  },
  {
    number: '06',
    title: 'Common Mistakes & Corrections',
    items: [
      'Over-cutting',
      'Flat crown',
      'Bulky nape',
    ],
  },
];

export default function VirtualClassPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [showTelegram, setShowTelegram] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const handlePaymentConfirmed = () => {
    setShowPaymentModal(false);
    setShowProofModal(true);
  };

  const handleProofSubmit = async (file: File, name: string, phone: string) => {
    setStudentName(name);
    setShowProofModal(false);
    setShowTelegram(true);
  };

  const handleModuleToggle = (moduleNumber: string) => {
    setExpandedModule(expandedModule === moduleNumber ? null : moduleNumber);
  };

  return (
    <>
      {/* Section 1: Hero */}
      <section className="min-h-[80vh] bg-gradient-to-br from-[#3B2A23] to-[#2A1E18] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_90%_10%,rgba(200,169,126,0.1)_0%,transparent_60%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-16 lg:py-0">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[11px] font-body uppercase tracking-[0.3em] text-[#C8A97E] mb-4">
              HAIR ELEVATION STUDIO PRESENTS
            </p>
            <h1 className="text-5xl lg:text-7xl font-heading font-black text-[#F5EFE6] mb-6 leading-[0.95] break-words">
              Pixie Cut
              <span className="block italic text-[#C8A97E]">Virtual Class</span>
            </h1>
            <span className="inline-block px-4 py-1 rounded-full border border-[#C8A97E] text-[#C8A97E] uppercase tracking-widest text-sm font-body">
              2026
            </span>
            <p className="text-base font-body text-[rgba(245,239,230,0.6)] max-w-lg mx-auto mt-6 leading-relaxed break-words">
              Master the art of pixie cuts from the comfort of your home. A comprehensive virtual class designed to boost your confidence and elevate your craft.
            </p>
            <blockquote className="text-xl lg:text-2xl font-heading italic text-[#C8A97E] mt-8">
              &ldquo;Boost your confidence in pixie cut and charge your worth&rdquo;
            </blockquote>
            <div className="mt-8">
              <p className="text-xs uppercase tracking-widest text-[rgba(245,239,230,0.6)] font-body mb-1">
                Course Fee
              </p>
              <p className="text-4xl font-heading font-bold text-[#C8A97E]">
                GHS 1,200
              </p>
            </div>
            <GoldButton size="lg" className="mt-6" onClick={() => setShowPaymentModal(true)}>
              Enroll Now — GHS 1,200
            </GoldButton>
            <p className="text-[13px] text-[rgba(245,239,230,0.6)] font-body mt-4">
              One-time payment • 1 Month Access • Telegram Group
            </p>
            <div className="flex items-center justify-center gap-4 mt-8 text-sm font-body text-[#F5EFE6]">
              <div className="flex items-center gap-2">
                <BsPlayCircle className="w-4 h-4 text-[#C8A97E]" />
                <span>6 Modules</span>
              </div>
              <span className="w-1.5 h-1.5 bg-[#C8A97E] rounded-full" />
              <div className="flex items-center gap-2">
                <BsCameraVideo className="w-4 h-4 text-[#C8A97E]" />
                <span>Step-by-Step Videos</span>
              </div>
              <span className="w-1.5 h-1.5 bg-[#C8A97E] rounded-full" />
              <div className="flex items-center gap-2">
                <BsCalendar className="w-4 h-4 text-[#C8A97E]" />
                <span>1 Month Access</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 opacity-5 pointer-events-none">
          <span className="text-[100px] sm:text-[160px] font-heading text-[#F5EFE6]">
            2026
          </span>
        </div>
      </section>

      {/* Section 2: What You Get */}
      <section className="py-20 bg-[#2A1E18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[11px] font-body uppercase tracking-[0.15em] text-[#C8A97E] mb-3">
              COURSE INCLUDES
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#F5EFE6] mb-4">
              What You Get
            </h2>
            <div className="h-0.5 bg-[var(--gradient-gold)] w-10 mx-auto mb-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-[#3B2A23] border border-[rgba(200,169,126,0.2)] rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(200,169,126,0.4)] hover:shadow-[0_0_20px_rgba(200,169,126,0.2)]">
              <div className="w-11 h-11 bg-[#C8A97E] rounded-full flex items-center justify-center mb-4">
                <BsPlayCircle className="w-5 h-5 text-[#3B2A23]" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-[#F5EFE6] mb-2 break-words">
                Step-by-Step Video Lessons
              </h3>
              <p className="text-sm font-body text-[rgba(245,239,230,0.6)] break-words">
                Detailed video tutorials walking you through every technique from start to finish
              </p>
            </div>

            <div className="bg-[#3B2A23] border border-[rgba(200,169,126,0.2)] rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(200,169,126,0.4)] hover:shadow-[0_0_20px_rgba(200,169,126,0.2)]">
              <div className="w-11 h-11 bg-[#C8A97E] rounded-full flex items-center justify-center mb-4">
                <BsLightbulb className="w-5 h-5 text-[#3B2A23]" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-[#F5EFE6] mb-2 break-words">
                Expert Tips & Tricks
              </h3>
              <p className="text-sm font-body text-[rgba(245,239,230,0.6)] break-words">
                Insider knowledge from a professional stylist to help you avoid common mistakes
              </p>
            </div>

            <div className="bg-[#3B2A23] border border-[rgba(200,169,126,0.2)] rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(200,169,126,0.4)] hover:shadow-[0_0_20px_rgba(200,169,126,0.2)]">
              <div className="w-11 h-11 bg-[#C8A97E] rounded-full flex items-center justify-center mb-4">
                <BsChatDots className="w-5 h-5 text-[#3B2A23]" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-[#F5EFE6] mb-2 break-words">
                Q&A & Feedback
              </h3>
              <p className="text-sm font-body text-[rgba(245,239,230,0.6)] break-words">
                Get your questions answered and receive personal feedback on your work
              </p>
            </div>

            <div className="bg-[#3B2A23] border border-[rgba(200,169,126,0.2)] rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(200,169,126,0.4)] hover:shadow-[0_0_20px_rgba(200,169,126,0.2)]">
              <div className="w-11 h-11 bg-[#C8A97E] rounded-full flex items-center justify-center mb-4">
                <BsClock className="w-5 h-5 text-[#3B2A23]" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-[#F5EFE6] mb-2 break-words">
                Learn at Your Own Pace
              </h3>
              <p className="text-sm font-body text-[rgba(245,239,230,0.6)] break-words">
                Access all materials on your schedule — no fixed class times
              </p>
            </div>

            <div className="bg-[#3B2A23] border border-[rgba(200,169,126,0.2)] rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(200,169,126,0.4)] hover:shadow-[0_0_20px_rgba(200,169,126,0.2)]">
              <div className="w-11 h-11 bg-[#C8A97E] rounded-full flex items-center justify-center mb-4">
                <BsCalendarCheck className="w-5 h-5 text-[#3B2A23]" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-[#F5EFE6] mb-2 break-words">
                1 Month Access & Coaching
              </h3>
              <p className="text-sm font-body text-[rgba(245,239,230,0.6)] break-words">
                Full month of access to all course materials plus ongoing coaching support
              </p>
            </div>

            <div className="bg-[#3B2A23] border border-[rgba(200,169,126,0.2)] rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(200,169,126,0.4)] hover:shadow-[0_0_20px_rgba(200,169,126,0.2)]">
              <div className="w-11 h-11 bg-[#C8A97E] rounded-full flex items-center justify-center mb-4">
                <BsPeople className="w-5 h-5 text-[#3B2A23]" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-[#F5EFE6] mb-2 break-words">
                Private Telegram Group
              </h3>
              <p className="text-sm font-body text-[rgba(245,239,230,0.6)] break-words">
                Join an exclusive community of students for support, sharing and networking
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Gallery */}
      <section className="py-20 bg-[#3B2A23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[11px] font-body uppercase tracking-[0.15em] text-[#C8A97E] mb-3">
              THE CRAFT
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#F5EFE6] mb-4">
              Pixie Cuts by Hair Elevation Studio
            </h2>
            <p className="text-lg text-[var(--text-muted)] font-body max-w-xl mx-auto">
              The styles you will learn to create
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              '/assets/images/pixie1.jpg',
              '/assets/images/pixie2.jpg',
              '/assets/images/pixie3.jpg',
              '/assets/images/pixie4.jpg',
            ].map((src, index) => (
              <motion.div
                key={src}
                className="group relative overflow-hidden rounded-xl border border-[rgba(200,169,126,0.2)] hover:border-[rgba(200,169,126,0.5)] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="aspect-[3/4]">
                  <img
                    src={src}
                    alt={`Pixie cut style ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(59,42,35,0.5)] to-transparent pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Modules */}
      <section className="py-20 bg-[#3B2A23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[11px] font-body uppercase tracking-[0.15em] text-[#C8A97E] mb-3">
              CURRICULUM
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#F5EFE6] mb-4">
              Course Modules
            </h2>
            <div className="h-0.5 bg-[var(--gradient-gold)] w-10 mb-4" />
            <p className="text-lg text-[var(--text-muted)] font-body max-w-xl">
              Everything you need to master the pixie cut
            </p>
          </div>

          <div className="hidden md:grid grid-cols-2 gap-6">
            <div className="space-y-6">
              {modules.slice(0, 3).map((module) => (
                <div key={module.number} className="bg-[#2A1E18] border-l-3 border-l-[#C8A97E] rounded-xl p-6">
                  <span className="float-right text-3xl font-heading font-bold text-[#C8A97E] opacity-40">
                    {module.number}
                  </span>
                  <h3 className="text-lg font-heading font-semibold text-[#F5EFE6] mb-3">
                    {module.title}
                  </h3>
                  <ul className="space-y-1">
                    {module.items.map((item, index) => (
                      <li key={index} className="text-sm font-body text-[rgba(245,239,230,0.6)]">
                        <span className="text-[#C8A97E]">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {modules.slice(3, 6).map((module) => (
                <div key={module.number} className="bg-[#2A1E18] border-l-3 border-l-[#C8A97E] rounded-xl p-6">
                  <span className="float-right text-3xl font-heading font-bold text-[#C8A97E] opacity-40">
                    {module.number}
                  </span>
                  <h3 className="text-lg font-heading font-semibold text-[#F5EFE6] mb-3">
                    {module.title}
                  </h3>
                  <ul className="space-y-1">
                    {module.items.map((item, index) => (
                      <li key={index} className="text-sm font-body text-[rgba(245,239,230,0.6)]">
                        <span className="text-[#C8A97E]">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="md:hidden space-y-4">
            {modules.map((module) => (
              <div key={module.number} className="bg-[#2A1E18] rounded-xl overflow-hidden">
                <button
                  onClick={() => handleModuleToggle(module.number)}
                  className="w-full p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-heading font-bold text-[#C8A97E] opacity-40">
                      {module.number}
                    </span>
                    <h3 className="text-lg font-heading font-semibold text-[#F5EFE6]">
                      {module.title}
                    </h3>
                  </div>
                  {expandedModule === module.number ? (
                    <BsChevronUp className="w-5 h-5 text-[#C8A97E]" />
                  ) : (
                    <BsChevronDown className="w-5 h-5 text-[#C8A97E]" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedModule === module.number && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4"
                    >
                      <ul className="space-y-1 pt-2">
                        {module.items.map((item, index) => (
                          <li key={index} className="text-sm font-body text-[rgba(245,239,230,0.6)]">
                            <span className="text-[#C8A97E]">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Instructor */}
      <section className="py-20 bg-[#2A1E18]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] font-body uppercase tracking-[0.15em] text-[#C8A97E] mb-3">
              YOUR INSTRUCTOR
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#F5EFE6] mb-4">
              Learn From the Best
            </h2>
            <div className="h-0.5 bg-[var(--gradient-gold)] w-10 mx-auto mb-4" />
          </div>

          <div className="bg-[#3B2A23] border border-[var(--border-gold)] rounded-2xl p-10 text-center">
            <img
              src="/assets/images/madampadi.jpg"
              alt="Instructor"
              className="w-32 h-32 rounded-full border-2 border-[#C8A97E] mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-heading font-bold text-[#F5EFE6] mb-2">
              Hair Elevation Studio
            </h3>
            <p className="text-sm font-body uppercase tracking-widest text-[#C8A97E] mb-4">
              Professional Wig Stylist & Educator
            </p>
            <p className="text-base font-body text-[rgba(245,239,230,0.6)] leading-relaxed mb-4">
              With years of experience crafting premium wigs and teaching aspiring stylists, Hair Elevation Studio brings professional expertise directly to your screen. This course is designed to give you the exact skills and confidence you need to create stunning pixie cuts.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-1 rounded-full border border-[#C8A97E] text-sm font-body text-[#F5EFE6]">
                200+ Students Trained
              </span>
              <span className="px-4 py-1 rounded-full border border-[#C8A97E] text-sm font-body text-[#F5EFE6]">
                Accra-Based Studio
              </span>
              <span className="px-4 py-1 rounded-full border border-[#C8A97E] text-sm font-body text-[#F5EFE6]">
                Premium Wig Expert
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="py-20 bg-gradient-to-br from-[#C8A97E] to-[#A67C52] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 rounded-full border-2 border-[rgba(59,42,35,0.1)] opacity-20" />
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 rounded-full border-2 border-[rgba(59,42,35,0.1)] opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#3B2A23] mb-4">
            Ready to Master the Pixie Cut?
          </h2>
          <p className="text-base font-body text-[#3B2A23] opacity-70 mb-6 max-w-xl mx-auto">
            Join the virtual class and transform your skills. Limited spots available.
          </p>
          <p className="text-2xl font-heading font-bold text-[#3B2A23] mb-6">
            GHS 1,200 — One-time Payment
          </p>
          <GoldButton size="lg" className="bg-[#3B2A23] text-[#F5EFE6]" onClick={() => setShowPaymentModal(true)}>
            Enroll Now
          </GoldButton>
          <p className="text-[13px] text-[#3B2A23] opacity-70 mt-4">
            ✓ Instant access after payment  ✓ 1 month coaching  ✓ Private Telegram group
          </p>
        </div>
      </section>

      <CoursePaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentConfirmed={handlePaymentConfirmed}
      />

      <CourseProofModal
        isOpen={showProofModal}
        onClose={() => setShowProofModal(false)}
        onSubmit={handleProofSubmit}
        onUpload={uploadPaymentProof}
      />

      <TelegramRevealModal
        isOpen={showTelegram}
        studentName={studentName}
      />
    </>
  );
}