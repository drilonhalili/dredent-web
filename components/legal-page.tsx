import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import type { Dictionary, LegalDocument } from "@/data/locales";
import { business, seo } from "@/data/site-config";
import { localePath, type Locale } from "@/lib/i18n";

export function LegalPage({
  locale,
  t,
  doc,
  slug,
}: {
  locale: Locale;
  t: Dictionary;
  doc: LegalDocument;
  slug: string;
}) {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: business.name, item: `${seo.siteUrl}${localePath(locale)}` },
      { "@type": "ListItem", position: 2, name: doc.title, item: `${seo.siteUrl}${localePath(locale)}${slug}/` },
    ],
  };

  return (
    <>
      <Navbar />
      <main id="main" className="pb-20 pt-28 sm:pb-28 sm:pt-36">
        <Container className="max-w-3xl">
          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.28em] text-cusp">
            {t.legal.eyebrow}
          </p>
          <h1 className="mt-3 text-balance font-display text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl md:text-[2.75rem]">
            {doc.title}
          </h1>
          <p className="mt-3 font-mono text-xs uppercase tracking-wide text-ink-soft">
            {t.legal.updated}: {doc.updated}
          </p>
          <p className="mt-6 text-balance text-lg leading-relaxed text-ink-soft">{doc.intro}</p>

          <div className="mt-10 space-y-10">
            {doc.sections.map((section, i) => (
              <section key={section.heading} aria-labelledby={`legal-section-${i}`}>
                <h2 id={`legal-section-${i}`} className="font-display text-xl font-semibold text-ink sm:text-2xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 leading-relaxed text-ink-soft">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-ink-soft marker:text-shade">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <Link
            href={localePath(locale)}
            className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-cusp transition-colors hover:text-cusp-deep"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t.legal.backHome}
          </Link>
        </Container>
      </main>
      <Footer t={t} locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    </>
  );
}
