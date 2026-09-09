"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { useI18n } from "@/components/i18n-provider";
import { business } from "@/data/site-config";

const HeroScene = dynamic(() => import("@/components/hero-scene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse rounded-[2rem] bg-gradient-to-br from-cusp/10 via-shade/10 to-transparent" />
  ),
});

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
      <div
        className="pointer-events-none absolute -top-24 right-0 h-[560px] w-[560px] rounded-full bg-cusp/5 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
        {/* min-w-0 on both columns: the Three.js canvas is given an explicit pixel
            width by its resize observer, and a grid item's default min-width:auto
            would otherwise stop the column from ever shrinking below it. */}
        <motion.div variants={container} initial="hidden" animate="show" className="min-w-0">
          <motion.p
            variants={item}
            className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-cusp"
          >
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl md:text-[3.5rem]"
          >
            {t.hero.titleStart} <span className="italic text-shade">{t.hero.titleEmphasis}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-lg text-balance text-lg leading-relaxed text-ink-soft">
            {t.hero.lede}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink href={business.bookingHref}>{t.hero.bookCta}</ButtonLink>
            <ButtonLink href="#transformations" variant="outline">
              {t.hero.resultsCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-mist bg-porcelain-2 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-ink-soft">
              {t.hero.shade} C2
              <ArrowRight className="h-3 w-3 text-shade" aria-hidden="true" />
              A1
            </span>
            <p className="font-mono text-[0.7rem] text-ink-soft">{t.trustLine}</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-w-0 h-[320px] sm:h-[420px] lg:h-[480px]"
          aria-hidden="true"
        >
          <HeroScene />
          <p className="pointer-events-none absolute bottom-1 right-2 font-mono text-[0.6rem] uppercase tracking-wider text-ink-soft/50">
            {t.hero.tapHint}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
