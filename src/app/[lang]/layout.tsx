import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/locale-context";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang);

  return {
    metadataBase: new URL("https://nihol.example.com"),
    title: {
      default: dict.meta.defaultTitle,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.defaultDescription,
    keywords: [
      "Paulownia investment",
      "tree farming Uzbekistan",
      "plant marketplace",
      "buy plants online",
      "sustainable investment",
      "Nihol",
    ],
    openGraph: {
      title: dict.meta.defaultTitle,
      description: dict.meta.ogDescription,
      siteName: dict.meta.siteName,
      type: "website",
    },
    alternates: {
      languages: {
        en: "/en",
        ru: "/ru",
        uz: "/uz",
        "x-default": "/en",
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Locale };
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <LocaleProvider locale={lang}>
          <Header dict={dict} />
          <main className="flex-1">{children}</main>
          <Footer dict={dict} />
        </LocaleProvider>
      </body>
    </html>
  );
}
