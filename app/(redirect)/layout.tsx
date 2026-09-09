import type { ReactNode } from "react";
import { defaultLocale } from "@/lib/i18n";

// Second root layout, only for the bare `/` redirect page. The real site lives
// under app/[locale]/, which has its own root layout with fonts and metadata.
export default function RedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={defaultLocale}>
      <body>{children}</body>
    </html>
  );
}
