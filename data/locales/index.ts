import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "./types";
import { en } from "./en";
import { mk } from "./mk";
import { sq } from "./sq";

const dictionaries: Record<Locale, Dictionary> = { sq, en, mk };

// Server-side only (layout, page, metadata, JSON-LD). Client components read the
// dictionary through <I18nProvider> instead, so only one language ships to the browser.
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary } from "./types";
