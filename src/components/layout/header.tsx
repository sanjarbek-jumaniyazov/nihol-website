"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Leaf } from "lucide-react";
import { CartBadge } from "./cart-badge";
import { LinkButton } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/paulownia", label: "Paulownia Investment" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-primary-100 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-semibold text-primary-900">
          <Leaf className="h-6 w-6 text-primary-600" strokeWidth={2} />
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
          <Link href="/cart" aria-label="View cart" className="text-primary-900 hover:text-primary-700">
            <CartBadge />
          </Link>
          <LinkButton href="/paulownia" size="sm">
            Invest Now
          </LinkButton>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <Link href="/cart" aria-label="View cart" className="text-primary-900">
            <CartBadge />
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
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
