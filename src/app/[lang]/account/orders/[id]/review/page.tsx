import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/back-header";
import { Container } from "@/components/ui/container";
import { ReviewForm } from "@/components/account/review-form";
import { requireCustomer } from "@/lib/auth";
import { getMyOrders } from "@/lib/data";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default async function OrderReviewPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = (await params) as { lang: Locale; id: string };
  const dict = getDictionary(lang).account.review;
  const customer = await requireCustomer(lang);
  const orders = await getMyOrders(customer.id);
  const order = orders.find((o) => o.id === id);
  const firstProduct = order?.items.find((i) => i.itemType === "product");
  if (!order || !firstProduct?.productId) notFound();

  return (
    <div className="pb-16">
      <BackHeader title={dict.title} backHref="/account/orders" />
      <Container className="max-w-xl py-6">
        <ReviewForm
          orderId={order.id}
          productId={firstProduct.productId}
          itemLabel={order.items.map((i) => i.name).join(" · ")}
          dict={dict}
        />
      </Container>
    </div>
  );
}
