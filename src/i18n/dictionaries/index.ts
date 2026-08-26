import type { Locale } from "../config";
import en from "./en";
import ru from "./ru";
import uz from "./uz";

export type { Dictionary } from "./en";

const dictionaries = { en, ru, uz };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
