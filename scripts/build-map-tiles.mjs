// Cuts the vector tiles for the Tetovo area out of a Protomaps planet build and writes
// them to public/map/tetovo.pmtiles — the source of the self-hosted interactive map in
// components/local-map.tsx. Only HTTP range requests are made against the (~140 GB)
// planet file; the result is a few MB. Re-run to refresh the map data (roads, POIs) or
// after changing the area. Keep BOUNDS in sync with `mapArea` in data/site-config.ts.
//
// Protomaps builds: https://maps.protomaps.com/builds/ (daily, YYYYMMDD.pmtiles), derived
// from OpenStreetMap — © OpenStreetMap contributors (ODbL); the attribution rendered on
// the map is required.
//
//   node scripts/build-map-tiles.mjs [https://build.protomaps.com/YYYYMMDD.pmtiles]

import { gzipSync } from "node:zlib";
import { mkdirSync, writeFileSync, readFileSync, statSync } from "node:fs";
import { PMTiles, zxyToTileId } from "pmtiles";

const SOURCE = process.argv[2] ?? "https://build.protomaps.com/20260910.pmtiles";
const BOUNDS = [20.93, 41.98, 21.02, 42.05]; // west, south, east, north
const CENTER = [20.971293, 42.013353]; // business.geo
const MIN_ZOOM = 10;
const OUT = new URL("../public/map/tetovo.pmtiles", import.meta.url).pathname;

function lngLatToTile(lng, lat, z) {
  const n = 2 ** z;
  const x = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n);
  return [Math.min(n - 1, Math.max(0, x)), Math.min(n - 1, Math.max(0, y))];
}

const source = new PMTiles(SOURCE);
const header = await source.getHeader();
const metadata = await source.getMetadata();
if (header.tileType !== 1) throw new Error("source is not a vector (MVT) archive");
const maxZoom = header.maxZoom;

// ---- collect tiles (a few at a time; each is one range request)
const coords = [];
for (let z = MIN_ZOOM; z <= maxZoom; z++) {
  const [x0, y0] = lngLatToTile(BOUNDS[0], BOUNDS[3], z);
  const [x1, y1] = lngLatToTile(BOUNDS[2], BOUNDS[1], z);
  for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) coords.push([z, x, y]);
}
const tiles = [];
const CONCURRENCY = 6;
for (let i = 0; i < coords.length; i += CONCURRENCY) {
  const batch = coords.slice(i, i + CONCURRENCY);
  const results = await Promise.all(batch.map(([z, x, y]) => source.getZxy(z, x, y)));
  results.forEach((tile, j) => {
    if (!tile) return;
    const [z, x, y] = batch[j];
    tiles.push({ tileId: zxyToTileId(z, x, y), data: gzipSync(Buffer.from(tile.data), { level: 9 }) });
  });
  process.stdout.write(`\r${Math.min(i + CONCURRENCY, coords.length)}/${coords.length} tiles`);
}
process.stdout.write("\n");
tiles.sort((a, b) => a.tileId - b.tileId);

// ---- PMTiles v3 layout: header | root directory | metadata | (no leaf dirs) | tile data
function varint(n, out) {
  while (n >= 0x80) {
    out.push((n % 0x80) | 0x80);
    n = Math.floor(n / 0x80);
  }
  out.push(n);
}
const entries = [];
const chunks = [];
let offset = 0;
for (const t of tiles) {
  entries.push({ tileId: t.tileId, offset, length: t.data.length });
  chunks.push(t.data);
  offset += t.data.length;
}
const tileData = Buffer.concat(chunks);

const dir = [];
varint(entries.length, dir);
let last = 0;
for (const e of entries) { varint(e.tileId - last, dir); last = e.tileId; }
for (let i = 0; i < entries.length; i++) varint(1, dir); // run lengths
for (const e of entries) varint(e.length, dir);
for (let i = 0; i < entries.length; i++) {
  const e = entries[i];
  if (i > 0 && e.offset === entries[i - 1].offset + entries[i - 1].length) varint(0, dir);
  else varint(e.offset + 1, dir);
}
const rootDir = gzipSync(Buffer.from(dir));
const meta = gzipSync(
  Buffer.from(
    JSON.stringify({
      name: `${metadata.name} — Tetovo extract`,
      description: metadata.description,
      attribution: metadata.attribution,
      version: metadata.version,
      type: "baselayer",
      vector_layers: metadata.vector_layers,
      "planetiler:osm:osmosisreplicationtime": metadata["planetiler:osm:osmosisreplicationtime"],
      "dredent:source": SOURCE,
      "dredent:bounds": BOUNDS.join(","),
    }),
  ),
);

const HEADER_LENGTH = 127;
const rootOffset = HEADER_LENGTH;
const metaOffset = rootOffset + rootDir.length;
const leafOffset = metaOffset + meta.length;
const tileOffset = leafOffset; // no leaf directories
if (rootOffset + rootDir.length > 16384) throw new Error("root directory too large for a single directory");

const h = Buffer.alloc(HEADER_LENGTH);
h.write("PMTiles", 0, "ascii");
h.writeUInt8(3, 7);
const u64 = (value, pos) => h.writeBigUInt64LE(BigInt(value), pos);
u64(rootOffset, 8); u64(rootDir.length, 16);
u64(metaOffset, 24); u64(meta.length, 32);
u64(leafOffset, 40); u64(0, 48);
u64(tileOffset, 56); u64(tileData.length, 64);
u64(entries.length, 72); u64(entries.length, 80); u64(entries.length, 88);
h.writeUInt8(1, 96); // clustered
h.writeUInt8(2, 97); // internal compression: gzip
h.writeUInt8(2, 98); // tile compression: gzip
h.writeUInt8(1, 99); // tile type: MVT
h.writeUInt8(MIN_ZOOM, 100);
h.writeUInt8(maxZoom, 101);
h.writeInt32LE(Math.round(BOUNDS[0] * 1e7), 102);
h.writeInt32LE(Math.round(BOUNDS[1] * 1e7), 106);
h.writeInt32LE(Math.round(BOUNDS[2] * 1e7), 110);
h.writeInt32LE(Math.round(BOUNDS[3] * 1e7), 114);
h.writeUInt8(15, 118);
h.writeInt32LE(Math.round(CENTER[0] * 1e7), 119);
h.writeInt32LE(Math.round(CENTER[1] * 1e7), 123);

mkdirSync(new URL("../public/map/", import.meta.url).pathname, { recursive: true });
writeFileSync(OUT, Buffer.concat([h, rootDir, meta, tileData]));

// ---- read it back with the same library the browser uses and compare a tile
const file = readFileSync(OUT);
const local = new PMTiles({
  getKey: () => OUT,
  getBytes: async (off, len) => ({ data: file.buffer.slice(file.byteOffset + off, file.byteOffset + off + len) }),
});
const lh = await local.getHeader();
const [cx, cy] = lngLatToTile(CENTER[0], CENTER[1], maxZoom);
const [a, b] = await Promise.all([local.getZxy(maxZoom, cx, cy), source.getZxy(maxZoom, cx, cy)]);
const same = a && b && Buffer.from(a.data).equals(Buffer.from(b.data));
console.log(`${OUT}: ${tiles.length} tiles, zoom ${lh.minZoom}–${lh.maxZoom}, ${(statSync(OUT).size / 1e6).toFixed(2)} MB; centre tile ${maxZoom}/${cx}/${cy} round-trips ${same ? "OK" : "MISMATCH"}`);
if (!same) process.exit(1);
