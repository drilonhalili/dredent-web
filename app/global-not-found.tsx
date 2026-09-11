import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { fontClassName } from "@/app/fonts";
import { getDictionary } from "@/data/locales";
import { business } from "@/data/site-config";
import { defaultLocale, localePath, locales } from "@/lib/i18n";
import "./globals.css";

// Exported as out/404.html and served by the host for any unknown URL. The URL tells
// us nothing reliable about the visitor's language, so the page speaks the default
// language first and offers the other two below. Copy: dictionary `notFound`.
export const metadata: Metadata = {
  title: `${getDictionary(defaultLocale).notFound.title} | ${business.name}`,
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  const primary = getDictionary(defaultLocale).notFound;
  const others = locales.filter((locale) => locale !== defaultLocale);

  return (
    <html lang={defaultLocale} className={fontClassName}>
      <body>
        <main id="main" className="flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.28em] text-cusp">404</p>
          <h1 className="mt-4 text-balance font-display text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl md:text-[2.75rem]">
            {primary.title}
          </h1>
          <p className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-ink-soft">{primary.body}</p>
          <a
            href={localePath(defaultLocale)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cusp px-6 py-3 text-sm font-semibold text-porcelain transition-colors duration-200 hover:bg-cusp-deep"
          >
            {primary.home}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>

          <ul className="mt-14 space-y-3 border-t border-mist pt-8 text-sm text-ink-soft">
            {others.map((locale) => {
              const t = getDictionary(locale).notFound;
              return (
                <li key={locale} lang={locale}>
                  {t.title}.{" "}
                  <a href={localePath(locale)} className="font-medium text-cusp underline-offset-4 hover:underline">
                    {t.home}
                  </a>
                </li>
              );
            })}
          </ul>
        </main>
      </body>
    </html>
  );
}
