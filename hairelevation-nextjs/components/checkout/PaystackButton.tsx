"use client";

import { useEffect, useImperativeHandle, forwardRef } from 'react';
import { CheckoutFormData } from './CheckoutForm';

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        onSuccess: (response: { reference: string }) => void;
        onCancel: () => void;
      }) => void;
    };
  }
}

interface PaystackButtonProps {
  formData: CheckoutFormData;
  onSuccess: (ref: string) => void;
  onCancel: () => void;
  amount: number;
  disabled: boolean;
}

export interface PaystackButtonRef {
  initiatePayment: () => void;
}

export const PaystackButton = forwardRef<PaystackButtonRef, PaystackButtonProps>(
  ({ formData, onSuccess, onCancel, amount, disabled }, ref) => {
    useEffect(() => {
      if (!window.PaystackPop && !document.querySelector('#paystack-script')) {
        const script = document.createElement('script');
        script.id = 'paystack-script';
        script.src = 'https://js.paystack.co/v1/inline.js';
        document.head.appendChild(script);
      }
    }, []);

    useImperativeHandle(ref, () => ({
      initiatePayment: () => {
        if (!window.PaystackPop || disabled) return;

        const ref_id = 'HES-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

        window.PaystackPop.setup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
          email: formData.email,
          amount: Math.round(amount * 100),
          currency: 'GHS',
          ref: ref_id,
          onSuccess: (response: { reference: string }) => {
            onSuccess(response.reference || ref_id);
          },
          onCancel: () => {
            onCancel();
          },
        });
      },
    }));

    return null;
  }
);

PaystackButton.displayName = 'PaystackButton';