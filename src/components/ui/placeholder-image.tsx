import { cn } from "@/lib/utils";

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
}

/** Gradient + emoji stand-in used everywhere real product/farm photography will go. */
export function PlaceholderImage({ seed, emoji, label, className }: PlaceholderImageProps) {
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
