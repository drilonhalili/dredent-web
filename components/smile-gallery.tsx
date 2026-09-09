"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CompareSlider } from "@/components/compare-slider";
import { useI18n } from "@/components/i18n-provider";
import { comparePairs } from "@/data/site-config";
import { fill } from "@/lib/i18n";
import { placeholderImage } from "@/lib/utils";

export function SmileGallery() {
  const { t } = useI18n();

  return (
    <section id="transformations" className="bg-cusp-deep py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t.gallery.eyebrow}
            title={t.gallery.title}
            subtitle={t.gallery.subtitle}
            tone="light"
          />
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {comparePairs.map((pair, i) => {
            const copy = t.gallery.cases[pair.id];
            return (
              <motion.div
                key={pair.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <CompareSlider
                  beforeSrc={pair.beforeSrc}
                  afterSrc={pair.afterSrc}
                  beforeFallbackSrc={placeholderImage(`${pair.id}-before`, 900, 675)}
                  afterFallbackSrc={placeholderImage(`${pair.id}-after`, 900, 675)}
                  beforeAlt={fill(t.a11y.beforeAlt, { title: copy.title })}
                  afterAlt={fill(t.a11y.afterAlt, { title: copy.title })}
                />
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold text-porcelain">{copy.title}</h3>
                </div>
                <p className="mt-1 font-mono text-xs uppercase tracking-wide text-mist/70">
                  {copy.procedure}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
