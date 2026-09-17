import { describe, expect, it } from "vitest";
import { defaultLocale, fill, isLocale, localePath, locales } from "@/lib/i18n";

describe("i18n helpers", () => {
  it("builds locale paths with a trailing slash and optional hash", () => {
    expect(localePath("sq")).toBe("/sq/");
    expect(localePath("en", "#contact")).toBe("/en/#contact");
  });

  it("recognises only the configured locales", () => {
    for (const locale of locales) expect(isLocale(locale)).toBe(true);
    expect(isLocale("de")).toBe(false);
    expect(isLocale("")).toBe(false);
    expect(locales).toContain(defaultLocale);
  });

  it("fills placeholders and leaves unknown ones untouched", () => {
    expect(fill("Hello {name}, {n} visits", { name: "Ana", n: 3 })).toBe("Hello Ana, 3 visits");
    expect(fill("Keep {unknown}", {})).toBe("Keep {unknown}");
  });
});
