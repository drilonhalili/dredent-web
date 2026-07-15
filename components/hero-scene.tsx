"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import { CatmullRomCurve3, Color, LatheGeometry, Mesh, Vector2, Vector3 } from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import type * as THREE from "three";

/**
 * Hero scene: a "digital scan" particle animation. ~6000 particles swirl in
 * from a chaotic cloud and assemble into a tooth — the site's promise
 * ("see your smile before it exists") told as motion. A gold scan ring sweeps
 * the form; clicking the canvas re-runs the assembly.
 *
 * Everything is procedural (tooth surface sampled from a lathed incisor
 * profile) — no model files, no texture downloads, no extra packages.
 */

const COUNT = 6000;
const ASSEMBLE_SPEED = 0.55;

// Anatomical molar matching the classic dental illustration. Shape tuned
// with scripts/shape-dump.mjs (renders a static front/side scatter plot) —
// keep the two files in sync if you adjust the curves.
const smoothstep = (t: number) => t * t * (3 - 2 * t);

// Crown: spline-smoothed bulge ending OPEN at the cervical line — the trunk
// below continues from the same width, so crown flows into roots seamlessly.
// A vertex pass adds four wavy cusps and a central fossa dip.
function buildCrown() {
  const profile: [number, number][] = [
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
      const f = smoothstep(Math.min(1, (v.y - 0.55) / 0.45));
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

// One tapering root at offset (dx, dz), bowing outward. The root tops sit
// buried up inside the crown's neck, flush in width with where the crown's
// concave curve ends, so the outer silhouette is one continuous hourglass
// line — no visible seam at the furcation.
function buildRoot(dx: number, dz: number, length: number) {
  const s = length;
  const profile: [number, number][] = [
    [0.001, -1.0 * s], [0.06, -0.92 * s], [0.13, -0.62 * s], [0.19, -0.32 * s],
    [0.25, -0.1 * s], [0.30, 0.0],
  ];
  const g = new LatheGeometry(profile.map(([x, y]) => new Vector2(x, y)), 48);
  const pos = g.getAttribute("position");
  const v = new Vector3();
  const len = Math.hypot(dx, dz) || 1;
  const ux = dx / len;
  const uz = dz / len;
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

function useParticleData() {
  return useMemo(() => {
    // Maxillary (upper) first molar: crown flows into an hourglass neck;
    // two buccal roots in front + one longer palatal root behind.
    const parts = [
      { sampler: new MeshSurfaceSampler(new Mesh(buildCrown())).build(), share: 0.56 },
      { sampler: new MeshSurfaceSampler(new Mesh(buildRoot(-0.21, 0.13, 1.05))).build(), share: 0.13 },
      { sampler: new MeshSurfaceSampler(new Mesh(buildRoot(0.21, 0.13, 1.05))).build(), share: 0.13 },
      { sampler: new MeshSurfaceSampler(new Mesh(buildRoot(0, -0.21, 1.2))).build(), share: 0.18 },
    ];
    const pickSampler = (i: number) => {
      const r = i / COUNT;
      let acc = 0;
      for (const s of parts) {
        acc += s.share;
        if (r < acc) return s.sampler;
      }
      return parts[0].sampler;
    };
    const targets = new Float32Array(COUNT * 3);
    const scatter = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const delays = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);

    const p = new Vector3();
    const green = new Color("#2a5a50");
    const deepGreen = new Color("#16352f");
    const gold = new Color("#c89448");
    const tmp = new Color();

    for (let i = 0; i < COUNT; i++) {
      pickSampler(i).sample(p);
      p.multiplyScalar(1.02); // overall size of the assembled tooth
      p.y += 0.25; // shape's mass sits low (long roots) — recenter vertically
      targets[i * 3] = p.x;
      targets[i * 3 + 1] = p.y;
      targets[i * 3 + 2] = p.z;

      // Start position: a wide swirl of points around the scene.
      const r = 2.6 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      scatter[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      scatter[i * 3 + 1] = r * Math.cos(phi) * 0.8;
      scatter[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      // 86% green (two-tone), 14% gold accents.
      if (Math.random() < 0.14) tmp.copy(gold);
      else tmp.copy(green).lerp(deepGreen, Math.random() * 0.7);
      tmp.offsetHSL(0, 0, (Math.random() - 0.5) * 0.06);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;

      // Assemble bottom-up (roots first), with a little randomness.
      delays[i] = (1 - (targets[i * 3 + 1] / 2.6 + 0.5)) * 1.1 + Math.random() * 0.7;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { targets, scatter, colors, delays, phases };
  }, []);
}

function ToothParticles({
  reducedMotion,
  resetRef,
}: {
  reducedMotion: boolean;
  resetRef: React.MutableRefObject<(() => void) | null>;
}) {
  const { targets, scatter, colors, delays, phases } = useParticleData();
  const points = useRef<THREE.Points>(null);
  const time = useRef(0);
  resetRef.current = () => {
    time.current = 0;
  };

  const positions = useMemo(
    () => (reducedMotion ? targets.slice() : scatter.slice()),
    [reducedMotion, targets, scatter],
  );

  useFrame((_, delta) => {
    if (reducedMotion || !points.current) return;
    time.current += delta;
    const t = time.current;
    const pos = points.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      let k = Math.min(1, Math.max(0, (t - delays[i]) * ASSEMBLE_SPEED));
      k = 1 - (1 - k) ** 3; // ease-out cubic
      const ix = i * 3;
      const wobble = 0.016 * k;
      arr[ix] = scatter[ix] + (targets[ix] - scatter[ix]) * k + Math.sin(t * 1.4 + phases[i]) * wobble;
      arr[ix + 1] =
        scatter[ix + 1] + (targets[ix + 1] - scatter[ix + 1]) * k + Math.cos(t * 1.1 + phases[i]) * wobble;
      arr[ix + 2] = scatter[ix + 2] + (targets[ix + 2] - scatter[ix + 2]) * k + Math.sin(t * 1.7 + phases[i]) * wobble;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <PointMaterial transparent vertexColors size={0.042} sizeAttenuation depthWrite={false} opacity={0.95} />
    </points>
  );
}

// A thin gold ring sweeping up and down the form — the "scanner".
function ScanRing({ reducedMotion }: { reducedMotion: boolean }) {
  const ring = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (reducedMotion || !ring.current) return;
    const t = clock.elapsedTime;
    ring.current.position.y = Math.sin(t * 0.6) * 1.5;
    const mat = ring.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.55 + Math.sin(t * 0.6) * 0.1;
  });
  if (reducedMotion) return null;
  return (
    <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.15, 0.008, 8, 72]} />
      <meshBasicMaterial color="#c89448" transparent opacity={0.6} />
    </mesh>
  );
}

function Scene({ reducedMotion, resetRef }: { reducedMotion: boolean; resetRef: React.MutableRefObject<(() => void) | null> }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (reducedMotion || !group.current) return;
    // Slow turntable + gentle pointer parallax.
    group.current.rotation.y += delta * 0.16 + (state.pointer.x * 0.25 - group.current.rotation.x * 0) * 0.0;
    group.current.rotation.x += (state.pointer.y * -0.1 - group.current.rotation.x) * 0.02;
  });

  return (
    <group ref={group} position={[0.1, 0.05, 0]}>
      <ToothParticles reducedMotion={reducedMotion} resetRef={resetRef} />
      <ScanRing reducedMotion={reducedMotion} />
    </group>
  );
}

export default function HeroScene() {
  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  const resetRef = useRef<(() => void) | null>(null);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.4], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      onPointerDown={() => resetRef.current?.()}
    >
      <Scene reducedMotion={reducedMotion} resetRef={resetRef} />
    </Canvas>
  );
}
