"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CompareSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  // Shown instead if the primary src fails to load (e.g. the real photo files
  // haven't been downloaded into public/results/ yet — see scripts/fetch-results.sh).
  beforeFallbackSrc?: string;
  afterFallbackSrc?: string;
  beforeAlt: string;
  afterAlt: string;
  initialPosition?: number;
  className?: string;
};


/**
 * Drag-to-reveal before/after comparison, in the spirit of Aceternity UI's
 * `Compare` component (https://ui.aceternity.com/components/compare) —
 * rebuilt from scratch here. Draggable by pointer, and keyboard-operable
 * via arrow keys / Home / End.
 */
export function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeFallbackSrc,
  afterFallbackSrc,
  beforeAlt,
  afterAlt,
  initialPosition = 50,
  className,
}: CompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeImgRef = useRef<HTMLImageElement>(null);
  const afterImgRef = useRef<HTMLImageElement>(null);
  const [position, setPosition] = useState(initialPosition);
  const [dragging, setDragging] = useState(false);
  const [beforeUrl, setBeforeUrl] = useState(beforeSrc);
  const [afterUrl, setAfterUrl] = useState(afterSrc);

  // Swap to the fallback image if the primary fails. The onError props below
  // cover failures after hydration; this effect covers errors that fired
  // before React attached the handlers (a server-rendered <img> that 404s
  // immediately loses its error event), detectable as complete-but-empty.
  useEffect(() => {
    const check = (img: HTMLImageElement | null, fallback: string | undefined, set: (s: string) => void) => {
      if (img && fallback && img.complete && img.naturalWidth === 0) set(fallback);
    };
    check(beforeImgRef.current, beforeFallbackSrc, setBeforeUrl);
    check(afterImgRef.current, afterFallbackSrc, setAfterUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        ref={afterImgRef}
        src={afterUrl}
        alt={afterAlt}
        draggable={false}
        onError={() => afterFallbackSrc && setAfterUrl(afterFallbackSrc)}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* Clipped layer: "before" image, revealed left-to-right up to the handle */}
      <div
        className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)`, transition: clipTransition }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={beforeImgRef}
          src={beforeUrl}
          alt={beforeAlt}
          draggable={false}
          onError={() => beforeFallbackSrc && setBeforeUrl(beforeFallbackSrc)}
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

    </div>
  );
}
