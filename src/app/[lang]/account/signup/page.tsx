import { AccountAuthForm } from "@/components/account/auth-form";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default async function AccountSignupPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang).account;

  return <AccountAuthForm mode="signup" dict={dict} />;
}
