import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSom(amount: number): string {
  return `${new Intl.NumberFormat("en-US").format(amount)} SOM`;
}

export function formatUsdRange(min: number, max: number): string {
  return `$${min}–$${max} USD`;
}
