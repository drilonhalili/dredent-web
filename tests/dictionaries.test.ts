import { describe, expect, it } from "vitest";
import { en } from "@/data/locales/en";
import { mk } from "@/data/locales/mk";
import { sq } from "@/data/locales/sq";
import { comparePairs, instagramPosts, nav, services } from "@/data/site-config";
import { locales } from "@/lib/i18n";

const dictionaries = { en, sq, mk } as const;

// Every key present in one language must exist in the others, with the same shape,
// so a missing translation fails here instead of rendering "undefined" in production.
function shape(value: unknown, path = ""): string[] {
  if (Array.isArray(value)) return [`${path}[]`];
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) => shape(v, path ? `${path}.${k}` : k));
  }
  return [`${path}:${typeof value}`];
}

describe("dictionaries", () => {
  it("cover every locale", () => {
    expect(Object.keys(dictionaries).sort()).toEqual([...locales].sort());
  });

  it("have identical key structure in every language", () => {
    const reference = shape(en).sort();
    for (const locale of locales) {
      expect(shape(dictionaries[locale]).sort(), `keys of ${locale}`).toEqual(reference);
    }
  });

  it("have a caption for every Instagram tile, copy for every service, case and nav item", () => {
    for (const locale of locales) {
      const t = dictionaries[locale];
      for (const post of instagramPosts) expect(t.instagram.captions[post.id], `${locale} caption ${post.id}`).toBeTruthy();
      for (const service of services) expect(t.services.items[service.id]?.title, `${locale} service ${service.id}`).toBeTruthy();
      for (const pair of comparePairs) expect(t.gallery.cases[pair.id]?.title, `${locale} case ${pair.id}`).toBeTruthy();
      for (const item of nav) expect(t.nav[item.id], `${locale} nav ${item.id}`).toBeTruthy();
    }
  });

  it("keep the same number of FAQ entries and legal sections in every language", () => {
    for (const locale of locales) {
      const t = dictionaries[locale];
      expect(t.faq.items.length, `${locale} faq`).toBe(en.faq.items.length);
      for (const doc of ["terms", "privacy", "cookies"] as const) {
        expect(t.legal[doc].sections.length, `${locale} ${doc}`).toBe(en.legal[doc].sections.length);
      }
    }
  });

  it("keep titles and descriptions within search-result limits", () => {
    for (const locale of locales) {
      const t = dictionaries[locale];
      expect(t.seo.title.length, `${locale} title`).toBeLessThanOrEqual(65);
      expect(t.seo.description.length, `${locale} description`).toBeLessThanOrEqual(160);
    }
  });
});
