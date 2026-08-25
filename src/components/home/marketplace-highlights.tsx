import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/button";
import { ProductCard } from "@/components/marketplace/product-card";
import { FarmCard } from "@/components/marketplace/farm-card";
import { getFeaturedFarms, getProducts } from "@/lib/data";

export async function MarketplaceHighlights() {
  const [farms, products] = await Promise.all([getFeaturedFarms(), getProducts()]);

  return (
    <section className="bg-primary-50/60 py-16 sm:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Plant Marketplace"
            title="Supporting local farms. Delivering green to your home."
            description="Browse flowers, decorative trees, fruit trees, and ornamental plants from vetted, independent farm brands."
          />
          <LinkButton href="/marketplace" variant="outline">
            Browse Marketplace
          </LinkButton>
        </div>

        <div className="mt-12">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary-600">
            Featured Farm Brands
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {farms.slice(0, 3).map((farm) => (
              <FarmCard key={farm.id} farm={farm} />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary-600">
            Popular Products
          </h3>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
