import localFont from "next/font/local";

// Self-hosted (SIL Open Font License — see app/fonts/OFL-LICENSE.txt) rather than
// next/font/google, so there's no runtime dependency on Google's font CDN at all.
// Fraunces and Work Sans cover Latin only; Cyrillic falls through to the
// unicode-range faces in globals.css. Shared by app/[locale]/layout.tsx and
// app/global-not-found.tsx (the two documents the site renders).
export const fraunces = localFont({
  src: [
    { path: "./fonts/Fraunces-Variable.ttf", weight: "300 900", style: "normal" },
    { path: "./fonts/Fraunces-Italic-Variable.ttf", weight: "300 900", style: "italic" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

export const workSans = localFont({
  src: [
    { path: "./fonts/WorkSans-Variable.ttf", weight: "100 900", style: "normal" },
    { path: "./fonts/WorkSans-Italic-Variable.ttf", weight: "100 900", style: "italic" },
  ],
  variable: "--font-work-sans",
  display: "swap",
});

export const plexMono = localFont({
  src: [
    { path: "./fonts/IBMPlexMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/IBMPlexMono-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/IBMPlexMono-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

export const fontClassName = `${fraunces.variable} ${workSans.variable} ${plexMono.variable}`;
