import { Star } from "lucide-react";

export function StarRating({ rating, reviewCount }: { rating: number; reviewCount?: number }) {
  return (
    <div className="flex items-center gap-1 text-sm text-primary-900/70">
      <Star className="h-4 w-4 fill-accent-400 text-accent-400" />
      <span className="font-medium">{rating.toFixed(1)}</span>
      {typeof reviewCount === "number" && <span>({reviewCount})</span>}
    </div>
  );
}
