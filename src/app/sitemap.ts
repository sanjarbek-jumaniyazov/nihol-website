import type { MetadataRoute } from "next";
import { getFarms, getProducts } from "@/lib/data";

const BASE_URL = "https://nihol.example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [farms, products] = await Promise.all([getFarms(), getProducts()]);

  const staticRoutes = ["", "/paulownia", "/marketplace", "/about", "/contact", "/cart"].map(
    (path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
    })
  );

  const farmRoutes = farms.map((farm) => ({
    url: `${BASE_URL}/marketplace/farms/${farm.slug}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((product) => ({
    url: `${BASE_URL}/marketplace/products/${product.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...farmRoutes, ...productRoutes];
}
