import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";

const publicDir = new URL("../public/", import.meta.url);

// Images referenced with fixed paths in components (the config-driven ones are covered in
// site-config.test.ts). Regenerate with the script named in the failing test.
describe("static image variants", () => {
  it("About photo has its AVIF and 720px variants (scripts/build-about-image.mjs)", () => {
    for (const file of ["about/studio.webp", "about/studio.avif", "about/studio-720.webp", "about/studio-720.avif"]) {
      expect(existsSync(new URL(file, publicDir)), file).toBe(true);
    }
  });

  it("every font face declared in app/fonts.ts exists", () => {
    for (const file of [
      "Fraunces-Variable.woff2",
      "Fraunces-Italic-Variable.woff2",
      "WorkSans-Variable.woff2",
      "IBMPlexMono-Regular.woff2",
      "IBMPlexMono-Medium.woff2",
    ]) {
      expect(existsSync(new URL(`../app/fonts/${file}`, import.meta.url)), file).toBe(true);
    }
  });
});
