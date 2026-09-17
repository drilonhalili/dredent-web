import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { curatorFeed } from "@/data/site-config";

// The Content-Security-Policy is a static line in public/_headers, so nothing ties it to the
// feature flags at build time. This keeps the two in step: the Curator feed's CDN is trusted
// only while the feed is switched on, and switching it on without the CSP change fails here
// instead of on the live site (where accepting the cookie banner would load nothing).
const headers = readFileSync(new URL("../public/_headers", import.meta.url), "utf8");
const csp =
  headers
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.startsWith("Content-Security-Policy:"))
    ?.slice("Content-Security-Policy:".length)
    .trim() ?? "";

const sources = (directive: string) =>
  csp
    .split(";")
    .map((part) => part.trim())
    .find((part) => part === directive || part.startsWith(`${directive} `))
    ?.split(/\s+/)
    .slice(1) ?? [];

const CURATOR_CDN = "https://cdn.curator.io";

describe("Content-Security-Policy in public/_headers", () => {
  it("is present and enforcing (not report-only)", () => {
    expect(csp).not.toBe("");
    expect(headers).not.toMatch(/Content-Security-Policy-Report-Only/i);
    expect(sources("default-src")).toEqual(["'self'"]);
  });

  it("trusts Curator's CDN exactly when the Instagram feed is enabled", () => {
    const scripts = sources("script-src");
    if (curatorFeed.enabled) {
      expect(
        scripts,
        `curatorFeed.enabled is true: add ${CURATOR_CDN} to script-src in public/_headers, then load the feed once with the browser console open and allow the API/image hosts it reports (connect-src, img-src, style-src) — see README, "The Instagram section"`,
      ).toContain(CURATOR_CDN);
    } else {
      expect(scripts, "the feed is off, so the policy should not trust Curator's CDN").not.toContain(CURATOR_CDN);
    }
  });
});
