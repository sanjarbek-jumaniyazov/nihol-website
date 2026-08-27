import { cn } from "@/lib/utils";

/** Small stat block — uppercase mono label over a large serif figure. Used in stat rows/hero cards. */
export function StatTile({
  label,
  value,
  tone = "light",
  className,
}: {
  label: string;
  value: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex-1 rounded-2xl px-3.5 py-3",
        tone === "dark" ? "bg-white/12" : "bg-panel",
        className
      )}
    >
      <div
        className={cn(
          "font-mono text-[10px] font-medium uppercase tracking-[0.1em]",
          tone === "dark" ? "text-white/60" : "text-label"
        )}
      >
        {label}
      </div>
      <div
        className={cn(
          "mt-1.5 font-serif text-2xl leading-none",
          tone === "dark" ? "text-white" : "text-ink"
        )}
      >
        {value}
      </div>
    </div>
  );
}
