"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CompareSlider } from "@/components/compare-slider";
import { comparePairs } from "@/data/site-config";
import { placeholderImage } from "@/lib/utils";

export function SmileGallery() {
  return (
    <section id="transformations" className="bg-cusp-deep py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Real results"
            title="Drag to see the reveal"
            subtitle="Real treatment plans from our clinic, shown as our patients experienced them — drag to compare the before with the result."
            tone="light"
          />
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {comparePairs.map((pair, i) => (
            <motion.div
              key={pair.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <CompareSlider
                beforeSrc={pair.beforeSrc ?? placeholderImage(pair.beforeSeed, 900, 675)}
                afterSrc={pair.afterSrc ?? placeholderImage(pair.afterSeed, 900, 675)}
                beforeFallbackSrc={pair.beforeSrc ? placeholderImage(pair.beforeSeed, 900, 675) : undefined}
                afterFallbackSrc={pair.afterSrc ? placeholderImage(pair.afterSeed, 900, 675) : undefined}
                beforeAlt={`Before: ${pair.title}`}
                afterAlt={`After: ${pair.title}`}
              />
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-lg font-semibold text-porcelain">{pair.title}</h3>
              </div>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-mist/70">
                {pair.procedure}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
