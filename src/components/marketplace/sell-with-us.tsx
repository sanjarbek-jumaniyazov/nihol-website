import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Store, Package, TrendingUp } from "lucide-react";

const STEPS = [
  { icon: Store, title: "Create your storefront", detail: "Set up your own branded page on Nihol." },
  { icon: Package, title: "Upload products & pricing", detail: "List your plants, flowers, or trees and manage inventory." },
  { icon: TrendingUp, title: "Receive orders", detail: "Get orders from customers browsing the Nihol marketplace." },
];

export function SellWithUs() {
  return (
    <section id="sell-with-us" className="py-16 sm:py-24">
      <Container className="rounded-3xl bg-primary-900 px-6 py-14 text-center sm:px-14">
        <p className="mb-3 inline-flex items-center rounded-full bg-primary-800 px-4 py-1.5 text-sm font-medium text-primary-100">
          For Farm Brands
        </p>
        <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
          Sell Your Products Here
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-200">
          Independent farm brands grow and sell their products through the Nihol marketplace —
          reach more customers without building your own storefront.
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-8 text-left sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.title}>
              <step.icon className="h-6 w-6 text-primary-300" />
              <h3 className="mt-3 font-medium text-white">{step.title}</h3>
              <p className="mt-1 text-sm text-primary-200">{step.detail}</p>
            </div>
          ))}
        </div>

        <LinkButton href="/contact" variant="secondary" size="lg" className="mt-10">
          Apply to Sell on Nihol
        </LinkButton>
      </Container>
    </section>
  );
}
