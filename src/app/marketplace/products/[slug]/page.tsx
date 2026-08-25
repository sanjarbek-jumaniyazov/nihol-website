import type { Metadata } from "next";
import Link from "next/link";
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

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [related, productFarm] = await Promise.all([
    getRelatedProducts(product),
    getFarmById(product.farmId),
  ]);

  const category = PRODUCT_CATEGORIES.find((c) => c.value === product.category);

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
          <p className="text-sm font-medium uppercase tracking-wide text-primary-600">{category?.label}</p>
          <h1 className="mt-1 font-serif text-3xl font-semibold text-primary-950">{product.name}</h1>

          <div className="mt-3 flex items-center gap-4">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            {!product.inStock && (
              <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
                Out of stock
              </span>
            )}
          </div>

          <p className="mt-6 text-2xl font-semibold text-primary-900">{formatSom(product.price)}</p>
          <p className="mt-4 text-primary-900/80">{product.description}</p>

          <div className="mt-6 rounded-xl border border-primary-100 bg-primary-50/60 p-4">
            <h3 className="text-sm font-semibold text-primary-950">Care instructions</h3>
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
                <p className="text-xs text-primary-800/60">Sold by</p>
                <p className="font-medium text-primary-950">{productFarm.name}</p>
              </div>
            </Link>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-serif text-2xl font-semibold text-primary-950">Related products</h2>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
