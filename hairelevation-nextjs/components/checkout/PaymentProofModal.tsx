"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BsUpload, BsX, BsWhatsapp } from 'react-icons/bs';
import { GoldButton } from '@/components/shared/GoldButton';

interface PaymentProofModalProps {
  isOpen: boolean;
  onSubmit: (file: File) => void;
  onClose: () => void;
  isUploading: boolean;
}

export function PaymentProofModal({
  isOpen,
  onSubmit,
  onClose,
  isUploading,
}: PaymentProofModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      return;
    }
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl('');
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onSubmit(selectedFile);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
      <motion.div
        className="bg-[#2A1E18] border border-[rgba(200,169,126,0.3)] rounded-2xl max-w-lg w-full mx-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gradient-to-br from-[#C8A97E] to-[#A67C52] px-6 py-5 rounded-t-2xl relative">
          <h2 className="text-xl font-bold text-[#3B2A23] font-body">
            Upload Payment Proof
          </h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#3B2A23] hover:text-[#2A1E18] transition-colors"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        <div className="p-6">
          <div
            className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer ${
              isDragging
                ? 'border-[#C8A97E] bg-[rgba(200,169,126,0.1)]'
                : 'border-[rgba(200,169,126,0.3)] bg-[rgba(200,169,126,0.05)]'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="payment-proof-input"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
            <label
              htmlFor="payment-proof-input"
              className="cursor-pointer block"
            >
              <BsUpload className="w-8 h-8 text-[#C8A97E] mx-auto mb-4" />
              <p className="text-sm font-bold text-[#F5EFE6] mb-1 font-body">
                Click to upload payment proof
              </p>
              <p className="text-xs text-[var(--text-muted)] mb-2 font-body">
                or drag and drop your image here
              </p>
              <p className="text-xs text-[var(--text-muted)] font-body">
                Supported formats: JPG, PNG, GIF (Max 5MB)
              </p>
            </label>
          </div>

          {previewUrl && (
            <div className="mt-4">
              <div className="relative inline-block">
                <img
                  src={previewUrl}
                  alt="Payment proof preview"
                  className="max-h-48 rounded-xl border border-[#C8A97E] object-contain"
                />
                <button
                  onClick={handleRemoveFile}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#C8A97E] text-[#3B2A23] flex items-center justify-center hover:bg-[#A67C52] transition-colors"
                >
                  <BsX className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-2 font-body">
                {selectedFile?.name}
              </p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-[rgba(200,169,126,0.15)]">
          <GoldButton
            onClick={handleSubmit}
            size="lg"
            disabled={!selectedFile || isUploading}
            className="w-full"
          >
            {isUploading ? (
              <>
                <div className="w-5 h-5 border-2 border-[var(--bg-primary)] border-t-transparent rounded-full animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <BsWhatsapp className="w-4 h-4 mr-2" />
                Submit Order & Open WhatsApp
              </>
            )}
          </GoldButton>
        </div>
      </motion.div>
    </div>
  );
}