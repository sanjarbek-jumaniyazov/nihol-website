import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";

export function CtaBanner({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="bg-primary-900 py-16 sm:py-20">
      <Container className="text-center">
        <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-200">{description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <LinkButton href={primaryHref} variant="secondary" size="lg">
            {primaryLabel}
          </LinkButton>
          {secondaryHref && secondaryLabel && (
            <LinkButton
              href={secondaryHref}
              size="lg"
              className="border border-primary-500 bg-transparent text-white hover:bg-primary-800"
            >
              {secondaryLabel}
            </LinkButton>
          )}
        </div>
      </Container>
    </section>
  );
}
