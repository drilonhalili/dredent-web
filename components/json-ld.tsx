import { getDictionary } from "@/data/locales";
import { business, mapLinks, seo } from "@/data/site-config";
import { localePath, type Locale } from "@/lib/i18n";

/**
 * Structured data for local SEO, rendered once per locale page in the language
 * of that page. Two schema blocks:
 *  - Dentist (a LocalBusiness subtype) with NAP, geo, hours — powers the Knowledge
 *    Panel / map pack eligibility in Google.
 *  - FAQPage — makes the FAQ section eligible for FAQ rich results.
 * Rendered as a plain <script> tag so it's static-export friendly (no client JS needed).
 */
export function JsonLd({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const dentistSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: business.name,
    description: t.seo.description,
    url: `${seo.siteUrl}${localePath(locale)}`,
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: t.address.line1,
      addressLocality: "Tetovo",
      postalCode: "1200",
      addressCountry: "MK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    // Keep in sync with business.hours in data/site-config.ts. Sunday is closed,
    // which schema.org expresses by omission.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "15:00",
      },
    ],
    hasMap: mapLinks.view,
    sameAs: [business.social.instagram, business.social.facebook],
    priceRange: "$$",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
