"use client";

import { useState } from 'react';
import { Lock } from 'lucide-react';
import { OutlineButton } from '@/components/shared/OutlineButton';

export interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  city: string;
  notes?: string;
  paymentMethod: 'mobile' | 'bank';
}

interface CheckoutFormProps {
  formData: CheckoutFormData;
  onChange: (data: CheckoutFormData) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function CheckoutForm({ formData, onChange, onSubmit, isLoading }: CheckoutFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Delivery location is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Payment method is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  const handleChange = (field: keyof CheckoutFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    onChange({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-gold)] p-6">
      <h3 className="text-lg font-heading font-bold text-[var(--text-primary)] mb-4">
        Your Details
      </h3>

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
            Email Address <span className="text-[var(--brand-gold)]">*</span>
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
            Delivery Location <span className="text-[var(--brand-gold)]">*</span>
          </label>
          <textarea
            value={formData.location}
            onChange={handleChange('location')}
            rows={3}
            className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg-primary)] text-[var(--text-primary)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition-colors resize-none ${
              errors.location ? 'border-red-500' : 'border-[var(--border-gold)]'
            }`}
            placeholder="Enter your delivery address"
          />
          {errors.location && (
            <p className="text-xs text-red-400 mt-1 font-body">{errors.location}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1 font-body">
            City <span className="text-[var(--brand-gold)]">*</span>
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={handleChange('city')}
            className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg-primary)] text-[var(--text-primary)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition-colors ${
              errors.city ? 'border-red-500' : 'border-[var(--border-gold)]'
            }`}
            placeholder="Enter your city"
          />
          {errors.city && (
            <p className="text-xs text-red-400 mt-1 font-body">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1 font-body">
            Order Notes
          </label>
          <textarea
            value={formData.notes || ''}
            onChange={handleChange('notes')}
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-[var(--border-gold)] bg-[var(--bg-primary)] text-[var(--text-primary)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition-colors resize-none"
            placeholder="Any special instructions?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1 font-body">
            Payment Method <span className="text-[var(--brand-gold)]">*</span>
          </label>
          <select
            value={formData.paymentMethod || ''}
            onChange={handleChange('paymentMethod')}
            className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg-primary)] text-[var(--text-primary)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition-colors appearance-none cursor-pointer ${
              errors.paymentMethod ? 'border-red-500' : 'border-[var(--border-gold)]'
            }`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23C8A97E'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3F%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              backgroundSize: '20px',
            }}
          >
            <option value="" disabled className="bg-[var(--bg-primary)] text-[var(--text-muted)]">
              Select Payment Method
            </option>
            <option value="mobile" className="bg-[var(--bg-primary)] text-[var(--text-primary)]">
              Mobile Money
            </option>
            <option value="bank" className="bg-[var(--bg-primary)] text-[var(--text-primary)]">
              Payment to Bank
            </option>
          </select>
          {errors.paymentMethod && (
            <p className="text-xs text-red-400 mt-1 font-body">{errors.paymentMethod}</p>
          )}
        </div>

        <OutlineButton
          type="submit"
          size="lg"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-[var(--bg-primary)] border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <Lock className="w-4 h-4 mr-2" />
          )}
          Place Order
        </OutlineButton>
      </form>
    </div>
  );
}