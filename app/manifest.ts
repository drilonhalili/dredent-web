import type { MetadataRoute } from "next";
import { getDictionary } from "@/data/locales";
import { business } from "@/data/site-config";
import { defaultLocale, localePath } from "@/lib/i18n";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const t = getDictionary(defaultLocale);
  return {
    name: business.name,
    short_name: "Dredent",
    description: t.seo.description,
    lang: defaultLocale,
    start_url: localePath(defaultLocale),
    display: "browser",
    background_color: "#f3f5f1",
    theme_color: "#142f2a",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
