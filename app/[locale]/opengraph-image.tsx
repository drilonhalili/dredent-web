import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDictionary } from "@/data/locales";
import { business } from "@/data/site-config";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";

export const dynamic = "force-static";
export const alt = business.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const t = getDictionary(locale);

  // The renderer's built-in font is Latin-only. IBM Plex Mono is the one self-hosted
  // face with Cyrillic, so the Macedonian card is set in it.
  const fonts =
    locale === "mk"
      ? [
          {
            name: "Plex Mono",
            data: await readFile(join(process.cwd(), "app/fonts/IBMPlexMono-SemiBold.ttf")),
            weight: 600 as const,
            style: "normal" as const,
          },
        ]
      : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#142F2A",
          padding: "80px",
          // Only set when a font is loaded: an explicit undefined breaks the renderer.
          ...(fonts ? { fontFamily: "Plex Mono" } : {}),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              backgroundColor: "#F3F5F1",
              display: "flex",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#C89448",
            }}
          >
            {business.name}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#F3F5F1" }}>
            {t.tagline}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#D8DED6", maxWidth: 960 }}>
            {t.descriptionShort}
          </div>
        </div>
      </div>
    ),
    { ...size, ...(fonts ? { fonts } : {}) },
  );
}
