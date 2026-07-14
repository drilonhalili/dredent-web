"use client";

import { useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer, Sparkles } from "@react-three/drei";
import { BufferAttribute, CatmullRomCurve3, Color, LatheGeometry, Vector2, Vector3 } from "three";
import type * as THREE from "three";

/**
 * Hero scene: an upper central incisor — the tooth veneers are made for —
 * sculpted procedurally (lathe profile, then shaped), so no model file needs
 * downloading or licensing. Built once in a memo; zero per-frame cost.
 * Vertex colors fade from enamel white at the incisal edge to a warmer
 * dentin tone at the root tip.
 */
function useIncisorGeometry() {
  return useMemo(() => {
    // Silhouette from root tip (bottom) to incisal edge (top): a slim
    // tapering root, cervical waist, then the full crown.
    const profile = new CatmullRomCurve3([
      new Vector3(0.012, -1.42, 0),
      new Vector3(0.09, -1.28, 0),
      new Vector3(0.17, -0.86, 0),
      new Vector3(0.24, -0.38, 0),
      new Vector3(0.32, -0.02, 0), // cervical line (gum level)
      new Vector3(0.45, 0.3, 0),
      new Vector3(0.5, 0.62, 0),
      new Vector3(0.46, 0.9, 0),
      new Vector3(0.32, 1.04, 0),
      new Vector3(0.012, 1.08, 0),
    ]);
    const pts = profile.getPoints(48).map((p) => new Vector2(Math.max(p.x, 0.001), p.y));
    const geometry = new LatheGeometry(pts, 72);

    const pos = geometry.getAttribute("position");
    const v = new Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const h = (v.y + 1.42) / 2.5; // 0 at root tip, 1 at incisal edge
      // Labiolingual flattening — real incisors are shovel-shaped, not round.
      v.z *= 0.52 - 0.1 * Math.max(0, (v.y - 0.1) / 1.0);
      // Crown flares mesially/distally toward the incisal edge (chisel shape).
      if (v.y > 0.0) v.x *= 1 + 0.3 * Math.min(1, v.y / 1.0);
      // Gentle labial bow — the front face curves like a fingernail.
      v.z += 0.14 * Math.sin(Math.PI * Math.min(1, Math.max(0, h - 0.35) / 0.65));
      // Root curves slightly distally, as real roots do.
      if (v.y < -0.1) v.x += 0.1 * ((-v.y - 0.1) / 1.3) ** 1.6;
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geometry.computeVertexNormals();

    // Enamel → dentin vertex-color gradient.
    const enamel = new Color("#f8f5ee");
    const neck = new Color("#eee0c4");
    const root = new Color("#e0c9a0");
    const colors = new Float32Array(pos.count * 3);
    const tmp = new Color();
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      if (y > 0.15) {
        tmp.copy(enamel);
      } else if (y > -0.25) {
        tmp.copy(enamel).lerp(neck, (0.15 - y) / 0.4);
      } else {
        tmp.copy(neck).lerp(root, Math.min(1, (-0.25 - y) / 0.7));
      }
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }
    geometry.setAttribute("color", new BufferAttribute(colors, 3));
    return geometry;
  }, []);
}

function IncisorTooth() {
  const geometry = useIncisorGeometry();
  return (
    // Crown up, root down; slight tilt so the labial face catches the light.
    <mesh geometry={geometry} scale={[1.05, 1.05, 1.05]} rotation={[0.16, 0.5, -0.05]}>
      <meshPhysicalMaterial
        vertexColors
        roughness={0.2}
        clearcoat={1}
        clearcoatRoughness={0.28}
        sheen={0.4}
        sheenColor="#fff8ea"
        transmission={0.08}
        thickness={0.5}
        ior={1.55}
      />
    </mesh>
  );
}

// Continuous slow turntable rotation (stopped entirely for reduced motion).
function Spin({ children, speed, enabled }: { children: ReactNode; speed: number; enabled: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (enabled && ref.current) ref.current.rotation.y += delta * speed;
  });
  return <group ref={ref}>{children}</group>;
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);

  // Gentle pointer-follow parallax on top of the turntable spin.
  useFrame((state) => {
    if (reducedMotion || !group.current) return;
    const { pointer } = state;
    group.current.rotation.y += (pointer.x * 0.25 - group.current.rotation.y) * 0.02;
    group.current.rotation.x += (pointer.y * -0.12 - group.current.rotation.x) * 0.02;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={1.25} />
      <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#c89448" />
      <pointLight position={[0, -2, 3]} intensity={0.25} color="#1f4a43" />
      {/* Offline environment map (no external HDR fetch) — gives the enamel
          its soft studio reflections. */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={1.1} position={[0, 3, 4]} scale={[6, 3, 1]} color="#ffffff" />
        <Lightformer intensity={0.7} position={[-4, 0, 2]} scale={[3, 4, 1]} color="#f3ead8" />
        <Lightformer intensity={0.5} position={[4, -1, 3]} scale={[3, 3, 1]} color="#dfe8e2" />
      </Environment>

      <Float speed={reducedMotion ? 0 : 1.1} rotationIntensity={0.15} floatIntensity={0.9}>
        <Spin speed={0.35} enabled={!reducedMotion}>
          <group position={[0.1, 0.1, 0]}>
            <IncisorTooth />
          </group>
        </Spin>
      </Float>

      <ContactShadows position={[0, -1.75, 0]} opacity={0.3} scale={6} blur={2.6} far={2.4} color="#142f2a" />
      {!reducedMotion && <Sparkles count={30} scale={4.2} size={2} speed={0.3} color="#d6a85e" />}
    </group>
  );
}

export default function HeroScene() {
  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene reducedMotion={reducedMotion} />
    </Canvas>
  );
}
