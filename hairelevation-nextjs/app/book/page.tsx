"use client";

import { useState } from 'react';
import { GoldButton } from '@/components/shared/GoldButton';
import { BsInstagram, BsTiktok, BsCursor } from 'react-icons/bs';

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

const serviceOptions = [
  'Custom Wig Making',
  'Wig Revamp & Maintenance',
  'Wig Installation & Sew-in',
  'General Consultation',
];

const timeOptions = ['Morning (9am-12pm)', 'Afternoon (12pm-3pm)', 'Late Afternoon (3pm-6pm)'];

export default function BookPage() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.service) newErrors.service = 'Service type is required';
    if (!formData.date) newErrors.date = 'Preferred date is required';
    if (!formData.time) newErrors.time = 'Preferred time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const message = `📅 APPOINTMENT REQUEST

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || 'Not provided'}
Service: ${formData.service}
Preferred Date: ${formData.date}
Preferred Time: ${formData.time}
Notes: ${formData.notes || 'None'}`;

      const whatsappUrl = `https://wa.me/233534057109?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setIsSubmitted(true);
    }
  };

  const handleChange = (field: keyof BookingFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="py-16 md:py-20 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-body uppercase tracking-wider text-[var(--brand-gold)] mb-4">
            Home / Book Appointment
          </p>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-[var(--text-primary)] mb-4">
            Book Your Appointment
          </h1>
          <div className="w-16 h-0.5 bg-[var(--gradient-gold)] mx-auto mb-4" />
          <p className="text-lg font-body text-[var(--text-muted)] max-w-2xl mx-auto">
            Reserve your slot at Hair Elevation Studio, Kanda Accra
          </p>
        </div>
      </section>

      {/* Booking Form + Info */}
      <section className="py-12 md:py-16 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form - 60% width */}
            <div className="lg:col-span-3">
              <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-gold)] p-6 md:p-8">
                <h2 className="text-2xl font-heading font-bold text-[var(--text-primary)] mb-6">
                  Appointment Details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                      Phone Number <span className="text-[var(--brand-gold)]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange('phone')}
                      className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg-primary)] text-[var(--text-primary)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-[var(--border-gold)]'
                      }`}
                      placeholder="024XXXXXXX"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-400 mt-1 font-body">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1 font-body">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={handleChange('email')}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border-gold)] bg-[var(--bg-primary)] text-[var(--text-primary)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1 font-body">
                      Service Type <span className="text-[var(--brand-gold)]">*</span>
                    </label>
                    <select
                      value={formData.service}
                      onChange={handleChange('service')}
                      className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg-primary)] text-[var(--text-primary)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition-colors ${
                        errors.service ? 'border-red-500' : 'border-[var(--border-gold)]'
                      }`}
                    >
                      <option value="" className="bg-[var(--bg-primary)]">Select a service</option>
                      {serviceOptions.map(option => (
                        <option key={option} value={option} className="bg-[var(--bg-primary)]">{option}</option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-xs text-red-400 mt-1 font-body">{errors.service}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1 font-body">
                      Preferred Date <span className="text-[var(--brand-gold)]">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={handleChange('date')}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg-primary)] text-[var(--text-primary)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition-colors ${
                        errors.date ? 'border-red-500' : 'border-[var(--border-gold)]'
                      }`}
                    />
                    {errors.date && (
                      <p className="text-xs text-red-400 mt-1 font-body">{errors.date}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1 font-body">
                      Preferred Time <span className="text-[var(--brand-gold)]">*</span>
                    </label>
                    <select
                      value={formData.time}
                      onChange={handleChange('time')}
                      className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg-primary)] text-[var(--text-primary)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition-colors ${
                        errors.time ? 'border-red-500' : 'border-[var(--border-gold)]'
                      }`}
                    >
                      <option value="" className="bg-[var(--bg-primary)]">Select preferred time</option>
                      {timeOptions.map(option => (
                        <option key={option} value={option} className="bg-[var(--bg-primary)]">{option}</option>
                      ))}
                    </select>
                    {errors.time && (
                      <p className="text-xs text-red-400 mt-1 font-body">{errors.time}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1 font-body">
                      Additional Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={handleChange('notes')}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border-gold)] bg-[var(--bg-primary)] text-[var(--text-primary)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition-colors resize-none"
                      placeholder="Tell us more about what you want..."
                    />
                  </div>

                  {isSubmitted && (
                    <div className="bg-[var(--brand-gold)] text-[var(--bg-primary)] px-4 py-3 rounded-xl">
                      <p className="text-sm font-body font-medium">
                        ✅ Your booking request has been sent! We will confirm your appointment shortly via WhatsApp or call.
                      </p>
                    </div>
                  )}

                  <GoldButton type="submit" size="lg" className="w-full">
                    <BsCursor className="w-4 h-4 mr-2" />
                    Send Booking Request
                  </GoldButton>
                </form>
              </div>
            </div>

            {/* Info Card - 40% width */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-gold)]">
                <h3 className="text-2xl font-heading font-bold text-[var(--brand-gold)] mb-6">
                  Studio Information
                </h3>

                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-sm font-body text-[var(--text-muted)] mb-1">Location</p>
                    <p className="text-lg font-body text-[var(--text-primary)]">
                      Kanda, Accra, Ghana
                    </p>
                    <a
                      href="https://maps.google.com/?q=Kanda,Accra,Ghana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--brand-gold)] hover:underline font-body"
                    >
                      Get Directions
                    </a>
                  </div>

                  <div>
                    <p className="text-sm font-body text-[var(--text-muted)] mb-1">Hours</p>
                    <p className="text-lg font-body text-[var(--text-primary)]">
                      Tuesday - Saturday, 9:00am - 6:00pm
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-body text-[var(--text-muted)] mb-1">Call/WhatsApp</p>
                    <a href="tel:0534057109" className="text-lg font-body text-[var(--brand-gold)]">
                      0534057109
                    </a>
                  </div>

                  <div>
                    <p className="text-sm font-body text-[var(--text-muted)] mb-1">Email</p>
                    <a href="mailto:hairelevationstudio@gmail.com" className="text-lg font-body text-[var(--brand-gold)]">
                      hairelevationstudio@gmail.com
                    </a>
                  </div>
                </div>

                <div className="border-t border-[var(--border-gold)] pt-6 mb-6">
                  <h4 className="text-lg font-heading font-bold text-[var(--brand-gold)] mb-4">
                    What to Expect
                  </h4>
                  <ul className="space-y-2">
                    <li className="text-sm font-body text-[var(--text-primary)]">• Consultation on arrival</li>
                    <li className="text-sm font-body text-[var(--text-primary)]">• 50% deposit required for custom orders</li>
                    <li className="text-sm font-body text-[var(--text-primary)]">• Final fitting included</li>
                  </ul>
                </div>

<div className="flex gap-4">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}