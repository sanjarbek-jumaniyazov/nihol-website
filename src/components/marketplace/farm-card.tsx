import Link from "next/link";
import { MapPin } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { StarRating } from "@/components/ui/star-rating";
import type { Farm } from "@/lib/types";

export function FarmCard({ farm }: { farm: Farm }) {
  return (
    <Link
      href={`/marketplace/farms/${farm.slug}`}
      className="group block overflow-hidden rounded-2xl border border-primary-100 bg-white transition-shadow hover:shadow-lg"
    >
      <PlaceholderImage seed={farm.id} emoji="🏡" className="aspect-[16/9] w-full rounded-none" />
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-primary-950 group-hover:text-primary-700">
          {farm.name}
        </h3>
        <p className="mt-1 text-sm text-primary-800/70">{farm.tagline}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="flex items-center gap-1 text-sm text-primary-800/70">
            <MapPin className="h-4 w-4" /> {farm.location}
          </span>
          <StarRating rating={farm.rating} reviewCount={farm.reviewCount} />
        </div>
      </div>
    </Link>
  );
}
