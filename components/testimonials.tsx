"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/components/i18n-provider";

// ⚠️ The quotes are SAMPLE CONTENT — see the note above `testimonials` in
// data/locales/en.ts before launch.
export function Testimonials() {
  const { t } = useI18n();

  return (
    <section id="stories" className="bg-porcelain-2 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {t.testimonials.items.map((item, i) => (
            <motion.figure
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col rounded-2xl border border-mist bg-porcelain p-7"
            >
              <div className="flex gap-0.5 text-shade" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-balance leading-relaxed text-ink">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 font-mono text-xs uppercase tracking-wide text-ink-soft">
                {item.name} · {item.context}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
