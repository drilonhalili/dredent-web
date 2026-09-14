"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { useI18n } from "@/components/i18n-provider";
import { googleReviews } from "@/data/site-config";

// Points at the clinic's Google reviews instead of quoting any. Google's own policies
// and the dental advertising rules make invented or hand-picked testimonials a risk,
// and every review on the listing is verifiably from a patient. Links: `googleReviews`
// in data/site-config.ts; copy: dictionary `testimonials`.
export function Testimonials() {
  const { t } = useI18n();

  return (
    <section id="stories" className="bg-porcelain-2 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-12 grid gap-8 rounded-3xl border border-mist bg-porcelain p-8 sm:p-10 md:grid-cols-[auto_1fr] md:items-center md:gap-12"
        >
          <div className="flex flex-col items-start gap-2 md:pr-12 md:border-r md:border-mist">
            <p className="font-display text-6xl font-semibold leading-none text-ink">{googleReviews.rating}</p>
            <div className="flex gap-0.5 text-shade" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">{t.testimonials.ratingLabel}</p>
          </div>

          <div>
            <p className="text-balance text-lg leading-relaxed text-ink-soft">{t.testimonials.body}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <ButtonLink href={googleReviews.read}>
                {t.testimonials.readCta}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              {googleReviews.write && (
                <ButtonLink href={googleReviews.write} variant="outline">
                  {t.testimonials.writeCta}
                </ButtonLink>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
