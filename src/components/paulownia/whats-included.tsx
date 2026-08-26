import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatSom } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function WhatsIncluded({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const t = dict.paulownia.whatsIncluded;
  const price = formatSom(499000, lang);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title.replace("{price}", price)}
          description={t.description}
          align="center"
        />

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {t.items.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
              <span className="text-primary-900/90">{item}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
