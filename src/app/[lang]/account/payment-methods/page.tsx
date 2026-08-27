import { BackHeader } from "@/components/ui/back-header";
import { Container } from "@/components/ui/container";
import { AddPaymentMethodForm } from "@/components/account/add-payment-method-form";
import { requireCustomer } from "@/lib/auth";
import { getPaymentMethodLabels } from "@/lib/data";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default async function PaymentMethodsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang).account.paymentMethods;
  const customer = await requireCustomer(lang);
  const methods = await getPaymentMethodLabels(customer.id);

  return (
    <div className="pb-16">
      <BackHeader title={dict.title} backHref="/account" />
      <Container className="max-w-xl space-y-2.5 py-6">
        {methods.map((m) => (
          <div key={m.id} className="flex items-center gap-3 rounded-2xl border border-hairline bg-white p-4">
            <span className={"h-4.5 w-4.5 rounded-full border-2 " + (m.isDefault ? "border-primary-700 bg-primary-700" : "border-hairline")} />
            <div>
              <p className="text-sm font-semibold text-ink">{m.label}</p>
              <p className="mt-0.5 text-xs text-label">{m.meta}</p>
            </div>
          </div>
        ))}
        <AddPaymentMethodForm label={dict.linkAnother} />
      </Container>
    </div>
  );
}
