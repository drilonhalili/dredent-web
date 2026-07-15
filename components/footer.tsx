import { Link2, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { business, nav, services } from "@/data/site-config";

export function Footer() {
  return (
    <footer className="bg-cusp-deep pb-8 pt-16 text-mist">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#top" className="flex items-center gap-2.5 font-display text-lg font-semibold text-porcelain">
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
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist/80">
              {business.descriptionShort}
            </p>
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
            <p className="font-mono text-xs uppercase tracking-widest text-mist/60">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-mist/90 transition-colors hover:text-shade">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-mist/60">Services</p>
            <ul className="mt-4 space-y-2.5">
              {services.slice(0, 5).map((s) => (
                <li key={s.title} className="text-sm text-mist/90">
                  {s.title}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-mist/60">Visit</p>
            <ul className="mt-4 space-y-3 text-sm text-mist/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-shade" aria-hidden="true" />
                <span>
                  {business.address.line1}
                  <br />
                  {business.address.line2}
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

        <div className="mt-14 flex flex-col gap-4 border-t border-mist/20 pt-6 font-mono text-xs text-mist/60 sm:flex-row sm:items-center sm:justify-between">
          {/* suppressHydrationWarning: the year is baked in at build time; when a
              visitor's clock has rolled into a new year the client corrects it
              without tripping a hydration error. */}
          <p suppressHydrationWarning>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          {/* TODO: point at the Coonwerks site once it has a URL. */}
          <a href="" className="transition-colors hover:text-shade">
            Developed by Coonwerks
          </a>
        </div>
      </Container>
    </footer>
  );
}
