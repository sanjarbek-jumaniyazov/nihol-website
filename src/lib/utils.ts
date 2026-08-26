import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale } from "@/i18n/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CURRENCY_WORD: Record<Locale, string> = {
  en: "SOM",
  ru: "сум",
  uz: "so'm",
};

export function formatSom(amount: number, locale: Locale = "en"): string {
  return `${new Intl.NumberFormat("en-US").format(amount)} ${CURRENCY_WORD[locale]}`;
}

export function formatUsdRange(min: number, max: number): string {
  return `$${min}–$${max} USD`;
}
