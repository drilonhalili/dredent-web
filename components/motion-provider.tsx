"use client";

import { LazyMotion } from "framer-motion";
import type { ReactNode } from "react";

// framer-motion's animation features (~45 KB compressed) are split into their own chunk and
// fetched after the page has painted; components use the slim `m` element instead of
// `motion`. `strict` throws in development if a `motion.*` element slips back in.
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
