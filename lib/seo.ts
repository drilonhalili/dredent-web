import type { Metadata } from "next";
import type { LegalDocument } from "@/data/locales/types";
import { business } from "@/data/site-config";
import { defaultLocale, localePath, locales, type Locale } from "@/lib/i18n";

/** canonical + hreflang set for one path (`subpath` relative to the locale root, e.g. "terms/"). */
export function alternatesFor(locale: Locale, subpath = ""): NonNullable<Metadata["alternates"]> {
  const languages = Object.fromEntries(locales.map((l) => [l, `${localePath(l)}${subpath}`]));
  return {
    canonical: `${localePath(locale)}${subpath}`,
    languages: { ...languages, "x-default": `${localePath(defaultLocale)}${subpath}` },
  };
}

/**
 * The per-language social preview card, rendered at build time by
 * app/[locale]/og.png/route.tsx. A route handler rather than the opengraph-image file
 * convention so the exported file has a .png extension: static hosts pick the
 * Content-Type from the extension, and an extensionless file is served as
 * application/octet-stream, which some link scrapers refuse.
 */
export const ogImageSize = { width: 1200, height: 630 } as const;
export function ogImageFor(locale: Locale, tagline: string) {
  return { url: `${localePath(locale)}og.png`, ...ogImageSize, alt: `${business.name} — ${tagline}` };
}

export function legalMetadata(locale: Locale, slug: string, doc: LegalDocument, tagline: string): Metadata {
  const image = ogImageFor(locale, tagline);
  return {
    title: doc.title,
    description: doc.description,
    alternates: alternatesFor(locale, `${slug}/`),
    openGraph: {
      title: doc.title,
      description: doc.description,
      url: `${localePath(locale)}${slug}/`,
      type: "article",
      images: [image],
    },
    twitter: { card: "summary_large_image", title: doc.title, description: doc.description, images: [image] },
  };
}
