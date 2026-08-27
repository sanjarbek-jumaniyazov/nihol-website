"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import { Link } from "@/components/ui/localized-link";
import { Logo } from "@/components/ui/logo";
import { CartBadge } from "./cart-badge";
import { LanguageSwitcher } from "./language-switcher";
import { LinkButton } from "@/components/ui/button";
import { useLocale } from "@/i18n/locale-context";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries";

export default function Header({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const withoutLocale = pathname.replace(new RegExp(`^/${locale}`), "") || "/";

  const NAV_LINKS = [
    { href: "/paulownia", label: dict.nav.paulownia },
    { href: "/marketplace", label: dict.nav.marketplace },
    { href: "/grove", label: dict.nav.grove },
    { href: "/about", label: dict.nav.about },
    { href: "/contact", label: dict.nav.contact },
  ];

  const isActive = (href: string) => withoutLocale === href || withoutLocale.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-primary-100 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-semibold text-primary-900">
          <Logo size={32} />
          Nihol
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative pb-1 text-sm font-medium transition-colors",
                  active ? "text-primary-800" : "text-primary-900/80 hover:text-primary-700"
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-[22px] left-0 right-0 h-0.5 rounded-full bg-primary-700" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher />
          <Link href="/account" aria-label={dict.nav.account} className="text-primary-900 hover:text-primary-700">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/cart" aria-label={dict.nav.viewCart} className="text-primary-900 hover:text-primary-700">
            <CartBadge />
          </Link>
          <LinkButton href="/paulownia" size="sm">
            {dict.nav.investNow}
          </LinkButton>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <Link href="/cart" aria-label={dict.nav.viewCart} className="text-primary-900">
            <CartBadge />
          </Link>
          <button
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            onClick={() => setOpen((o) => !o)}
            className="text-primary-900"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-primary-100 bg-background px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 text-base font-medium",
                      active ? "text-primary-800" : "text-primary-900"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full transition-colors",
                        active ? "bg-primary-700" : "bg-transparent"
                      )}
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
