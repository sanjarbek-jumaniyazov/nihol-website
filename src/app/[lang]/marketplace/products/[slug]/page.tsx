import type { Metadata } from "next";
import { Link } from "@/components/ui/localized-link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { StarRating } from "@/components/ui/star-rating";
import { ProductCard } from "@/components/marketplace/product-card";
import { AddToCartButton } from "@/components/marketplace/add-to-cart-button";
import { PRODUCT_CATEGORIES } from "@/lib/types";
import { PRODUCT_IMAGES, FARM_IMAGES } from "@/lib/images";
import { formatSom } from "@/lib/utils";
import { getFarmById, getProductBySlug, getProducts, getRelatedProducts } from "@/lib/data";
import { getDictionary } from "@/i18n/dictionaries";
import { locales, type Locale } from "@/i18n/config";

export async function generateStaticParams() {
  const params: { lang: Locale; slug: string }[] = [];
  for (const lang of locales) {
    const products = await getProducts(lang);
    for (const p of products) params.push({ lang, slug: p.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = (await params) as { lang: Locale; slug: string };
  const product = await getProductBySlug(slug, lang);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = (await params) as { lang: Locale; slug: string };
  const dict = getDictionary(lang);
  const product = await getProductBySlug(slug, lang);
  if (!product) notFound();

  const [related, productFarm] = await Promise.all([
    getRelatedProducts(product, lang),
    getFarmById(product.farmId, lang),
  ]);

  const category = PRODUCT_CATEGORIES.find((c) => c.value === product.category);
  const t = dict.marketplace;

  return (
    <Container className="py-14">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <PlaceholderImage
          seed={product.id}
          emoji={category?.emoji ?? "🌿"}
          photo={PRODUCT_IMAGES[product.slug]}
          className="aspect-square w-full"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-primary-600">
            {category ? t.categories[category.value] : ""}
          </p>
          <h1 className="mt-1 font-serif text-3xl font-semibold text-primary-950">{product.name}</h1>

          <div className="mt-3 flex items-center gap-4">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            {!product.inStock && (
              <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
                {t.outOfStock}
              </span>
            )}
          </div>

          <p className="mt-6 text-2xl font-semibold text-primary-900">{formatSom(product.price, lang)}</p>
          <p className="mt-4 text-primary-900/80">{product.description}</p>

          <div className="mt-6 rounded-xl border border-primary-100 bg-primary-50/60 p-4">
            <h3 className="text-sm font-semibold text-primary-950">{t.productPage.careInstructions}</h3>
            <p className="mt-1 text-sm text-primary-800/80">{product.careInstructions}</p>
          </div>

          <div className="mt-8">
            <AddToCartButton productId={product.id} inStock={product.inStock} />
          </div>

          {productFarm && (
            <Link
              href={`/marketplace/farms/${productFarm.slug}`}
              className="mt-8 flex items-center gap-3 rounded-xl border border-primary-100 p-4 transition-colors hover:bg-primary-50"
            >
              <PlaceholderImage
                seed={productFarm.id}
                emoji="🏡"
                photo={FARM_IMAGES[productFarm.slug]}
                className="h-12 w-12 flex-shrink-0"
                sizes="48px"
              />
              <div>
                <p className="text-xs text-primary-800/60">{t.productPage.soldBy}</p>
                <p className="font-medium text-primary-950">{productFarm.name}</p>
              </div>
            </Link>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-serif text-2xl font-semibold text-primary-950">{t.productPage.relatedProducts}</h2>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} dict={t} lang={lang} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
