"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const LocalMap = dynamic(() => import("@/components/local-map"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 animate-pulse bg-porcelain-2" aria-hidden="true" />,
});

// Mounts the self-hosted interactive map (components/local-map.tsx) only once the
// contact section is within ~800px of the viewport, so the map library never loads
// for visitors who don't scroll that far.
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
    </div>
  );
}
