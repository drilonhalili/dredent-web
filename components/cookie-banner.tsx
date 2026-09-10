"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { closeConsentDialog, useConsentState, writeConsent } from "@/lib/consent";
import { localePath } from "@/lib/i18n";

// Shown until the visitor has made a choice (or when re-opened from the footer).
// Both choices are one click; "only necessary" is the default state of the site.
export function CookieBanner() {
  const { locale, t } = useI18n();
  const { ready, consent, dialogOpen } = useConsentState();
  const visible = ready && (consent === null || dialogOpen);

  useEffect(() => {
    if (!visible || !dialogOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeConsentDialog();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, dialogOpen]);

  if (!visible) return null;

  return (
    <section
      role="region"
      aria-label={t.consent.region}
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-5"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-mist bg-porcelain p-5 shadow-[0_18px_60px_-20px_rgba(18,33,29,0.35)] sm:flex-row sm:items-center sm:gap-6">
        <div className="flex items-start gap-3 sm:flex-1">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-shade" aria-hidden="true" />
          <div>
            <p className="font-display text-base font-semibold text-ink">{t.consent.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
              {t.consent.body}{" "}
              <Link
                href={`${localePath(locale)}cookies/`}
                className="underline decoration-mist underline-offset-2 transition-colors hover:text-cusp"
              >
                {t.consent.policy}
              </Link>
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col">
          <button
            type="button"
            onClick={() => writeConsent(true)}
            className="cursor-pointer rounded-full bg-cusp px-5 py-2.5 text-sm font-semibold text-porcelain transition-colors hover:bg-cusp-deep"
          >
            {t.consent.accept}
          </button>
          <button
            type="button"
            onClick={() => writeConsent(false)}
            className="cursor-pointer rounded-full border border-cusp/30 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-cusp/5"
          >
            {t.consent.reject}
          </button>
        </div>
      </div>
    </section>
  );
}
