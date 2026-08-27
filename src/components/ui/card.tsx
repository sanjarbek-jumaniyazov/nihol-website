import { cn } from "@/lib/utils";

/** Rounded white card with a hairline border — the base surface used throughout the redesign. */
export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-2xl border border-hairline bg-white", className)}
      {...props}
    >
      {children}
    </div>
  );
}
