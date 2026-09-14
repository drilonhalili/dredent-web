// Turns the clinic's Instagram originals in assets-src/instagram/<shortcode>.jpg into
// 900x600 WebP tiles in public/instagram/ for the mosaic in components/instagram-mosaic.tsx
// (`instagramPosts` in data/site-config.ts lists which ones are shown). By default the
// crop uses sharp's "attention" strategy (skin tones and detail); for portraits where
// that lands on the eyes and cuts off the smile, FOCUS pins the crop's vertical centre.
//
// Needs sharp, which is not a project dependency:
//   npm i --no-save sharp
//   node scripts/build-instagram-tiles.mjs

import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const REPO = path.resolve(HERE, "..");
const SRC = path.join(REPO, "assets-src/instagram");
const OUT = path.join(REPO, "public/instagram");
const WIDTH = 900;
const HEIGHT = 600;
const ASPECT = WIDTH / HEIGHT;

// Manual crops keyed by shortcode: `y` is the vertical centre of the crop as a fraction
// of the image height (0 = top, 1 = bottom); `zoom` (optional, default 1) shrinks the
// crop to that fraction of the image width, to leave out something at its edge.
// Anything not listed here uses the automatic attention crop.
const FOCUS = {
  DY72ECFCjiY: { y: 0.68 },
  DVjAVbniij7: { y: 0.66 },
  DY5GbzSKiNI: { y: 0.62 },
  // Stacked before/after collage: zoom in on the lower ("after") photo only.
  Da5fq3WitgG: { y: 0.78, zoom: 0.72 },
};

await fs.mkdir(OUT, { recursive: true });
const files = (await fs.readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
for (const file of files) {
  const code = path.parse(file).name;
  let image = sharp(path.join(SRC, file)).rotate();
  const focus = FOCUS[code];
  if (focus) {
    const { width, height } = await image.metadata();
    let cropWidth = Math.round(width * (focus.zoom ?? 1));
    let cropHeight = Math.round(cropWidth / ASPECT);
    if (cropHeight > height) {
      cropHeight = height;
      cropWidth = Math.round(height * ASPECT);
    }
    const top = Math.min(Math.max(0, Math.round(focus.y * height - cropHeight / 2)), height - cropHeight);
    const left = Math.round((width - cropWidth) / 2);
    image = image.extract({ left, top, width: cropWidth, height: cropHeight }).resize(WIDTH, HEIGHT);
  } else {
    image = image.resize(WIDTH, HEIGHT, { fit: "cover", position: sharp.strategy.attention });
  }
  const info = await image.webp({ quality: 80 }).toFile(path.join(OUT, `${code}.webp`));
  console.log(`${code}.webp ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB${focus ? ` (focus ${JSON.stringify(focus)})` : ""}`);
}
