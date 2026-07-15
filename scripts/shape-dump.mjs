// Debug harness: build the hero molar shape, sample particle targets, and
// emit a static front/side scatter plot at out/debug-shape.html.
// Keep the geometry in sync with components/hero-scene.tsx.
import { CatmullRomCurve3, LatheGeometry, Mesh, Vector2, Vector3 } from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { writeFileSync } from "node:fs";

const COUNT = 6000;
const smooth = (t) => t * t * (3 - 2 * t);

// Crown: spline-smoothed bulge ending OPEN at the cervical line — the trunk
// below continues from the same width, so crown flows into roots seamlessly.
function buildCrown() {
  const profile = [
    [0.001, 1.02], [0.42, 0.98], [0.70, 0.87], [0.86, 0.52], [0.88, 0.26],
    [0.79, 0.04], [0.68, -0.14], [0.58, -0.3], [0.50, -0.44], [0.46, -0.54],
  ];
  const curve = new CatmullRomCurve3(profile.map(([x, y]) => new Vector3(x, y, 0)));
  const pts = curve.getPoints(44).map((p) => new Vector2(Math.max(p.x, 0.001), p.y));
  const g = new LatheGeometry(pts, 96);
  const pos = g.getAttribute("position");
  const v = new Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const theta = Math.atan2(v.z, v.x);
    if (v.y > 0.55) {
      const f = smooth(Math.min(1, (v.y - 0.55) / 0.45));
      v.y += 0.15 * Math.abs(Math.cos(2 * theta)) ** 1.4 * f;
      const r = Math.hypot(v.x, v.z);
      v.y -= 0.11 * Math.exp(-((r / 0.32) ** 2)) * f;
    }
    v.x *= 1.05;
    v.z *= 0.92;
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  return g;
}

// One tapering root emerging from inside the trunk at (dx, dz), bowing
// outward. Tops overlap the trunk so the furcation reads as one mass.
function buildRoot(dx, dz, length) {
  const s = length;
  const profile = [
    [0.001, -1.0 * s], [0.06, -0.92 * s], [0.13, -0.62 * s], [0.19, -0.32 * s],
    [0.25, -0.1 * s], [0.30, 0.0],
  ];
  const g = new LatheGeometry(profile.map(([x, y]) => new Vector2(x, y)), 48);
  const pos = g.getAttribute("position");
  const v = new Vector3();
  const len = Math.hypot(dx, dz) || 1;
  const ux = dx / len, uz = dz / len;
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const t = Math.min(1, -v.y / s);
    const bow = 0.15 * Math.sin(Math.PI * t) + 0.05 * t;
    v.z *= 0.88;
    v.x += dx + ux * bow;
    v.z += dz + uz * bow;
    v.y -= 0.3;
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  return g;
}

// Maxillary first molar: crown flows into an hourglass neck; roots' flared
// tops sit up inside the neck so the outer silhouette is one continuous line.
const parts = [
  { sampler: new MeshSurfaceSampler(new Mesh(buildCrown())).build(), share: 0.56 },
  { sampler: new MeshSurfaceSampler(new Mesh(buildRoot(-0.21, 0.13, 1.05))).build(), share: 0.13 },
  { sampler: new MeshSurfaceSampler(new Mesh(buildRoot(0.21, 0.13, 1.05))).build(), share: 0.13 },
  { sampler: new MeshSurfaceSampler(new Mesh(buildRoot(0, -0.21, 1.2))).build(), share: 0.18 },
];
const pick = (i) => {
  const r = i / COUNT;
  let acc = 0;
  for (const s of parts) { acc += s.share; if (r < acc) return s.sampler; }
  return parts[0].sampler;
};

const pts = [];
const p = new Vector3();
for (let i = 0; i < COUNT; i++) { pick(i).sample(p); pts.push([+p.x.toFixed(3), +p.y.toFixed(3), +p.z.toFixed(3)]); }

const html = `<!doctype html><meta charset="utf-8"><title>shape debug</title>
<body style="background:#f3f5f1;margin:0;display:flex;gap:20px;justify-content:center">
<canvas id="front" width="450" height="640"></canvas>
<canvas id="side" width="450" height="640"></canvas>
<script>
const pts = ${JSON.stringify(pts)};
function draw(id, ax, ay) {
  const c = document.getElementById(id), g = c.getContext("2d");
  g.fillStyle = "#f3f5f1"; g.fillRect(0,0,450,640);
  g.fillStyle = "#1f4a43";
  for (const p of pts) { g.fillRect(225 + p[ax]*150, 320 - p[ay]*150, 2, 2); }
  g.fillStyle = "#999"; g.font = "14px monospace"; g.fillText(id + " view", 12, 22);
}
draw("front", 0, 1);
draw("side", 2, 1);
</script>`;
writeFileSync("out/debug-shape.html", html);
console.log("wrote", pts.length, "points");
