import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `GHS ${price.toFixed(2)}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export const COLLECTION_DISPLAY_NAMES: Record<string, string> = {
  'Straight': 'Straight',
  'Wavy/Layers/Bouncy': 'Wavy Layers',
  'Curly': 'Curly',
  'Pixie Cut': 'Pixie Cut',
  'Bridal Crown': 'Straight',
  'Everyday Crown': 'Wavy Layers',
  'Signature Pixies': 'Pixie Cut',
  'Queens Curls': 'Curly',
};

export const COLLECTION_FILTER_MAPPING: Record<string, string> = {
  'Straight': 'Straight',
  'Wavy/Layers/Bouncy': 'Wavy/Layers/Bouncy',
  'Curly': 'Curly',
  'Pixie Cut': 'Pixie Cut',
  'Bridal Crown': 'Straight',
  'Everyday Crown': 'Wavy/Layers/Bouncy',
  'Signature Pixies': 'Pixie Cut',
  'Queens Curls': 'Curly',
};

export function getDisplayCollectionName(collection: string): string {
  return COLLECTION_DISPLAY_NAMES[collection] || collection;
}

export function toArray<T>(value: T | T[] | undefined | null): T[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
}