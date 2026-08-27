"use client";

import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Link } from "@/components/ui/localized-link";
import { Logo } from "@/components/ui/logo";
import { CartBadge } from "./cart-badge";
import { LanguageSwitcher } from "./language-switcher";
import { LinkButton } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/dictionaries";

export default function Header({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  const NAV_LINKS = [
    { href: "/paulownia", label: dict.nav.paulownia },
    { href: "/marketplace", label: dict.nav.marketplace },
    { href: "/grove", label: dict.nav.grove },
    { href: "/about", label: dict.nav.about },
    { href: "/contact", label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-primary-100 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-semibold text-primary-900">
          <Logo size={32} />
          Nihol
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-primary-900/80 transition-colors hover:text-primary-700"
            >
              {link.label}
            </Link>
          ))}
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
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-base font-medium text-primary-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
