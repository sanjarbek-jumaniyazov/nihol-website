import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, Sprout, ShoppingBag, MessageSquare, Leaf } from "lucide-react";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/inquiries", label: "Investment Inquiries", icon: Sprout },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/contact", label: "Contact Messages", icon: MessageSquare },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured) redirect("/admin/login");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) redirect("/admin/login");

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="flex w-64 flex-shrink-0 flex-col bg-primary-950 text-white">
        <div className="flex items-center gap-2 px-6 py-6 font-serif text-lg font-semibold">
          <Leaf className="h-5 w-5 text-primary-300" /> Nihol Admin
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
          <SignOutButton />
        </div>
      </aside>
      <div className="flex-1 bg-primary-50/40 p-8">{children}</div>
    </div>
  );
}
