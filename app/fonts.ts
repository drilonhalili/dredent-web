import localFont from "next/font/local";

// Self-hosted (SIL Open Font License — see app/fonts/OFL-LICENSE.txt) rather than
// next/font/google, so there is no runtime dependency on Google's font CDN at all. The
// WOFF2 files are Latin(+Cyrillic for Plex Mono) subsets built by scripts/build-fonts.sh
// from the TTF originals in assets-src/fonts/.
// Fraunces and Work Sans cover Latin only; Cyrillic falls through to the
// unicode-range faces in globals.css. Shared by app/[locale]/layout.tsx and
// app/global-not-found.tsx (the two documents the site renders).
export const fraunces = localFont({
  src: [
    { path: "./fonts/Fraunces-Variable.woff2", weight: "400 600", style: "normal" },
    { path: "./fonts/Fraunces-Italic-Variable.woff2", weight: "400 600", style: "italic" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

export const workSans = localFont({
  src: [
    // Weights 400-600 only, no italic: the subsets in scripts/build-fonts.sh match this.
    { path: "./fonts/WorkSans-Variable.woff2", weight: "400 600", style: "normal" },
  ],
  variable: "--font-work-sans",
  display: "swap",
});

// Every face is used on the first screen (nav labels, hero eyebrow and title), so all of
// them are preloaded; keep the set small — each file is fetched before the first paint.
export const plexMono = localFont({
  src: [
    // Regular for eyebrows and labels, Medium for the nav links; no semibold cut.
    { path: "./fonts/IBMPlexMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/IBMPlexMono-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

export const fontClassName = `${fraunces.variable} ${workSans.variable} ${plexMono.variable}`;
