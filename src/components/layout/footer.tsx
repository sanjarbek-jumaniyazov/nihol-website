import Link from "next/link";
import { Leaf, Mail, Phone, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-primary-100 bg-primary-950 text-primary-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2 font-serif text-xl font-semibold text-white">
            <Leaf className="h-6 w-6 text-primary-300" />
            Nihol
          </div>
          <p className="mt-3 text-sm text-primary-200">
            Sustainable Paulownia investment and a marketplace for independent local farm brands.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-300">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-200">
            <li><Link href="/paulownia" className="hover:text-white">Paulownia Investment</Link></li>
            <li><Link href="/marketplace" className="hover:text-white">Marketplace</Link></li>
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact & Support</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-300">For Farms</h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-200">
            <li><Link href="/marketplace#sell-with-us" className="hover:text-white">Sell Your Products Here</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-300">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-primary-200">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary-300" /> hello@nihol.uz
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary-300" /> +998 90 123 45 67
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary-300" /> WhatsApp available
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-900 px-4 py-6 text-center text-xs text-primary-300 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Nihol. All rights reserved. Placeholder contact details — replace with real company info.
      </div>
    </footer>
  );
}
