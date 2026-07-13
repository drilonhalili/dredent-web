import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { JsonLd } from "@/components/json-ld";
import { business, seo } from "@/data/site-config";
import "./globals.css";

// Self-hosted (SIL Open Font License — see app/fonts/OFL-LICENSE.txt) rather than
// next/font/google, so there's no runtime dependency on Google's font CDN at all.
const fraunces = localFont({
  src: [
    { path: "./fonts/Fraunces-Variable.ttf", weight: "300 900", style: "normal" },
    { path: "./fonts/Fraunces-Italic-Variable.ttf", weight: "300 900", style: "italic" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

const workSans = localFont({
  src: [
    { path: "./fonts/WorkSans-Variable.ttf", weight: "100 900", style: "normal" },
    { path: "./fonts/WorkSans-Italic-Variable.ttf", weight: "100 900", style: "italic" },
  ],
  variable: "--font-work-sans",
  display: "swap",
});

const plexMono = localFont({
  src: [
    { path: "./fonts/IBMPlexMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/IBMPlexMono-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/IBMPlexMono-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: seo.title,
    template: `%s | ${business.name}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: business.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.siteUrl,
    siteName: business.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#142f2a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${workSans.variable} ${plexMono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="fixed left-2 top-2 z-[100] -translate-y-16 rounded bg-cusp px-4 py-2 font-medium text-porcelain transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
