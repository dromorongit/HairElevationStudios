"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VideoPlayer } from './VideoPlayer';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  videos: string[];
  productName: string;
  className?: string;
}

type MediaItem = {
  type: 'image' | 'video';
  src: string;
};

export function ImageGallery({ images, videos, productName, className }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const mediaItems: MediaItem[] = [
    ...(images || []).map((src) => ({ type: 'image' as const, src })),
    ...(videos || []).map((src) => ({ type: 'video' as const, src })),
  ];

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxOpen]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setLightboxIndex((prev) => (prev > 0 ? prev - 1 : mediaItems.length - 1));
    } else {
      setLightboxIndex((prev) => (prev < mediaItems.length - 1 ? prev + 1 : 0));
    }
  }, [mediaItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, navigateLightbox]);

  if (mediaItems.length === 0) {
    return null;
  }

  const activeItem = mediaItems[activeIndex];

  return (
    <>
      <div className={cn('flex flex-col gap-4', className)}>
        <motion.div
          className="relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer bg-[var(--bg-secondary)] border border-[var(--brand-gold)]/20"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => openLightbox(activeIndex)}
        >
          <span className="absolute top-2 right-2 z-10 text-xs bg-[var(--bg-primary)]/80 text-[var(--text-primary)] px-2 py-1 rounded-full font-body">
            {activeIndex + 1} / {mediaItems.length}
          </span>

          {activeItem.type === 'image' ? (
            <Image
              src={activeItem.src}
              alt={`${productName} - image ${activeIndex + 1}`}
              fill
              className="object-cover object-top"
              loading="lazy"
            />
          ) : (
            <div className="relative w-full h-full">
              <video
                src={activeItem.src}
                className="w-full h-full object-cover object-top"
                muted
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Play className="w-12 h-12 text-[var(--brand-gold)]/80" />
              </div>
            </div>
          )}
        </motion.div>

        {mediaItems.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {mediaItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden cursor-pointer border-2 flex-shrink-0',
                  index === activeIndex ? 'border-[var(--brand-gold)]' : 'border-transparent'
                )}
              >
{item.type === 'image' ? (
                   <Image
                     src={item.src}
                     alt={`Thumbnail ${index + 1}`}
                     fill
                     className="object-cover object-top"
                     loading="lazy"
                   />
                 ) : (
                  <div className="w-full h-full bg-[var(--bg-secondary)] flex items-center justify-center">
                    <Play className="w-6 h-6 text-[var(--brand-gold)]" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-[var(--brand-gold)] hover:text-[var(--brand-gold-dark)] transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={() => navigateLightbox('prev')}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--brand-gold)]/20 flex items-center justify-center hover:bg-[var(--brand-gold)]/30 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-[var(--brand-gold)]" />
            </button>

            <button
              onClick={() => navigateLightbox('next')}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--brand-gold)]/20 flex items-center justify-center hover:bg-[var(--brand-gold)]/30 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-[var(--brand-gold)]" />
            </button>

<div className="relative max-w-5xl max-h-[80vh] w-full">
                {mediaItems[lightboxIndex].type === 'image' ? (
                  <Image
                    src={mediaItems[lightboxIndex].src}
                    alt={`${productName} - image ${lightboxIndex + 1}`}
                    fill
                    className="object-contain rounded-xl"
                  />
                ) : (
                <VideoPlayer
                  src={mediaItems[lightboxIndex].src}
                  className="w-full"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}