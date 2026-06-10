"use client";

import { useState } from 'react';
import { GoldButton } from '@/components/shared/GoldButton';
import { BsInstagram, BsTiktok, BsWhatsapp, BsCursor } from 'react-icons/bs';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const message = `💬 CONTACT MESSAGE

From: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Subject: ${formData.subject}

Message:
${formData.message}`;

      const whatsappUrl = `https://wa.me/233534057109?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setIsSubmitted(true);
    }
  };

  const handleChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="py-12 md:py-16 bg-[var(--bg-primary)] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center overflow-x-hidden">
          <p className="text-xs font-body uppercase tracking-wider text-[var(--brand-gold)] mb-3 truncate">
            Home / Contact
          </p>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-[var(--text-primary)] mb-3 break-words">
            Contact Us
          </h1>
          <div className="w-16 h-0.5 bg-[var(--gradient-gold)] mx-auto mb-3" />
          <p className="text-base font-body text-[var(--text-muted)] max-w-2xl mx-auto break-words">
            We would love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-8 md:py-10 bg-[var(--bg-secondary)] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 md:gap-8">
            {/* Form - full width on mobile */}
            <div className="w-full lg:col-span-3">
              <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-gold)] p-4 md:p-6 lg:p-8">
                <h2 className="text-xl md:text-2xl font-heading font-bold text-[var(--text-primary)] mb-4 md:mb-6 break-words">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1 font-body">
                      Full Name <span className="text-[var(--brand-gold)]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={handleChange('name')}
                      className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg-primary)] text-[var(--text-primary)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition-colors ${
                        errors.name ? 'border-red-500' : 'border-[var(--border-gold)]'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400 mt-1 font-body">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1 font-body">
                      Email <span className="text-[var(--brand-gold)]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={handleChange('email')}
                      className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg-primary)] text-[var(--text-primary)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition-colors ${
                        errors.email ? 'border-red-500' : 'border-[var(--border-gold)]'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 mt-1 font-body">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1 font-body">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange('phone')}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border-gold)] bg-[var(--bg-primary)] text-[var(--text-primary)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition-colors"
                      placeholder="024XXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1 font-body">
                      Subject <span className="text-[var(--brand-gold)]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={handleChange('subject')}
                      className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg-primary)] text-[var(--text-primary)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition-colors ${
                        errors.subject ? 'border-red-500' : 'border-[var(--border-gold)]'
                      }`}
                      placeholder="How can we help?"
                    />
                    {errors.subject && (
                      <p className="text-xs text-red-400 mt-1 font-body">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1 font-body">
                      Message <span className="text-[var(--brand-gold)]">*</span>
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={handleChange('message')}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg-primary)] text-[var(--text-primary)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition-colors resize-none ${
                        errors.message ? 'border-red-500' : 'border-[var(--border-gold)]'
                      }`}
                      placeholder="Your message..."
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400 mt-1 font-body">{errors.message}</p>
                    )}
                  </div>

                  {isSubmitted && (
                    <div className="bg-[var(--brand-gold)] text-[var(--bg-primary)] px-4 py-3 rounded-xl">
                      <p className="text-sm font-body font-medium break-words">
                        ✅ Your message has been sent! We will respond shortly via WhatsApp or email.
                      </p>
                    </div>
                  )}

                  <GoldButton type="submit" size="lg" className="w-full">
                    <BsCursor className="w-4 h-4 mr-2" />
                    Send Message
                  </GoldButton>
                </form>
              </div>
            </div>

            {/* Info Cards - full width on mobile */}
            <div className="w-full lg:col-span-2 space-y-4 md:space-y-6">
              <div className="bg-[var(--bg-primary)] rounded-xl p-4 md:p-6 border border-[var(--border-gold)]">
                <p className="text-sm font-body text-[var(--text-muted)] mb-1">📍 Visit Us</p>
                <p className="text-base font-body text-[var(--text-primary)] mb-2 break-words">Kanda, Accra, Ghana</p>
                <a
                  href="https://maps.google.com/?q=Kanda,Accra,Ghana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--brand-gold)] hover:underline font-body"
                >
                  Get Directions
                </a>
              </div>

              <div className="bg-[var(--bg-primary)] rounded-xl p-4 md:p-6 border border-[var(--border-gold)]">
                <p className="text-sm font-body text-[var(--text-muted)] mb-1">📞 Call/WhatsApp</p>
                <a href="tel:0534057109" className="text-base font-body text-[var(--brand-gold)] break-words">0534057109</a>
              </div>

              <div className="bg-[var(--bg-primary)] rounded-xl p-4 md:p-6 border border-[var(--border-gold)]">
                <p className="text-sm font-body text-[var(--text-muted)] mb-1">📧 Email</p>
                <a href="mailto:hairelevationstudio@gmail.com" className="text-base font-body text-[var(--brand-gold)] break-words truncate">
                  hairelevationstudio@gmail.com
                </a>
              </div>

              <div className="bg-[var(--bg-primary)] rounded-xl p-4 md:p-6 border border-[var(--border-gold)]">
                <p className="text-sm font-body text-[var(--text-muted)] mb-1">🕐 Hours</p>
                <p className="text-base font-body text-[var(--text-primary)] break-words">Tues-Sat 9am-6pm</p>
              </div>

<div className="flex flex-wrap gap-3 justify-center pt-2 md:pt-4">
                <a
                  href="https://instagram.com/hair_elevation_studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[rgba(200,169,126,0.3)] text-[var(--brand-gold)] hover:bg-[var(--brand-gold)] hover:text-[#3B2A23] transition-colors duration-200 flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <BsInstagram className="w-5 h-5" />
                </a>
                <a
                  href="https://tiktok.com/@hair_elevation_studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[rgba(200,169,126,0.3)] text-[var(--brand-gold)] hover:bg-[var(--brand-gold)] hover:text-[#3B2A23] transition-colors duration-200 flex items-center justify-center"
                  aria-label="TikTok"
                >
                  <BsTiktok className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/233534057109"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[rgba(200,169,126,0.3)] text-[var(--brand-gold)] hover:bg-[var(--brand-gold)] hover:text-[#3B2A23] transition-colors duration-200 flex items-center justify-center"
                  aria-label="WhatsApp"
                >
                  <BsWhatsapp className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}