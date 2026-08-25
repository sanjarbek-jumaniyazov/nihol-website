import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ALL_CREDITS } from "@/lib/images";

export const metadata: Metadata = {
  title: "Photo Credits",
  description: "Attribution for photography used on Nihol, sourced from Wikimedia Commons.",
};

export default function CreditsPage() {
  return (
    <Container className="py-16">
      <h1 className="font-serif text-3xl font-semibold text-primary-950">Photo Credits</h1>
      <p className="mt-3 max-w-2xl text-primary-800/80">
        Photography on this site is sourced from Wikimedia Commons under Creative Commons and
        similar open licenses, which require attribution. Credits below; full license terms are
        available on each photo&apos;s Wikimedia Commons file page.
      </p>

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
