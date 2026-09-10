import type { Metadata } from "next";
import type { LegalDocument } from "@/data/locales/types";
import { defaultLocale, localePath, locales, type Locale } from "@/lib/i18n";

/** canonical + hreflang set for one path (`subpath` relative to the locale root, e.g. "terms/"). */
export function alternatesFor(locale: Locale, subpath = ""): NonNullable<Metadata["alternates"]> {
  const languages = Object.fromEntries(locales.map((l) => [l, `${localePath(l)}${subpath}`]));
  return {
    canonical: `${localePath(locale)}${subpath}`,
    languages: { ...languages, "x-default": `${localePath(defaultLocale)}${subpath}` },
  };
}

export function legalMetadata(locale: Locale, slug: string, doc: LegalDocument): Metadata {
  return {
    title: doc.title,
    description: doc.description,
    alternates: alternatesFor(locale, `${slug}/`),
    openGraph: {
      title: doc.title,
      description: doc.description,
      url: `${localePath(locale)}${slug}/`,
      type: "article",
    },
  };
}
