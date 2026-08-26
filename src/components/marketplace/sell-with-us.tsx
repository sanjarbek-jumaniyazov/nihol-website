import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Store, Package, TrendingUp } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";

const ICONS = [Store, Package, TrendingUp];

export function SellWithUs({ dict }: { dict: Dictionary["marketplace"] }) {
  const t = dict.sellWithUs;

  return (
    <section id="sell-with-us" className="py-16 sm:py-24">
      <Container className="rounded-3xl bg-primary-900 px-6 py-14 text-center sm:px-14">
        <p className="mb-3 inline-flex items-center rounded-full bg-primary-800 px-4 py-1.5 text-sm font-medium text-primary-100">
          {t.eyebrow}
        </p>
        <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">{t.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-200">{t.description}</p>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-8 text-left sm:grid-cols-3">
          {t.steps.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <div key={step.title}>
                <Icon className="h-6 w-6 text-primary-300" />
                <h3 className="mt-3 font-medium text-white">{step.title}</h3>
                <p className="mt-1 text-sm text-primary-200">{step.detail}</p>
              </div>
            );
          })}
        </div>

        <LinkButton href="/contact" variant="secondary" size="lg" className="mt-10">
          {t.apply}
        </LinkButton>
      </Container>
    </section>
  );
}
