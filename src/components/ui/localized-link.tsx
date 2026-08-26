"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLocale, withLocale } from "@/i18n/locale-context";

type Props = ComponentProps<typeof NextLink>;

/** Drop-in replacement for next/link's Link that prefixes internal hrefs with the current locale. */
export function Link({ href, ...rest }: Props) {
  const locale = useLocale();
  const localizedHref = typeof href === "string" ? withLocale(href, locale) : href;
  return <NextLink href={localizedHref} {...rest} />;
}

export default Link;
