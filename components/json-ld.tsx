import { business, faqs, mapLinks, seo } from "@/data/site-config";

/**
 * Structured data for local SEO. Two schema blocks:
 *  - Dentist (a LocalBusiness subtype) with NAP, geo, hours — powers the Knowledge
 *    Panel / map pack eligibility in Google.
 *  - FAQPage — makes the FAQ section eligible for FAQ rich results.
 * Rendered as a plain <script> tag so it's static-export friendly (no client JS needed).
 */
export function JsonLd() {
  const dentistSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: business.name,
    description: seo.description,
    url: seo.siteUrl,
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.line1,
      addressLocality: "Tetovo",
      postalCode: "1200",
      addressCountry: "MK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    // Keep in sync with business.hours in data/site-config.ts. Google confirms only
    // "Closes 6 PM" — the 08:00 opening time is assumed, verify before launch.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    hasMap: mapLinks.view,
    sameAs: [business.social.instagram, business.social.facebook],
    priceRange: "$$",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
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
