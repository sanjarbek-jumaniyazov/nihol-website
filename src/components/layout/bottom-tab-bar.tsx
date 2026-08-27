"use client";

import { usePathname } from "next/navigation";
import { Home, Sprout, ShoppingBag, Leaf, User } from "lucide-react";
import { Link } from "@/components/ui/localized-link";
import { useLocale } from "@/i18n/locale-context";
import type { Dictionary } from "@/i18n/dictionaries";

export default function BottomTabBar({ dict }: { dict: Dictionary }) {
  const pathname = usePathname();
  const locale = useLocale();
  const withoutLocale = pathname.replace(new RegExp(`^/${locale}`), "") || "/";

  const TABS = [
    { href: "/", label: dict.nav.home, icon: Home, match: (p: string) => p === "/" },
    { href: "/paulownia", label: dict.nav.invest, icon: Sprout, match: (p: string) => p.startsWith("/paulownia") },
    { href: "/marketplace", label: dict.nav.market, icon: ShoppingBag, match: (p: string) => p.startsWith("/marketplace") },
    { href: "/grove", label: dict.nav.grove, icon: Leaf, match: (p: string) => p.startsWith("/grove") },
    { href: "/account", label: dict.nav.account, icon: User, match: (p: string) => p.startsWith("/account") },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 flex border-t border-hairline bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      aria-label="Primary"
    >
      {TABS.map((tab) => {
        const active = tab.match(withoutLocale);
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex flex-1 flex-col items-center justify-center gap-1 py-2"
          >
            <Icon
              className={active ? "h-5 w-5 text-primary-700" : "h-5 w-5 text-label"}
              strokeWidth={active ? 2.25 : 1.75}
            />
            <span
              className={
                active
                  ? "text-[11px] font-semibold text-primary-700"
                  : "text-[11px] font-semibold text-label"
              }
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
