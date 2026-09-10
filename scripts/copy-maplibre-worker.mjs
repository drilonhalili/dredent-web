// MapLibre GL 6 runs tile loading/parsing in a web worker that it locates with
// `new URL(workerFile, import.meta.url)` — a pattern webpack cannot rewrite when the
// file name is a variable, so under Next.js the browser requests a worker URL that
// doesn't exist and the map silently renders nothing but its background colour.
// This copies the worker (and the shared module it imports) into public/ so
// components/local-map.tsx can hand MapLibre an explicit, same-origin URL via
// setWorkerUrl(). Runs automatically before `npm run dev` / `npm run build`
// (predev/prebuild in package.json), so the copy always matches the installed version.

import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const src = new URL("../node_modules/maplibre-gl/dist/", import.meta.url).pathname;
const dest = new URL("../public/map/vendor/", import.meta.url).pathname;
mkdirSync(dest, { recursive: true });

// Served as .js: some static hosts still send .mjs as application/octet-stream,
// which a module worker refuses to run.
const worker = readFileSync(`${src}maplibre-gl-worker.mjs`, "utf8").replace(
  /\.\/maplibre-gl-shared\.mjs/g,
  "./maplibre-gl-shared.js",
);
writeFileSync(`${dest}maplibre-gl-worker.js`, worker);
copyFileSync(`${src}maplibre-gl-shared.mjs`, `${dest}maplibre-gl-shared.js`);

const { version } = JSON.parse(readFileSync(new URL("../node_modules/maplibre-gl/package.json", import.meta.url), "utf8"));
writeFileSync(`${dest}VERSION`, `${version}\n`);
console.log(`maplibre-gl ${version} worker copied to public/map/vendor/`);
