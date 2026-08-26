"use client";

import { useRouter } from "next/navigation";
import { useLocale, withLocale } from "./locale-context";

/** `useRouter()` whose push/replace prefix bare internal paths with the current locale. */
export function useLocaleRouter() {
  const router = useRouter();
  const locale = useLocale();

  return {
    push: (href: string, options?: Parameters<typeof router.push>[1]) =>
      router.push(withLocale(href, locale), options),
    replace: (href: string, options?: Parameters<typeof router.replace>[1]) =>
      router.replace(withLocale(href, locale), options),
    refresh: () => router.refresh(),
    back: () => router.back(),
  };
}
