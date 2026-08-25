import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">{eyebrow}</p>
      )}
      <h2 className="font-serif text-3xl font-semibold tracking-tight text-primary-950 sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-lg text-primary-800/80">{description}</p>}
    </div>
  );
}
