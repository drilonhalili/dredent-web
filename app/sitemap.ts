import type { MetadataRoute } from "next";
import { seo } from "@/data/site-config";
import { defaultLocale, localePath, locales } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${seo.siteUrl}${localePath(locale)}`]),
  );

  return locales.map((locale) => ({
    url: `${seo.siteUrl}${localePath(locale)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === defaultLocale ? 1 : 0.9,
    alternates: { languages },
  }));
}
