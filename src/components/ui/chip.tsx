import { cn } from "@/lib/utils";

/** Pill-shaped filter/category toggle. */
export function Chip({
  active,
  className,
  children,
  ...props
}: { active?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "flex-none whitespace-nowrap rounded-full border px-3.5 py-2 font-sans text-xs font-semibold transition-colors",
        active
          ? "border-primary-700 bg-primary-700 text-white"
          : "border-hairline bg-white text-ink hover:border-primary-300",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
