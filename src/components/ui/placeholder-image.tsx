import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PhotoSource } from "@/lib/images";

const PALETTES = [
  "from-primary-200 via-primary-300 to-primary-500",
  "from-accent-100 via-accent-200 to-accent-400",
  "from-primary-100 via-primary-200 to-accent-300",
  "from-accent-200 via-primary-200 to-primary-400",
];

function paletteFor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return PALETTES[hash % PALETTES.length];
}

interface PlaceholderImageProps {
  seed: string;
  emoji: string;
  label?: string;
  className?: string;
  /** Real photo to render instead of the gradient+emoji stand-in. */
  photo?: PhotoSource;
  priority?: boolean;
  sizes?: string;
}

/**
 * Renders a real photo (with a small attribution caption, as its license
 * requires) when `photo` is supplied. Otherwise falls back to a gradient +
 * emoji stand-in for anything without curated real photography yet.
 */
export function PlaceholderImage({
  seed,
  emoji,
  label,
  className,
  photo,
  priority,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
}: PlaceholderImageProps) {
  if (photo) {
    return (
      <div className={cn("relative overflow-hidden rounded-2xl bg-primary-100", className)}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        <span className="absolute bottom-1.5 right-1.5 rounded bg-black/45 px-1.5 py-0.5 text-[10px] leading-none text-white/90">
          📷 {photo.credit.author}
        </span>
        {label && <span className="sr-only">{label}</span>}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br",
        paletteFor(seed),
        className
      )}
    >
      <span className="drop-shadow-sm text-5xl" aria-hidden>
        {emoji}
      </span>
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
}
