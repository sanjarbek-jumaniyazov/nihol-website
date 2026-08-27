import { ChevronLeft } from "lucide-react";
import { Link } from "@/components/ui/localized-link";

/** Shared "‹ Title" header for account/grove subpages, matching the prototype's back-nav pattern. */
export function BackHeader({ title, backHref, meta }: { title: string; backHref: string; meta?: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-hairline bg-white px-4 py-5 sm:px-6">
      <Link
        href={backHref}
        aria-label="Back"
        className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-panel text-primary-700"
      >
        <ChevronLeft className="h-5 w-5" />
      </Link>
      <div>
        <h1 className="font-serif text-xl text-ink sm:text-2xl">{title}</h1>
        {meta && <p className="mt-0.5 font-mono text-xs text-label">{meta}</p>}
      </div>
    </div>
  );
}
