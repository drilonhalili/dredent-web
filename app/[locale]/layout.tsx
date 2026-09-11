import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { fontClassName } from "@/app/fonts";
import { CookieBanner } from "@/components/cookie-banner";
import { I18nProvider } from "@/components/i18n-provider";
import { ScrollBehavior } from "@/components/scroll-behavior";
import { getDictionary } from "@/data/locales";
import { business, curatorFeed, seo } from "@/data/site-config";
import { defaultLocale, isLocale, localePath, locales, ogLocales } from "@/lib/i18n";
import { ogImageFor } from "@/lib/seo";
import "../globals.css";

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

// Every locale is pre-rendered at /<locale>/ by the static export; nothing else is.
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const t = getDictionary(locale);
  const languages = Object.fromEntries(locales.map((l) => [l, localePath(l)]));
  const image = ogImageFor(locale, t.tagline);

  return {
    metadataBase: new URL(seo.siteUrl),
    title: {
      default: t.seo.title,
      template: `%s | ${business.name}`,
    },
    description: t.seo.description,
    keywords: [...t.seo.keywords],
    authors: [{ name: business.name }],
    alternates: {
      canonical: localePath(locale),
      languages: { ...languages, "x-default": localePath(defaultLocale) },
    },
    openGraph: {
      title: t.seo.title,
      description: t.seo.description,
      url: localePath(locale),
      siteName: business.name,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.title,
      description: t.seo.description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#142f2a",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const t = getDictionary(locale);

  return (
    <html
      lang={locale}
      // Removed by <ScrollBehavior /> once the page has loaded; see globals.css.
      data-loading=""
      className={fontClassName}
    >
      <body>
        <a
          href="#main"
          className="fixed left-2 top-2 z-[100] -translate-y-16 rounded bg-cusp px-4 py-2 font-medium text-porcelain transition-transform focus-visible:translate-y-0"
        >
          {t.a11y.skipToContent}
        </a>
        <I18nProvider locale={locale} dictionary={t}>
          {children}
          {/* The only third-party embed is the Instagram feed, so the banner exists only when it is enabled. */}
          {curatorFeed.feedId && <CookieBanner />}
        </I18nProvider>
        <ScrollBehavior />
      </body>
    </html>
  );
}
