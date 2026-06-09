import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ title, subtitle, align = 'center', className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-12', align === 'center' ? 'text-center' : 'text-left', className)}>
      <h2 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4 font-heading">
        {title}
      </h2>
      <div className="w-16 h-0.5 bg-[var(--gradient-gold)] mx-auto mb-4" />
      {subtitle && (
        <p className="text-lg text-ui-text-secondary font-body max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}