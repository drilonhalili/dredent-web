import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal-page";
import { getDictionary } from "@/data/locales";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";
import { legalMetadata } from "@/lib/seo";

// /<locale>/terms/, /<locale>/privacy/, /<locale>/cookies/ — same English slugs in
// every language, linked together by hreflang. Copy: dictionary `legal`.
const LEGAL_SLUGS = ["terms", "privacy", "cookies"] as const;
type LegalSlug = (typeof LEGAL_SLUGS)[number];

function isLegalSlug(value: string): value is LegalSlug {
  return (LEGAL_SLUGS as readonly string[]).includes(value);
}

type Props = { params: Promise<{ locale: string; legal: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) => LEGAL_SLUGS.map((legal) => ({ locale, legal })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, legal } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  if (!isLegalSlug(legal)) return {};
  const t = getDictionary(locale);
  return legalMetadata(locale, legal, t.legal[legal], t.tagline);
}

export default async function LegalRoute({ params }: Props) {
  const { locale: rawLocale, legal } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  if (!isLegalSlug(legal)) notFound();
  const t = getDictionary(locale);
  return <LegalPage locale={locale} t={t} doc={t.legal[legal]} slug={legal} />;
}
