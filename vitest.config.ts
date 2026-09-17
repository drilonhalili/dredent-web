import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Unit tests for the pure parts of the site: dictionaries, i18n helpers, config
// invariants. Run with `npm test`. No DOM: the components are exercised by the
// browser checks in the README's launch checklist instead.
export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./", import.meta.url)) } },
  test: { include: ["tests/**/*.test.ts"], environment: "node" },
});
