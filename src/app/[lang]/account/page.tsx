import { ChevronRight } from "lucide-react";
import { Link } from "@/components/ui/localized-link";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { AccountSignOutButton } from "@/components/account/sign-out-button";
import { ReferralCard } from "@/components/account/referral-card";
import { requireCustomer } from "@/lib/auth";
import {
  getReferralCode,
  getNotificationPreferences,
  getAddresses,
  getPaymentMethodLabels,
  getSavedProductIds,
} from "@/lib/data";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default async function AccountPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang).account;
  const customer = await requireCustomer(lang);

  const [referralCode, notifications, addresses, paymentMethods, savedIds] = await Promise.all([
    getReferralCode(customer.id, customer.fullName),
    getNotificationPreferences(customer.id),
    getAddresses(customer.id),
    getPaymentMethodLabels(customer.id),
    getSavedProductIds(customer.id),
  ]);

  const notifCount = Object.values(notifications).filter(Boolean).length;
  const defaultAddress = addresses.find((a) => a.isDefault) ?? addresses[0];
  const defaultPayment = paymentMethods.find((m) => m.isDefault) ?? paymentMethods[0];
  const initials = customer.fullName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const SETTINGS = [
    { href: "/account/payment-methods", name: dict.settings.paymentMethods, meta: dict.settings.paymentMethodsMeta.replace("{name}", defaultPayment?.label ?? "—") },
    { href: "/account/notifications", name: dict.settings.notifications, meta: dict.settings.notificationsMeta.replace("{count}", String(notifCount)) },
    { href: "/account/addresses", name: dict.settings.addresses, meta: dict.settings.addressesMeta.replace("{label}", defaultAddress?.label ?? "—").replace("{count}", String(addresses.length)) },
    { href: "/saved", name: dict.settings.saved, meta: dict.settings.savedMeta.replace("{count}", String(savedIds.length)) },
    { href: "/account/documents", name: dict.settings.documents, meta: dict.settings.documentsMeta },
    { href: "/account/help", name: dict.settings.help, meta: dict.settings.helpMeta },
  ];

  return (
    <div className="pb-16">
      <div className="flex items-center gap-3.5 border-b border-hairline bg-white px-4 py-6 sm:px-6">
        <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-primary-700 font-serif text-xl text-white">
          {initials || "?"}
        </div>
        <div>
          <h1 className="font-serif text-xl text-ink">{customer.fullName}</h1>
          <p className="mt-0.5 text-sm text-label">{customer.email}</p>
        </div>
      </div>

      <Container className="max-w-xl py-6">
        <ReferralCard code={referralCode} dict={dict} />

        <Card className="mt-5 overflow-hidden">
          <Link href="/account/orders" className="flex items-center justify-between border-b border-hairline p-4">
            <span className="text-sm font-semibold text-ink">{dict.settings.orders}</span>
            <ChevronRight className="h-4 w-4 text-label" />
          </Link>
          {SETTINGS.map((row) => (
            <Link key={row.href} href={row.href} className="flex items-center justify-between border-b border-hairline p-4 last:border-b-0">
              <div>
                <div className="text-sm font-semibold text-ink">{row.name}</div>
                <div className="mt-0.5 text-xs text-label">{row.meta}</div>
              </div>
              <ChevronRight className="h-4 w-4 text-label" />
            </Link>
          ))}
        </Card>

        <div className="mt-5 flex items-center justify-between">
          <AccountSignOutButton label={dict.signOut} />
          <p className="text-right text-xs text-label">{dict.footer}</p>
        </div>
      </Container>
    </div>
  );
}
