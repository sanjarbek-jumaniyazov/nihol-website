"use client";

import { createContext, useContext } from "react";
import { defaultLocale, type Locale } from "./config";

const LocaleContext = createContext<Locale>(defaultLocale);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** Prefixes a bare internal path (e.g. "/marketplace") with the given locale. Leaves absolute URLs, hashes, mailto:, and tel: links untouched. */
export function withLocale(href: string, locale: Locale): string {
  if (/^([a-z][a-z0-9+.-]*:)?\/\//i.test(href)) return href;
  if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) return href;
  if (!href.startsWith("/")) return href;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}
