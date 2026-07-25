"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BsClipboard } from 'react-icons/bs';
import { OutlineButton } from '@/components/shared/OutlineButton';

interface CopyTooltip {
  field: string;
  show: boolean;
}

interface CoursePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentConfirmed: () => void;
}

export function CoursePaymentModal({ isOpen, onClose, onPaymentConfirmed }: CoursePaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'mobile' | 'bank'>('mobile');
  const [copyTooltip, setCopyTooltip] = useState<CopyTooltip>({ field: '', show: false });

  if (!isOpen) return null;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopyTooltip({ field, show: true });
    setTimeout(() => setCopyTooltip({ field: '', show: false }), 1500);
  };

  const mobileMoneyDetails = [
    { label: 'MTN Merchant Number', value: '0541152970' },
    { label: 'Merchant ID', value: '545467' },
    { label: 'Account Name', value: 'Hair Elevation' },
  ];

  const bankDetails = [
    { label: 'Bank Name', value: 'EcoBank' },
    { label: 'Account Number', value: '1441005080927' },
    { label: 'Account Name', value: 'Hair Elevation Studio' },
  ];

  const paymentSteps = paymentMethod === 'mobile' ? [
    'Dial *170# on your mobile phone',
    'Select "Transfer Money"',
    'Enter Merchant Number: 0541152970',
    'Enter amount: GHS 1,200',
    'Enter your PIN to confirm',
    'Screenshot the confirmation',
  ] : [
    'Open your bank app or website',
    'Select Transfer or Make Payment',
    'Enter the account details above',
    'Enter amount: GHS 1,200',
    'Complete transfer and save receipt',
    'Screenshot the confirmation',
  ];

  const paymentDetails = paymentMethod === 'mobile' ? mobileMoneyDetails : bankDetails;

  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-[100] overflow-x-hidden">
      <motion.div
        className="bg-[#2A1E18] border border-[rgba(200,169,126,0.3)] rounded-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gradient-to-br from-[#C8A97E] to-[#A67C52] px-4 py-4 sm:px-6 sm:py-5 rounded-t-2xl relative">
          <h2 className="text-lg sm:text-xl font-bold text-[#3B2A23] font-body">
            Course Payment
          </h2>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[#3B2A23] hover:text-[#2A1E18] transition-colors"
          >
            <span className="text-xl sm:text-2xl">&times;</span>
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="bg-[#3B2A23] border border-[rgba(200,169,126,0.2)] rounded-xl p-4 mb-6">
            <p className="text-xs uppercase tracking-wider text-[#C8A97E] mb-1 font-body">
              Pixie Cut Virtual Class 2026
            </p>
            <p className="text-2xl font-bold text-[#C8A97E] font-heading">
              GHS 1,200
            </p>
          </div>

          <div className="flex gap-2 p-1 bg-[#3B2A23] rounded-full mb-6">
            <button
              onClick={() => setPaymentMethod('mobile')}
              className="flex-1 py-3 px-4 rounded-full text-sm font-semibold DM Sans tracking-wide transition-all duration-200 bg-gradient-to-r from-[#C8A97E] via-[#B8956A] to-[#A67C52] text-[#3B2A23] shadow-md"
            >
              Mobile Money
            </button>
            <button
              onClick={() => setPaymentMethod('bank')}
              className="flex-1 py-3 px-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 bg-transparent border border-[#C8A97E] text-[#C8A97E] hover:bg-[rgba(200,169,126,0.1)]"
            >
              Bank Transfer
            </button>
          </div>

          <div className="bg-[#3B2A23] border border-[rgba(200,169,126,0.2)] rounded-xl p-4 mb-6">
            {paymentDetails.map((detail) => (
              <div key={detail.label} className="mb-4 last:mb-0">
                <p className="text-xs uppercase tracking-wider text-[#C8A97E] mb-1 font-body">
                  {detail.label}
                </p>
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm font-bold text-[#F5EFE6] font-body truncate break-all">
                    {detail.value}
                  </span>
                  <button
                    onClick={() => copyToClipboard(detail.value, detail.label)}
                    className="w-7 h-7 rounded border border-[#C8A97E] flex items-center justify-center hover:bg-[#C8A97E] transition-colors flex-shrink-0"
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
                  <span className="text-sm text-[#F5EFE6] font-body break-words">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-[rgba(200,169,126,0.1)] border-l-[3px] border-l-[#C8A97E] rounded-r-xl px-3 py-2 sm:px-4 sm:py-3 mb-6">
            <p className="text-sm text-[#C8A97E] font-body break-words">
              After making payment, click the button below to upload your payment proof and receive your Telegram link.
            </p>
          </div>
        </div>

        <div className="px-4 py-3 sm:px-6 sm:py-4 border-t border-[rgba(200,169,126,0.15)] flex gap-3">
          <OutlineButton onClick={onClose} size="lg" className="flex-1">
            Cancel
          </OutlineButton>
          <button
            onClick={onPaymentConfirmed}
            className="w-full py-4 px-6 rounded-full font-semibold text-base tracking-wide transition-all duration-300 bg-gradient-to-r from-[#C8A97E] via-[#B8956A] to-[#A67C52] text-[#3B2A23] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            I Have Made the Payment — Upload Proof
          </button>
        </div>
      </motion.div>
    </div>
  );
}