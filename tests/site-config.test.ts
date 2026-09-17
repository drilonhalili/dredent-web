import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  avifSrc,
  business,
  comparePairs,
  googleReviews,
  instagramPosts,
  instagramTileSrc,
  instagramTileSrcSet,
  mapArea,
  resultSrcSet,
  seo,
} from "@/data/site-config";

describe("site config", () => {
  it("ships every referenced image, including the srcset and AVIF variants", () => {
    const files: string[] = [];
    for (const pair of comparePairs) {
      for (const src of [pair.beforeSrc, pair.afterSrc]) {
        files.push(src, avifSrc(src), ...resultSrcSet(src).split(", ").map((c) => c.split(" ")[0] ?? ""));
        files.push(...resultSrcSet(avifSrc(src)).split(", ").map((c) => c.split(" ")[0] ?? ""));
      }
    }
    for (const post of instagramPosts) {
      files.push(instagramTileSrc(post), avifSrc(instagramTileSrc(post)));
      files.push(...instagramTileSrcSet(post).split(", ").map((c) => c.split(" ")[0] ?? ""));
    }
    const missing = files.filter((f) => !existsSync(`public${f}`));
    expect(missing, "missing files under public/").toEqual([]);
  });

  it("has the clinic pin inside the extracted map area", () => {
    const [west, south, east, north] = mapArea.bounds;
    expect(business.geo.lng).toBeGreaterThan(west);
    expect(business.geo.lng).toBeLessThan(east);
    expect(business.geo.lat).toBeGreaterThan(south);
    expect(business.geo.lat).toBeLessThan(north);
  });

  it("uses absolute https URLs where the metadata needs them", () => {
    expect(seo.siteUrl).toMatch(/^https:\/\/[^/]+$/);
    expect(googleReviews.read).toMatch(/^https:\/\//);
    if (googleReviews.write) expect(googleReviews.write).toMatch(/^https:\/\/g\.page\/r\/.+\/review$/);
    expect(business.phoneHref).toBe(`tel:${business.phone.replace(/\s+/g, "")}`);
  });
});
