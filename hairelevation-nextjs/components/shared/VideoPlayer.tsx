"use client";

import { useState } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
}

export function VideoPlayer({
  src,
  poster,
  className,
  autoPlay = false,
  loop = false,
}: VideoPlayerProps) {
  const [showOverlay, setShowOverlay] = useState(!autoPlay);

  const handlePlay = () => {
    setShowOverlay(false);
  };

  return (
    <div className={cn('relative rounded-xl overflow-hidden border border-[var(--border-gold)]', className)}>
      <video
        src={src}
        poster={poster}
        controls={!showOverlay}
        autoPlay={autoPlay}
        loop={loop}
        className="w-full object-cover"
        onPlay={() => setShowOverlay(false)}
      />
      
      {showOverlay && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer bg-[rgba(59,42,35,0.6)]"
          onClick={handlePlay}
        >
          <div className="w-16 h-16 rounded-full bg-[var(--brand-gold)] flex items-center justify-center hover:bg-[var(--brand-gold)] transition-colors">
            <Play className="w-8 h-8 text-[var(--bg-primary)] ml-1" />
          </div>
        </div>
      )}
    </div>
  );
}