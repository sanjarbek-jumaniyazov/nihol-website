import { BackHeader } from "@/components/ui/back-header";
import { Container } from "@/components/ui/container";
import { AddAddressForm } from "@/components/account/add-address-form";
import { requireCustomer } from "@/lib/auth";
import { getAddresses } from "@/lib/data";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default async function AddressesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang).account.addresses;
  const customer = await requireCustomer(lang);
  const addresses = await getAddresses(customer.id);

  return (
    <div className="pb-16">
      <BackHeader title={dict.title} backHref="/account" />
      <Container className="max-w-xl space-y-2.5 py-6">
        {addresses.map((a) => (
          <div key={a.id} className="flex items-start justify-between gap-3 rounded-2xl border border-hairline bg-white p-4">
            <div>
              <p className="text-sm font-semibold text-ink">{a.label}</p>
              <p className="mt-1 text-sm text-muted">
                {a.line}
                <br />
                {a.city}
              </p>
            </div>
            {a.isDefault && <span className="font-mono text-sm text-primary-700">✓</span>}
          </div>
        ))}
        <AddAddressForm label={dict.addNew} />
      </Container>
    </div>
  );
}
