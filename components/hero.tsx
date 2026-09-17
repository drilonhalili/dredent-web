"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
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

// The entrance is a CSS animation (`animate-rise` in globals.css) rather than a JS one:
// the server-rendered heading is then visible as soon as the CSS loads, which is what
// Largest Contentful Paint measures, instead of waiting for hydration.
const rise = (step: number) => ({ animationDelay: `${0.1 + step * 0.12}s` });

// Loads Three.js and the scene only once the browser is idle (or after 2.5 s), so the
// ~700 KB of 3D code never competes with the text, fonts and first interaction.
function useIdleReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let idleId: number | undefined;
    let timer: number | undefined;
    // Wait for the load event first: an idle period before the first paint (the main thread
    // waiting on fonts) would otherwise start the ~230 KB scene download ahead of the
    // heading and count against the page's Largest Contentful Paint.
    const start = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      } else {
        timer = window.setTimeout(() => setReady(true), 1200);
      }
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      window.clearTimeout(timer);
    };
  }, []);
  return ready;
}

export function Hero() {
  const { t } = useI18n();
  const sceneReady = useIdleReady();

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
        <div className="min-w-0">
          <p
            className="animate-rise font-mono text-xs font-medium uppercase tracking-[0.3em] text-cusp"
            style={rise(0)}
          >
            {t.hero.eyebrow}
          </p>

          <h1
            className="animate-rise mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl md:text-[3.5rem]"
            style={rise(1)}
          >
            {t.hero.titleStart} <span className="italic text-shade-ink">{t.hero.titleEmphasis}</span>
          </h1>

          <p className="animate-rise mt-6 max-w-lg text-balance text-lg leading-relaxed text-ink-soft" style={rise(2)}>
            {t.hero.lede}
          </p>

          <div className="animate-rise mt-8 flex flex-wrap items-center gap-4" style={rise(3)}>
            <ButtonLink href={business.bookingHref}>{t.hero.bookCta}</ButtonLink>
            <ButtonLink href="#transformations" variant="outline">
              {t.hero.resultsCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>

          <div className="animate-rise mt-10 flex flex-wrap items-center gap-3" style={rise(4)}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-mist bg-porcelain-2 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-ink-soft">
              {t.hero.shade} C2
              <ArrowRight className="h-3 w-3 text-shade" aria-hidden="true" />
              A1
            </span>
            <p className="font-mono text-[0.7rem] text-ink-soft">{t.trustLine}</p>
          </div>
        </div>

        <div
          className="animate-rise-scale relative min-w-0 h-[320px] sm:h-[420px] lg:h-[480px]"
          style={{ animationDelay: "0.3s" }}
          aria-hidden="true"
        >
          {sceneReady ? <HeroScene /> : <SceneSkeleton />}
          <p className="pointer-events-none absolute bottom-1 right-2 font-mono text-[0.65rem] uppercase tracking-wider text-ink-soft">
            {t.hero.tapHint}
          </p>
        </div>
      </Container>
    </section>
  );
}

function SceneSkeleton() {
  return (
    <div className="h-full w-full animate-pulse rounded-[2rem] bg-gradient-to-br from-cusp/10 via-shade/10 to-transparent" />
  );
}
