"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { locales, type Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-context";
import { cn } from "@/lib/utils";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  uz: "O'zbekcha",
};

function pathWithLocale(pathname: string, locale: Locale) {
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/") || `/${locale}`;
}

function setLocaleCookie(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
}

export function LanguageSwitcher({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    setLocaleCookie(next);
    router.push(pathWithLocale(pathname, next));
    router.refresh();
  }

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        aria-label="Change language"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium",
          variant === "light"
            ? "text-primary-900/80 hover:bg-primary-50 hover:text-primary-700"
            : "text-primary-100 hover:bg-primary-800 hover:text-white"
        )}
      >
        <Globe className="h-4 w-4" />
        {LOCALE_LABELS[locale]}
      </button>

      {open && (
        <>
          <button
            aria-hidden
            tabIndex={-1}
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <ul className="absolute right-0 z-50 mt-2 w-36 overflow-hidden rounded-xl border border-primary-100 bg-white py-1 shadow-lg">
            {locales.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  onClick={() => switchTo(l)}
                  className={cn(
                    "block w-full px-4 py-2 text-left text-sm hover:bg-primary-50",
                    l === locale ? "font-semibold text-primary-900" : "text-primary-800/80"
                  )}
                >
                  {LOCALE_LABELS[l]}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
