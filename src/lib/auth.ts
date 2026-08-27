import { redirect } from "next/navigation";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/server";
import type { Locale } from "@/i18n/config";

export interface Customer {
  id: string;
  email: string;
  fullName: string;
}

/**
 * The signed-in customer, or null. When Supabase isn't configured, account
 * pages (Grove, saved, orders, settings) run against a fixed demo identity
 * backed by mock-data.ts instead of requiring a real login — consistent with
 * the rest of the app's "runs without setup" behavior (see src/lib/data.ts).
 */
export async function getCurrentCustomer(): Promise<Customer | null> {
  if (!isSupabaseConfigured) {
    return { id: "demo-customer", email: "demo@nihol.uz", fullName: "Dilnoza Karimova" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  return {
    id: user.id,
    email: user.email ?? "",
    fullName: profile?.full_name || user.email || "",
  };
}

/** Use in server components for account-gated pages (Grove, saved, /account/**). */
export async function requireCustomer(locale: Locale): Promise<Customer> {
  const customer = await getCurrentCustomer();
  if (!customer) redirect(`/${locale}/account/login`);
  return customer;
}
