"use client";

import type { ReactNode } from "react";
import { openConsentDialog } from "@/lib/consent";

export function CookieSettingsButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" onClick={openConsentDialog} className={className}>
      {children}
    </button>
  );
}
