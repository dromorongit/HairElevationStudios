"use client";

import { useState } from 'react';
import { GoldButton } from '@/components/shared/GoldButton';

export interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  notes?: string;
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="bg-brand-warm-white rounded-2xl border border-ui-border p-6">
      <h3 className="text-lg font-heading font-bold text-brand-brown mb-4">
        Your Details
      </h3>
      
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
            Email Address <span className="text-brand-gold">*</span>
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
            Phone Number <span className="text-brand-gold">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={handleChange('phone')}
            className={`w-full px-4 py-3 rounded-xl border bg-brand-warm-white text-brand-brown font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors ${
              errors.phone ? 'border-red-500' : 'border-ui-border'
            }`}
            placeholder="024XXXXXXX"
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1 font-body">{errors.phone}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-brand-brown mb-1 font-body">
            Delivery Location <span className="text-brand-gold">*</span>
          </label>
          <textarea
            value={formData.location}
            onChange={handleChange('location')}
            rows={3}
            className={`w-full px-4 py-3 rounded-xl border bg-brand-warm-white text-brand-brown font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors resize-none ${
              errors.location ? 'border-red-500' : 'border-ui-border'
            }`}
            placeholder="Enter your delivery address"
          />
          {errors.location && (
            <p className="text-xs text-red-500 mt-1 font-body">{errors.location}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-brand-brown mb-1 font-body">
            Order Notes
          </label>
          <textarea
            value={formData.notes || ''}
            onChange={handleChange('notes')}
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-ui-border bg-brand-warm-white text-brand-brown font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors resize-none"
            placeholder="Any special instructions?"
          />
        </div>
        
        <GoldButton
          type="submit"
          size="lg"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-brand-brown border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z" />
            </svg>
          )}
          Proceed to Payment
        </GoldButton>
      </form>
    </div>
  );
}