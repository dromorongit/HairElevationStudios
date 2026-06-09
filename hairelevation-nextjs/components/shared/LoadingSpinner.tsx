import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export function LoadingSpinner({ size = 'md', fullPage = false, className }: LoadingSpinnerProps) {
  const spinner = (
    <div
      className={cn(
        'border-2 border-brand-gold border-t-transparent rounded-full animate-spin',
        sizeClasses[size],
        className
      )}
    />
  );

  if (fullPage) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-brand-warm-white">
        {spinner}
      </div>
    );
  }

  return spinner;
}