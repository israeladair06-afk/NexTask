import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina clases de Tailwind de forma segura, fusionando conflictos
 * Uso: cn('px-2', 'px-4') => 'px-4' (mantiene la última)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
