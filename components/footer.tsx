import Link from "next/link";
import { Link2, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import type { Dictionary } from "@/data/locales";
import { business, credits, curatorFeed, nav, services } from "@/data/site-config";
import { fill, localePath, type Locale } from "@/lib/i18n";

const LEGAL_LINKS = ["privacy", "terms", "cookies"] as const;

// Server component: receives the dictionary from the page rather than the client context.
export function Footer({ t, locale }: { t: Dictionary; locale: Locale }) {
  const home = localePath(locale);

  return (
    <footer className="bg-cusp-deep pb-8 pt-16 text-mist">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href={localePath(locale, "#top")} className="flex items-center gap-2.5 font-display text-lg font-semibold text-porcelain">
              <svg width="24" height="24" viewBox="0 0 64 64" aria-hidden="true">
                <rect width="64" height="64" rx="16" fill="#F3F5F1" />
                <path
                  d="M32 13c11 0 14.5 11 14.5 19S43 51 32 51 17.5 40 17.5 32 21 13 32 13Z"
                  fill="#142F2A"
                />
                <circle cx="37.5" cy="22.5" r="3.4" fill="#C89448" />
              </svg>
              {business.name}
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist/80">{t.descriptionShort}</p>
            <div className="mt-5 flex gap-3">
              <a
                href={business.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-mist/30 font-mono text-[0.6rem] font-semibold text-mist transition-colors hover:border-shade hover:text-shade"
              >
                IG
              </a>
              <a
                href={business.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-mist/30 text-mist transition-colors hover:border-shade hover:text-shade"
              >
                <Link2 className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-mist/60">{t.footer.explore}</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.id}>
                  <a href={localePath(locale, item.hash)} className="text-sm text-mist/90 transition-colors hover:text-shade">
                    {t.nav[item.id]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-mist/60">{t.footer.services}</p>
            <ul className="mt-4 space-y-2.5">
              {services.slice(0, 5).map((s) => (
                <li key={s.id} className="text-sm text-mist/90">
                  {t.services.items[s.id].title}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-mist/60">{t.footer.visit}</p>
            <ul className="mt-4 space-y-3 text-sm text-mist/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-shade" aria-hidden="true" />
                <span>
                  {t.address.line1}
                  <br />
                  {t.address.line2}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-shade" aria-hidden="true" />
                <a href={business.phoneHref} className="hover:text-shade">
                  {business.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-mist/20 pt-6 font-mono text-xs text-mist/60 lg:flex-row lg:items-center lg:justify-between">
          {/* suppressHydrationWarning: the year is baked in at build time; when a
              visitor's clock has rolled into a new year the client corrects it
              without tripping a hydration error. */}
          <p suppressHydrationWarning>
            {fill(t.footer.rights, { year: new Date().getFullYear(), name: business.name })}
          </p>
          <nav aria-label={t.legal.eyebrow} className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((slug) => (
              <Link key={slug} href={`${home}${slug}/`} className="transition-colors hover:text-shade">
                {t.legal[slug].title}
              </Link>
            ))}
            {curatorFeed.feedId && (
              <CookieSettingsButton className="cursor-pointer transition-colors hover:text-shade">
                {t.consent.settings}
              </CookieSettingsButton>
            )}
          </nav>
          {credits.href ? (
            <a href={credits.href} className="transition-colors hover:text-shade">
              {t.footer.developedBy}
            </a>
          ) : (
            <span>{t.footer.developedBy}</span>
          )}
        </div>
      </Container>
    </footer>
  );
}
