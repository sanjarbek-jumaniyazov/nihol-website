import { Link } from "@/components/ui/localized-link";
import { StatTile } from "@/components/ui/stat-tile";
import { getMyTrees } from "@/lib/data";
import type { Customer } from "@/lib/auth";
import type { Dictionary } from "@/i18n/dictionaries";

/** Personalized hero strip shown instead of the marketing hero once a real customer session exists. */
export async function SignedInStrip({ customer, dict }: { customer: Customer; dict: Dictionary }) {
  const trees = await getMyTrees(customer.id);
  const co2 = trees.length * 500;
  const firstName = customer.fullName.split(" ")[0] || customer.email;

  return (
    <div className="bg-gradient-to-br from-primary-700 to-primary-600 px-4 pb-7 pt-10 text-white sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-widest text-white/65">
          {dict.home.hero.greeting}, {firstName.toUpperCase()}
        </p>
        <h1 className="mt-1.5 font-serif text-2xl sm:text-3xl">{dict.home.hero.groveGrowing}</h1>

        <div className="mt-5 flex gap-2.5">
          <StatTile tone="dark" label="My trees" value={trees.length} />
          <StatTile tone="dark" label="Projected" value={`$${trees.length * 400}`} />
          <StatTile tone="dark" label="CO₂ saved" value={`${(co2 / 1000).toFixed(1)}t`} />
        </div>

        <div className="mt-5 flex gap-2.5">
          <Link href="/grove" className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-primary-700">
            {dict.nav.grove}
          </Link>
          <Link href="/marketplace" className="rounded-xl bg-white/14 px-4 py-2.5 text-sm font-semibold text-white">
            {dict.nav.market}
          </Link>
        </div>
      </div>
    </div>
  );
}
