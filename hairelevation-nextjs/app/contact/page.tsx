"use client";

import { useState } from 'react';
import { Send } from 'lucide-react';
import { GoldButton } from '@/components/shared/GoldButton';

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
      <section className="py-20 bg-brand-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-brand-gold/80 font-body uppercase tracking-wider mb-4">
            Home / Contact
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-cream mb-4">
            Contact Us
          </h1>
          <div className="w-16 h-0.5 bg-[var(--gradient-gold)] mx-auto mb-4" />
          <p className="text-lg text-brand-gold/80 font-body max-w-2xl mx-auto">
            We would love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16 bg-brand-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8">
            {/* Form - left 60% */}
            <div className="lg:col-span-3">
              <div className="bg-brand-warm-white rounded-2xl border border-ui-border p-8">
                <h2 className="text-2xl font-heading font-bold text-brand-brown mb-6">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-brown mb-1 font-body">
                      Full Name <span className="text-brand-gold">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={handleChange('name')}
                      className={`w-full px-4 py-3 rounded-xl border bg-brand-warm-white text-brand-brown font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors ${
                        errors.name ? 'border-red-500' : 'border-ui-border'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1 font-body">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-brown mb-1 font-body">
                      Email <span className="text-brand-gold">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={handleChange('email')}
                      className={`w-full px-4 py-3 rounded-xl border bg-brand-warm-white text-brand-brown font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors ${
                        errors.email ? 'border-red-500' : 'border-ui-border'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1 font-body">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-brown mb-1 font-body">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange('phone')}
                      className="w-full px-4 py-3 rounded-xl border border-ui-border bg-brand-warm-white text-brand-brown font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors"
                      placeholder="024XXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-brown mb-1 font-body">
                      Subject <span className="text-brand-gold">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={handleChange('subject')}
                      className={`w-full px-4 py-3 rounded-xl border bg-brand-warm-white text-brand-brown font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors ${
                        errors.subject ? 'border-red-500' : 'border-ui-border'
                      }`}
                      placeholder="How can we help?"
                    />
                    {errors.subject && (
                      <p className="text-xs text-red-500 mt-1 font-body">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-brown mb-1 font-body">
                      Message <span className="text-brand-gold">*</span>
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={handleChange('message')}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl border bg-brand-warm-white text-brand-brown font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors resize-none ${
                        errors.message ? 'border-red-500' : 'border-ui-border'
                      }`}
                      placeholder="Your message..."
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 mt-1 font-body">{errors.message}</p>
                    )}
                  </div>

                  {isSubmitted && (
                    <div className="bg-brand-gold text-brand-brown px-4 py-3 rounded-xl">
                      <p className="text-sm font-body font-medium">
                        ✅ Your message has been sent! We will respond shortly via WhatsApp or email.
                      </p>
                    </div>
                  )}

                  <GoldButton type="submit" size="lg" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </GoldButton>
                </form>
              </div>
            </div>

            {/* Info Cards - right 40% */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-brand-brown rounded-2xl p-6">
                <p className="text-sm font-body text-brand-cream/60 mb-1">📍 Visit Us</p>
                <p className="text-lg font-body text-brand-cream mb-2">Kanda, Accra, Ghana</p>
                <a
                  href="https://maps.google.com/?q=Kanda,Accra,Ghana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-gold hover:underline font-body"
                >
                  Get Directions
                </a>
              </div>

              <div className="bg-brand-brown rounded-2xl p-6">
                <p className="text-sm font-body text-brand-cream/60 mb-1">📞 Call/WhatsApp</p>
                <a href="tel:0534057109" className="text-lg font-body text-brand-cream">
                  0534057109
                </a>
              </div>

              <div className="bg-brand-brown rounded-2xl p-6">
                <p className="text-sm font-body text-brand-cream/60 mb-1">📧 Email</p>
                <a href="mailto:hairelevationstudio@gmail.com" className="text-lg font-body text-brand-cream">
                  hairelevationstudio@gmail.com
                </a>
              </div>

              <div className="bg-brand-brown rounded-2xl p-6">
                <p className="text-sm font-body text-brand-cream/60 mb-1">🕐 Hours</p>
                <p className="text-lg font-body text-brand-cream">Tues-Sat 9am-6pm</p>
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <a
                  href="https://instagram.com/hair_elevation_studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-brown transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.4.5.6.2 1 .5 1.5 1s.8.9 1 1.5c.2.5.4 1.2.5 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.4-.2.6-.5 1-1 1.5s-.9.8-1.5 1c-.5.2-1.2.4-2.4.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.4-.5-.6-.2-1-.5-1.5-1s-.8-.9-1-1.5c-.2-.5-.4-1.2-.5-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.4.2-.6.5-1 1-1.5s.9-.8 1.5-1c.5-.2 1.2-.4 2.4-.5 1.3-.1 1.7-.1 4.9-.1m0-2.2C8.7 0 8.3 0 7 .1 5.7.2 4.7.4 3.8.8c-.9.4-1.7 1-2.5 1.8C.6 3.4 0 4.2 0 5.1c-.2.9-.3 1.9-.3 4.9s0 3.9.1 5.1c0 .9.2 1.8.5 2.7.4.9.8 1.7 1.5 2.4.7.8 1.5 1.4 2.4 1.8.9.4 1.9.6 2.7.7 1.9.1 4.2.1 7 .1h.1c.1 0 .1 0 .1 0s.1 0 .1 0c2.9 0 3.3 0 4.9-.1 1.2-.1 2.3-.3 3.2-.6.9-.3 1.7-.9 2.4-1.8.8-.8 1.4-1.6 1.8-2.7.4-.9.6-1.9.7-2.7.1-1.3.1-1.7.1-4.9.1s-3.9 0-5.1-.1c-.9 0-1.8-.2-2.7-.5-.9-.3-1.7-.8-2.4-1.5-.8-.7-1.4-1.5-1.8-2.4C2.9 8.5 2.5 7.6 2.3 6.7 2.1 5.8 2 4.9 2 4.9 2 2.1 2 1.7 2 0v-.1C2 1.7 2 1.3 2.1.5c.2-.9.6-1.8 1.3-2.7.4-.8 1-1.4 1.8-1.8.9-.4 1.9-.6 2.7-.7h.1c.1 0 .1 0 .1 0s.1 0 .1 0c1.6 0 2.1 0 4.9.1h.1c2.8 0 3.2 0 4.9-.1.9 0 1.9.2 2.7.5.9.3 1.7.9 2.4 1.8.8.8 1.4 1.6 1.8 2.7.4.9.2 1.8.4 2.7.7 1.9.1 4.2.1 4.9.1s.1 0 .1 0" />
                  </svg>
                </a>
                <a
                  href="https://tiktok.com/@hair_elevation_studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-brown transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.563-.02 3.125-.015 4.688-.02v4.65h-4.688V19.5c0 1.562.288 3.122.855 4.704.567 1.582 1.737 2.784 3.31 3.351 1.573.567 3.15.683 4.723.683h.06c1.573 0 3.15-.116 4.723-.683 1.573-.567 2.743-1.77 3.31-3.351.567-1.582.855-3.142.855-4.704V7.67c2.482-.18 4.97-.477 7.44-1.104v-.41c0-1.562-.288-3.122-.855-4.704-.567-1.582-1.737-2.784-3.31-3.351-1.573-.567-3.15-.683-4.723-.683h-.06C15.925.02 14.365.12 12.8.47v4.54h.225z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}