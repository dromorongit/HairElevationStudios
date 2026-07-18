"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BsUpload, BsX, BsTelegram } from 'react-icons/bs';
import { GoldButton } from '@/components/shared/GoldButton';

interface CourseProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File, name: string, phone: string) => void;
  isUploading: boolean;
}

export function CourseProofModal({
  isOpen,
  onClose,
  onSubmit,
  isUploading,
}: CourseProofModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!selectedFile) {
      newErrors.file = 'Payment proof is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (validateForm() && selectedFile) {
      onSubmit(selectedFile, name, phone);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-[100] overflow-x-hidden">
      <motion.div
        className="bg-[#2A1E18] border border-[rgba(200,169,126,0.3)] rounded-2xl max-w-full w-full mx-4 max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gradient-to-br from-[#C8A97E] to-[#A67C52] px-4 py-4 sm:px-6 sm:py-5 rounded-t-2xl relative">
          <h2 className="text-lg sm:text-xl font-bold text-[#3B2A23] font-body">
            Upload Payment Proof
          </h2>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[#3B2A23] hover:text-[#2A1E18] transition-colors"
          >
            <span className="text-xl sm:text-2xl">&times;</span>
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1 font-body">
              Full Name <span className="text-[var(--brand-gold)]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg-primary)] text-[var(--text-primary)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition-colors ${
                errors.phone ? 'border-red-500' : 'border-[var(--border-gold)]'
              }`}
              placeholder="024XXXXXXX"
            />
            {errors.phone && (
              <p className="text-xs text-red-400 mt-1 font-body">{errors.phone}</p>
            )}
          </div>

          <div
            className={`border-2 border-dashed rounded-xl p-6 sm:p-10 text-center transition-colors cursor-pointer ${
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
              id="course-proof-input"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
            <label
              htmlFor="course-proof-input"
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
              <div className="relative inline-block max-w-full">
                <img
                  src={previewUrl}
                  alt="Payment proof preview"
                  className="max-w-full max-h-48 rounded-xl border border-[#C8A97E] object-contain"
                />
                <button
                  onClick={handleRemoveFile}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#C8A97E] text-[#3B2A23] flex items-center justify-center hover:bg-[#A67C52] transition-colors"
                >
                  <BsX className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-2 font-body truncate max-w-full">
                {selectedFile?.name}
              </p>
              {errors.file && (
                <p className="text-xs text-red-400 mt-1 font-body">{errors.file}</p>
              )}
            </div>
          )}
        </div>

        <div className="px-4 py-3 sm:px-6 sm:py-4 border-t border-[rgba(200,169,126,0.15)]">
          <GoldButton
            onClick={handleSubmit}
            size="lg"
            disabled={!selectedFile || !name.trim() || !phone.trim() || isUploading}
            className="w-full"
          >
            {isUploading ? (
              <>
                <div className="w-5 h-5 border-2 border-[var(--bg-primary)] border-t-transparent rounded-full animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <BsTelegram className="w-4 h-4 mr-2" />
                Submit & Get Telegram Link
              </>
            )}
          </GoldButton>
        </div>
      </motion.div>
    </div>
  );
}