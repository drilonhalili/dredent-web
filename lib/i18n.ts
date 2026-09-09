// Locale routing constants. Kept free of dictionary imports so client components
// (language switcher, provider) can import it without pulling every language's
// copy into the browser bundle — the dictionaries live in data/locales/.

export const locales = ["sq", "en", "mk"] as const;
export type Locale = (typeof locales)[number];

// The language `/` redirects to, and the hreflang x-default. Change it here and
// nothing else needs to move: every locale is always served at /<locale>/.
export const defaultLocale: Locale = "sq";

export const localeNames: Record<Locale, string> = {
  sq: "Shqip",
  en: "English",
  mk: "Македонски",
};

// Open Graph `og:locale` values (language_TERRITORY).
export const ogLocales: Record<Locale, string> = {
  sq: "sq_AL",
  en: "en_US",
  mk: "mk_MK",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localePath(locale: Locale, hash = "") {
  return `/${locale}/${hash}`;
}

/** Replace `{name}` placeholders in a dictionary string. */
export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}
