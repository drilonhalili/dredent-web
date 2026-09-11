// Packs 16/32/48 px PNG renderings of public/icons/icon-512.png into app/favicon.ico
// (PNG-in-ICO, supported by every current browser and by Google's favicon fetcher).
import sharp from "sharp";
import fs from "node:fs/promises";
const sizes = [16, 32, 48];
const pngs = [];
for (const s of sizes) pngs.push(await sharp("public/icons/icon-512.png").resize(s, s, { kernel: "lanczos3" }).png({ compressionLevel: 9 }).toBuffer());
const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
const dir = Buffer.alloc(16 * sizes.length);
let offset = 6 + dir.length;
sizes.forEach((s, i) => { const e = i * 16; dir[e] = s; dir[e + 1] = s; dir[e + 2] = 0; dir[e + 3] = 0; dir.writeUInt16LE(1, e + 4); dir.writeUInt16LE(32, e + 6); dir.writeUInt32LE(pngs[i].length, e + 8); dir.writeUInt32LE(offset, e + 12); offset += pngs[i].length; });
await fs.writeFile("app/favicon.ico", Buffer.concat([header, dir, ...pngs]));
console.log("app/favicon.ico", (await fs.stat("app/favicon.ico")).size, "bytes");
