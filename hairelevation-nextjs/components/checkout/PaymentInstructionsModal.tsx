"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BsClipboard } from 'react-icons/bs';
import { OutlineButton } from '@/components/shared/OutlineButton';
import { formatPrice } from '@/lib/utils';

interface PaymentInstructionsModalProps {
  isOpen: boolean;
  paymentMethod: 'mobile' | 'bank';
  orderTotal: number;
  onConfirm: () => void;
  onClose: () => void;
}

interface CopyTooltip {
  field: string;
  show: boolean;
}

export function PaymentInstructionsModal({
  isOpen,
  paymentMethod,
  orderTotal,
  onConfirm,
  onClose,
}: PaymentInstructionsModalProps) {
  const [copyTooltip, setCopyTooltip] = useState<CopyTooltip>({ field: '', show: false });

  if (!isOpen) return null;

  const isMobileMoney = paymentMethod === 'mobile';
  const title = isMobileMoney ? 'Mobile Money Payment Instructions' : 'Bank Payment Instructions';

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopyTooltip({ field, show: true });
    setTimeout(() => setCopyTooltip({ field: '', show: false }), 1500);
  };

  const paymentDetails = isMobileMoney ? [
    { label: 'MTN Merchant Mobile Money Number', value: '0541152970' },
    { label: 'Merchant ID', value: '545467' },
    { label: 'Account Name', value: 'Hair Elevation' },
  ] : [
    { label: 'Bank Name', value: 'EcoBank' },
    { label: 'Account Number', value: '1441005080927' },
    { label: 'Account Name', value: 'Hair Elevation Studio' },
  ];

  const paymentSteps = isMobileMoney ? [
    'Dial *170# on your mobile phone',
    'Select "Transfer Money"',
    'Enter the Merchant Number: 0541152970',
    'Enter the exact amount of your order',
    'Enter your PIN to confirm payment',
    'Take a screenshot of the payment confirmation',
  ] : [
    'Visit your bank\'s mobile app or website',
    'Select "Transfer" or "Make Payment"',
    'Enter the account details above',
    'Enter the exact amount of your order',
    'Complete the transfer and save the receipt',
    'Take a screenshot of the payment confirmation',
  ];

  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
      <motion.div
        className="bg-[#2A1E18] border border-[rgba(200,169,126,0.3)] rounded-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gradient-to-br from-[#C8A97E] to-[#A67C52] px-6 py-5 rounded-t-2xl relative">
          <h2 className="text-xl font-bold text-[#3B2A23] font-body">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#3B2A23] hover:text-[#2A1E18] transition-colors"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        <div className="p-6">
          <div className="bg-[#3B2A23] border border-[rgba(200,169,126,0.2)] rounded-xl p-5 mb-6">
            {paymentDetails.map((detail) => (
              <div key={detail.label} className="mb-4 last:mb-0">
                <p className="text-xs uppercase tracking-wider text-[#C8A97E] mb-1 font-body">
                  {detail.label}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[#F5EFE6] font-body">
                    {detail.value}
                  </span>
                  <button
                    onClick={() => copyToClipboard(detail.value, detail.label)}
                    className="w-7 h-7 rounded border border-[#C8A97E] flex items-center justify-center hover:bg-[#C8A97E] transition-colors"
                    title="Copy to clipboard"
                  >
                    <BsClipboard className="w-3.5 h-3.5 text-[#C8A97E]" />
                  </button>
                  {copyTooltip.field === detail.label && copyTooltip.show && (
                    <span className="text-xs text-[#C8A97E] font-body">Copied!</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <p className="text-sm font-bold text-[#F5EFE6] mb-3 font-body">Payment Steps:</p>
            <ol className="space-y-2">
              {paymentSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#C8A97E] font-bold">{index + 1}.</span>
                  <span className="text-sm text-[#F5EFE6] font-body">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-[rgba(200,169,126,0.1)] border-l-[3px] border-l-[#C8A97E] rounded-r-xl px-4 py-3 mb-6">
            <p className="text-sm text-[#C8A97E] font-body">
              Please take a screenshot of your payment confirmation as proof of payment. You will need to upload this in the next step.
            </p>
          </div>

          <p className="text-lg font-bold text-[#C8A97E] text-center mb-6 font-body">
            Amount to pay: {formatPrice(orderTotal)}
          </p>
        </div>

        <div className="px-6 py-4 border-t border-[rgba(200,169,126,0.15)]">
          <OutlineButton onClick={onConfirm} size="lg" className="w-full">
            I Have Made the Payment
          </OutlineButton>
        </div>
      </motion.div>
    </div>
  );
}