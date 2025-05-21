import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names using clsx and merges them using tailwind-merge
 * to handle Tailwind CSS class conflicts properly
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 