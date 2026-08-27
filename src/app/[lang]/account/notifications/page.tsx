import { BackHeader } from "@/components/ui/back-header";
import { Container } from "@/components/ui/container";
import { NotificationToggles } from "@/components/account/notification-toggles";
import { requireCustomer } from "@/lib/auth";
import { getNotificationPreferences } from "@/lib/data";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default async function NotificationsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang).account.notifications;
  const customer = await requireCustomer(lang);
  const prefs = await getNotificationPreferences(customer.id);

  return (
    <div className="pb-16">
      <BackHeader title={dict.title} backHref="/account" />
      <Container className="max-w-xl py-6">
        <NotificationToggles initial={prefs} dict={dict} />
        <p className="mt-4 text-xs text-label">{dict.footer}</p>
      </Container>
    </div>
  );
}
