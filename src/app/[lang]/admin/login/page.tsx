import { AdminLoginForm } from "@/components/admin/login-form";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default async function AdminLoginPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang).admin;

  return <AdminLoginForm dict={dict} />;
}
