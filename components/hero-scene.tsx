"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import type * as THREE from "three";

function Blob({
  position,
  color,
  scale,
  speed,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh position={position} scale={scale}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial color={color} distort={0.35} speed={1.4} roughness={0.3} metalness={0.1} />
      </mesh>
    </Float>
  );
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (reducedMotion || !group.current) return;
    const { pointer } = state;
    group.current.rotation.y += (pointer.x * 0.3 - group.current.rotation.y) * 0.02;
    group.current.rotation.x += (pointer.y * -0.15 - group.current.rotation.x) * 0.02;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 4]} intensity={1.3} />
      <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#c89448" />
      <Blob position={[1.15, 0.35, 0]} color="#1f4a43" scale={1.5} speed={reducedMotion ? 0 : 1.1} />
      <Blob position={[-1.3, -0.55, -1]} color="#c89448" scale={0.9} speed={reducedMotion ? 0 : 0.8} />
      <Blob position={[0.15, -1.05, -0.5]} color="#f3f5f1" scale={0.62} speed={reducedMotion ? 0 : 1.4} />
      {!reducedMotion && <Sparkles count={36} scale={4.2} size={2} speed={0.3} color="#d6a85e" />}
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
