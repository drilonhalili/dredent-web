import type { MetadataRoute } from "next";
import { seo } from "@/data/site-config";
import { defaultLocale, localePath, locales } from "@/lib/i18n";

export const dynamic = "force-static";

const LEGAL_SLUGS = ["terms", "privacy", "cookies"];

function alternatesFor(subpath: string) {
  return {
    languages: Object.fromEntries(
      locales.map((locale) => [locale, `${seo.siteUrl}${localePath(locale)}${subpath}`]),
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const home: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${seo.siteUrl}${localePath(locale)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: locale === defaultLocale ? 1 : 0.9,
    alternates: alternatesFor(""),
  }));
  const legal: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    LEGAL_SLUGS.map((slug) => ({
      url: `${seo.siteUrl}${localePath(locale)}${slug}/`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: alternatesFor(`${slug}/`),
    })),
  );
  return [...home, ...legal];
}
