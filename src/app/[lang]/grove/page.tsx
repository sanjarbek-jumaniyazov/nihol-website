import { Container } from "@/components/ui/container";
import { GroveTabs } from "@/components/grove/grove-tabs";
import { requireCustomer } from "@/lib/auth";
import { getMyTrees, getMyOrders } from "@/lib/data";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default async function GrovePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { lang } = (await params) as { lang: Locale };
  const { tab } = await searchParams;
  const dict = getDictionary(lang);
  const customer = await requireCustomer(lang);
  const [trees, orders] = await Promise.all([getMyTrees(customer.id), getMyOrders(customer.id)]);

  return (
    <div className="pb-16">
      <div className="border-b border-hairline bg-white px-4 py-6 sm:px-6">
        <h1 className="font-serif text-2xl text-ink sm:text-3xl">{dict.grove.title}</h1>
      </div>
      <Container className="max-w-xl">
        <GroveTabs trees={trees} orders={orders} dict={dict} lang={lang} initialTab={tab === "orders" || tab === "impact" ? tab : "trees"} />
      </Container>
    </div>
  );
}
