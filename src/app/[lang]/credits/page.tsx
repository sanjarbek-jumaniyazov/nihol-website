import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ALL_CREDITS } from "@/lib/images";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang);
  return { title: dict.meta.credits.title, description: dict.meta.credits.description };
}

export default async function CreditsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang);
  const t = dict.credits;

  return (
    <Container className="py-16">
      <h1 className="font-serif text-3xl font-semibold text-primary-950">{t.title}</h1>
      <p className="mt-3 max-w-2xl text-primary-800/80">{t.description}</p>

      <ul className="mt-8 divide-y divide-primary-100 rounded-2xl border border-primary-100">
        {ALL_CREDITS.map((credit) => (
          <li key={credit.sourceFile} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-sm">
            <a
              href={`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(credit.sourceFile)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary-900 hover:text-primary-700"
            >
              {credit.sourceFile}
            </a>
            <span className="text-primary-800/70">
              {credit.author} · {credit.license}
            </span>
          </li>
        ))}
      </ul>
    </Container>
  );
}
