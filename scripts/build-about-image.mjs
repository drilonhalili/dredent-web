// Derives the responsive variants of the About photo from the committed 960×1200 master
// public/about/studio.webp (itself a 4:5 crop of assets-src/teeths-original.jpeg):
// studio.avif, studio-720.webp and studio-720.avif. Run: node scripts/build-about-image.mjs
import { statSync } from "node:fs";
import sharp from "sharp";

const dir = new URL("../public/about/", import.meta.url);
const master = new URL("studio.webp", dir);
const out = (name) => new URL(name, dir).pathname;

const img = sharp(master.pathname);
await img.clone().avif({ quality: 55 }).toFile(out("studio.avif"));
await img.clone().resize(720, 900).webp({ quality: 80 }).toFile(out("studio-720.webp"));
await img.clone().resize(720, 900).avif({ quality: 52 }).toFile(out("studio-720.avif"));

for (const name of ["studio.webp", "studio.avif", "studio-720.webp", "studio-720.avif"]) {
  console.log(name.padEnd(18), (statSync(out(name)).size / 1024).toFixed(1), "KB");
}
