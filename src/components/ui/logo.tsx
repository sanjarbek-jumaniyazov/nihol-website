import Image from "next/image";
import { cn } from "@/lib/utils";

/** The Nihol brand mark — used everywhere the logo appears (header, footer, admin, auth screens). */
export function Logo({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/images/nihol-logo.png"
      alt="Nihol"
      width={size}
      height={size}
      className={cn("flex-none", className)}
      priority
    />
  );
}
