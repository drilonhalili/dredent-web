"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Dictionary } from "@/data/locales/types";
import type { Locale } from "@/lib/i18n";

type I18nContextValue = { locale: Locale; t: Dictionary };

const I18nContext = createContext<I18nContextValue | null>(null);

// Mounted once per locale in app/[locale]/layout.tsx with that language's dictionary,
// so client components read copy with useI18n() and only one language ships to the browser.
export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ locale, t: dictionary }), [locale, dictionary]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}
