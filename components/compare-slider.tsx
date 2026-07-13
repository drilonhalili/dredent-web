"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CompareSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeShade?: string;
  afterShade?: string;
  initialPosition?: number;
  className?: string;
};

/**
 * Drag-to-reveal before/after comparison, in the spirit of Aceternity UI's
 * `Compare` component (https://ui.aceternity.com/components/compare) — rebuilt
 * from scratch here with a bespoke touch: the small badge reads out a real
 * VITA Classical shade code, ticking from the "before" shade to the "after"
 * shade as you drag, since that's the actual unit cosmetic dentistry measures
 * a whiter smile in.
 */
export function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeShade,
  afterShade,
  initialPosition = 50,
  className,
}: CompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  // A single brief nudge on mount hints that the image is draggable, then settles.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t1 = setTimeout(() => setPosition((p) => Math.min(96, p + 14)), 550);
    const t2 = setTimeout(() => setPosition(initialPosition), 1350);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromClientX(e.clientX);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  }

  function endDrag() {
    setDragging(false);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 4));
    else if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 4));
    else if (e.key === "Home") setPosition(0);
    else if (e.key === "End") setPosition(100);
    else return;
    e.preventDefault();
  }

  const transition = dragging ? "none" : "left 0.5s cubic-bezier(0.22,1,0.36,1)";
  const clipTransition = dragging
    ? "none"
    : "clip-path 0.5s cubic-bezier(0.22,1,0.36,1)";
  const afterRevealed = position > 50;

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      role="slider"
      tabIndex={0}
      aria-label={`Drag to compare: ${beforeAlt} versus ${afterAlt}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      className={cn(
        "relative aspect-[4/3] w-full cursor-grab touch-none select-none overflow-hidden rounded-2xl sm:aspect-[16/10]",
        dragging && "cursor-grabbing",
        className,
      )}
    >
      {/* Base layer: "after" image, full bleed */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={afterSrc}
        alt={afterAlt}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* Clipped layer: "before" image, revealed left-to-right up to the handle */}
      <div
        className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)`, transition: clipTransition }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeSrc}
          alt={beforeAlt}
          draggable={false}
          className="h-full w-full object-cover"
        />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-porcelain backdrop-blur-sm">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-porcelain backdrop-blur-sm">
        After
      </span>

      {/* Handle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-porcelain/90"
        style={{ left: `${position}%`, transition }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-porcelain text-cusp shadow-[0_4px_18px_rgba(0,0,0,0.25)]">
          <ChevronsLeftRight className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>

      {beforeShade && afterShade && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink/80 px-3.5 py-1.5 font-mono text-xs backdrop-blur-sm">
          <span className={afterRevealed ? "text-porcelain/45" : "font-semibold text-shade"}>
            {beforeShade}
          </span>
          <span className="text-porcelain/45">→</span>
          <span className={afterRevealed ? "font-semibold text-shade" : "text-porcelain/45"}>
            {afterShade}
          </span>
        </div>
      )}
    </div>
  );
}
