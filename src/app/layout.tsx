import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://nihol.example.com"),
  title: {
    default: "Nihol — Invest in Paulownia. Shop Local Plants.",
    template: "%s | Nihol",
  },
  description:
    "Nihol is a sustainable agribusiness platform offering Paulownia timber investment with 8 years of professional tree care, and a marketplace of independent local farm brands selling plants, flowers, and trees.",
  keywords: [
    "Paulownia investment",
    "tree farming Uzbekistan",
    "plant marketplace",
    "buy plants online",
    "sustainable investment",
    "Nihol",
  ],
  openGraph: {
    title: "Nihol — Invest in Paulownia. Shop Local Plants.",
    description:
      "Long-term Paulownia timber investment with guaranteed care, plus a marketplace of independent farm brands selling plants, flowers, and trees.",
    siteName: "Nihol",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
