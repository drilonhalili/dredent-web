// Re-crops each before/after pair in assets-src/results-original/ so the teeth
// land at the same position and scale in the compare slider, then writes the
// 1200x800 results into public/results/ (JPG for cases 01-05, WebP for 06-08).
//
// The anchor box for every photo is hand-measured in align-results.overrides.json:
// canine-to-canine (or central-incisor) width, gumline to incisal edge of the
// central incisors. Both photos of a pair get a crop centred on that box whose
// width is the same multiple of the box width, so the front teeth coincide.
//
// Needs sharp, which is not a project dependency:
//   npm i --no-save sharp
//   node scripts/align-results.mjs preview   # writes split previews to a temp dir
//   node scripts/align-results.mjs apply     # overwrites public/results/

import sharp from "sharp";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const REPO = path.resolve(HERE, "..");
const SRC = path.join(REPO, "assets-src/results-original");
const OUT = path.join(REPO, "public/results");
const OVERRIDES = path.join(HERE, "align-results.overrides.json");

const CASES = ["01", "02", "03", "04", "05", "06", "07", "08"];
const ASPECT = 3 / 2;
const OUT_W = 1200;
const OUT_H = 800;
const extFor = (c) => (Number(c) >= 6 ? "webp" : "jpg");
const mode = process.argv[2] ?? "preview";

const anchors = JSON.parse(await fs.readFile(OVERRIDES, "utf8"));

function teethInfo(bbox) {
  const w = bbox.x1 - bbox.x0;
  return { w, cx: (bbox.x0 + bbox.x1) / 2, cy: (bbox.y0 + bbox.y1) / 2 };
}

// Largest crop width (as a multiple of the anchor width) that stays inside the photo.
function kMax(meta, t) {
  return Math.min(
    (2 * t.cx) / t.w,
    (2 * (meta.width - t.cx)) / t.w,
    (2 * t.cy * ASPECT) / t.w,
    (2 * (meta.height - t.cy) * ASPECT) / t.w,
  );
}

function cropFor(meta, t, k) {
  const width = Math.round(k * t.w);
  const height = Math.round(width / ASPECT);
  const left = Math.min(Math.max(0, Math.round(t.cx - width / 2)), meta.width - width);
  const top = Math.min(Math.max(0, Math.round(t.cy - height / 2)), meta.height - height);
  return { left, top, width, height };
}

async function splitPreview(before, after, w = 1200) {
  const h = Math.round(w / ASPECT);
  const half = w / 2;
  const left = await sharp(before).extract({ left: 0, top: 0, width: half, height: h }).toBuffer();
  const right = await sharp(after).extract({ left: half, top: 0, width: half, height: h }).toBuffer();
  const line = Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><line x1="${half}" y1="0" x2="${half}" y2="${h}" stroke="#fff" stroke-width="2"/></svg>`,
  );
  return sharp({ create: { width: w, height: h, channels: 3, background: "#000" } })
    .composite([{ input: left, left: 0, top: 0 }, { input: right, left: half, top: 0 }, { input: line, left: 0, top: 0 }])
    .jpeg({ quality: 82 })
    .toBuffer();
}

const previewDir = path.join(os.tmpdir(), "dredent-align-preview");
if (mode === "preview") await fs.mkdir(previewDir, { recursive: true });

for (const c of CASES) {
  const ext = extFor(c);
  const sides = {};
  for (const side of ["before", "after"]) {
    const key = `case-${c}-${side}`;
    const bbox = anchors[key];
    if (!bbox) throw new Error(`missing anchor box for ${key} in ${OVERRIDES}`);
    const file = path.join(SRC, `${key}.${ext}`);
    sides[side] = { file, meta: await sharp(file).metadata(), t: teethInfo(bbox) };
  }
  const k = Math.min(kMax(sides.before.meta, sides.before.t), kMax(sides.after.meta, sides.after.t));

  const out = {};
  for (const side of ["before", "after"]) {
    const { file, meta, t } = sides[side];
    const img = sharp(file).extract(cropFor(meta, t, k)).resize(OUT_W, OUT_H, { kernel: "lanczos3" });
    out[side] = ext === "webp" ? img.webp({ quality: 82 }) : img.jpeg({ quality: 86, mozjpeg: true });
  }

  if (mode === "apply") {
    for (const side of ["before", "after"]) await out[side].toFile(path.join(OUT, `case-${c}-${side}.${ext}`));
    console.log(`case-${c}: written (k=${k.toFixed(2)})`);
  } else {
    const [b, a] = await Promise.all([out.before.toBuffer(), out.after.toBuffer()]);
    await fs.writeFile(path.join(previewDir, `case-${c}.jpg`), await splitPreview(b, a));
    console.log(`case-${c}: k=${k.toFixed(2)}`);
  }
}
if (mode === "preview") console.log(`previews in ${previewDir}`);
