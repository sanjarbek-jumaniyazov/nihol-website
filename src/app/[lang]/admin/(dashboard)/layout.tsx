import { Link } from "@/components/ui/localized-link";
import { redirect } from "next/navigation";
import { LayoutDashboard, ShoppingBag, MessageSquare } from "lucide-react";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Logo } from "@/components/ui/logo";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default async function AdminDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang).admin;

  if (!isSupabaseConfigured) redirect(`/${lang}/admin/login`);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) redirect(`/${lang}/admin/login`);

  const NAV = [
    { href: "/admin", label: dict.nav.overview, icon: LayoutDashboard },
    { href: "/admin/orders", label: dict.nav.orders, icon: ShoppingBag },
    { href: "/admin/contact", label: dict.nav.contact, icon: MessageSquare },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="flex w-64 flex-shrink-0 flex-col bg-primary-950 text-white">
        <div className="flex items-center gap-2 px-6 py-6 font-serif text-lg font-semibold">
          <Logo size={24} /> {dict.brand}
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-primary-100 hover:bg-primary-800 hover:text-white"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-primary-800 px-3 py-4">
          <p className="truncate px-3 pb-2 text-xs text-primary-400">{user?.email}</p>
          <div className="mb-2 px-1">
            <LanguageSwitcher variant="dark" />
          </div>
          <SignOutButton dict={dict} />
        </div>
      </aside>
      <div className="flex-1 bg-primary-50/40 p-8">{children}</div>
    </div>
  );
}
