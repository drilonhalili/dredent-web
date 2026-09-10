"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { business, mapLinks } from "@/data/site-config";

const LocalMap = dynamic(() => import("@/components/local-map"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 animate-pulse bg-porcelain-2" aria-hidden="true" />,
});

// Mounts the self-hosted interactive map (components/local-map.tsx) only once the
// contact section is within ~800px of the viewport, so the map library never loads
// for visitors who don't scroll that far. The place card in the top-left corner
// mirrors the one Google's embedded maps show; its two links open Google Maps in a
// new tab, so nothing from Google loads until the visitor clicks.
export function MapEmbed() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [near]);

  return (
    <div ref={ref} className="relative min-h-[360px] w-full flex-1 sm:min-h-[420px]">
      {near && <LocalMap />}
      <PlaceCard />
    </div>
  );
}

// Sits above MapLibre's own controls (z-index 2) and clear of the zoom buttons on
// the right, which is what the max-width leaves room for on narrow screens.
function PlaceCard() {
  const { t } = useI18n();

  return (
    <div className="absolute left-3 top-3 z-[3] flex max-w-[calc(100%-4.5rem)] items-start gap-3 rounded-lg bg-white p-3 text-ink shadow-[0_1px_4px_-1px_rgba(0,0,0,0.35)] sm:left-4 sm:top-4 sm:max-w-[300px]">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-tight">{business.name}</p>
        <p className="mt-1 text-xs leading-snug text-ink-soft">
          {t.address.line1}, {t.address.line2}
        </p>
        <a
          href={mapLinks.view}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1.5 inline-block text-xs font-medium text-cusp hover:underline"
        >
          {t.map.viewLarger}
        </a>
      </div>
      <a
        href={mapLinks.directions}
        target="_blank"
        rel="noopener noreferrer"
        className="flex shrink-0 flex-col items-center gap-1 text-cusp transition-colors hover:text-cusp-deep"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cusp/10">
          <Navigation className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="text-[0.68rem] font-medium">{t.map.directions}</span>
      </a>
    </div>
  );
}
