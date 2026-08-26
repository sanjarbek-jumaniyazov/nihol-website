import { Leaf, Mail, Phone, MessageCircle } from "lucide-react";
import { Link } from "@/components/ui/localized-link";
import type { Dictionary } from "@/i18n/dictionaries";

export default function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-primary-100 bg-primary-950 text-primary-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2 font-serif text-xl font-semibold text-white">
            <Leaf className="h-6 w-6 text-primary-300" />
            Nihol
          </div>
          <p className="mt-3 text-sm text-primary-200">{dict.footer.tagline}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-300">{dict.footer.exploreHeading}</h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-200">
            <li><Link href="/paulownia" className="hover:text-white">{dict.nav.paulownia}</Link></li>
            <li><Link href="/marketplace" className="hover:text-white">{dict.nav.marketplace}</Link></li>
            <li><Link href="/about" className="hover:text-white">{dict.footer.aboutUs}</Link></li>
            <li><Link href="/contact" className="hover:text-white">{dict.footer.contactAndSupport}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-300">{dict.footer.forFarmsHeading}</h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-200">
            <li><Link href="/marketplace#sell-with-us" className="hover:text-white">{dict.footer.sellWithUs}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-300">{dict.footer.contactHeading}</h3>
          <ul className="mt-4 space-y-3 text-sm text-primary-200">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary-300" /> hello@nihol.uz
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary-300" /> +998 90 123 45 67
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary-300" /> {dict.footer.whatsappAvailable}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-900 px-4 py-6 text-center text-xs text-primary-300 sm:px-6 lg:px-8">
        {dict.footer.copyright.replace("{year}", String(new Date().getFullYear()))}{" "}
        <Link href="/credits" className="underline hover:text-white">
          {dict.footer.photoCredits}
        </Link>
      </div>
    </footer>
  );
}
