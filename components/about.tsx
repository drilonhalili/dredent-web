"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const tags = ["Tetovo, North Macedonia", "General & cosmetic", "Clinic & lab"];

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-porcelain-2">
            {/* Pre-cropped to the container's 4:5 and encoded from
                assets-src/teeths-original.jpeg (WebP + JPEG fallback), so no
                wasted bytes — the WebP is ~52 KB vs the 2.4 MB original. */}
            <picture>
              <source srcSet="/about/studio.webp" type="image/webp" />
              <img
                src="/about/studio.jpg"
                alt="Gold-toned cast of upper and lower rows of teeth, facing each other"
                width={960}
                height={1200}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </picture>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.28em] text-cusp">
            About the studio
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl">
            Dentistry that shows its work
          </h2>
          <p className="mt-5 max-w-lg text-balance leading-relaxed text-ink-soft">
            Every plan starts on a screen, not a hunch. We scan, model, and preview before we
            commit to anything permanent, so the version of your smile you approve on-screen is
            the one you actually get in the chair.
          </p>

          <blockquote className="mt-8 border-l-2 border-shade py-1 pl-6">
            <p className="text-balance font-display text-xl italic leading-snug text-ink sm:text-2xl">
              &ldquo;We strive to ensure that our patients receive excellent care and personal
              attention, served with compassion and kindness.&rdquo;
            </p>
            <footer className="mt-3 font-mono text-xs uppercase tracking-wider text-ink-soft">
              — our promise to every patient
            </footer>
          </blockquote>

          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-mist px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wide text-ink-soft"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
