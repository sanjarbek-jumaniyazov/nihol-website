import type { MetadataRoute } from "next";
import { getFarms, getProducts } from "@/lib/data";
import { locales } from "@/i18n/config";

const BASE_URL = "https://nihol.example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const [farms, products] = await Promise.all([getFarms(locale), getProducts(locale)]);

    const staticRoutes = ["", "/paulownia", "/marketplace", "/about", "/contact", "/cart"].map(
      (path) => ({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
      })
    );

    const farmRoutes = farms.map((farm) => ({
      url: `${BASE_URL}/${locale}/marketplace/farms/${farm.slug}`,
      lastModified: new Date(),
    }));

    const productRoutes = products.map((product) => ({
      url: `${BASE_URL}/${locale}/marketplace/products/${product.slug}`,
      lastModified: new Date(),
    }));

    entries.push(...staticRoutes, ...farmRoutes, ...productRoutes);
  }

  return entries;
}
