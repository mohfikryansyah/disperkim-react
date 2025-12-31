import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function strLimit(text: string, limit: number = 100, end: string = '...'): string {
  if (text.length <= limit) return text;
  return text.slice(0, limit - end.length) + end;
}