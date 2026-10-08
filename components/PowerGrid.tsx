"use client";
// 3D transmission-line scene: pylons, sagging cables and light pulses travelling along them.
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const NODES: [number, number, number][] = [
  [-28, -15, 12], [-12, -25, 11], [10, -20, 13], [26, -10, 10], [-20, 10, 12],
  [-4, 0, 14], [16, 8, 11], [32, 18, 12], [-10, 25, 10], [8, 22, 13],
]; // x, z, height

function Pylon({ x, z, h }: { x: number; z: number; h: number }) {
  const steel = <meshStandardMaterial color="#1E3A8A" emissive="#0A1128" roughness={0.5} />;
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, h / 2, 0]}><cylinderGeometry args={[0.2, 0.9, h, 4]} />{steel}</mesh>
      {[[4, 0.85], [6, 0.7]].map(([w, k]) => (
        <mesh key={k} position={[0, h * k, 0]}><boxGeometry args={[w, 0.2, 0.2]} />{steel}</mesh>
      ))}
      {[[-1.8, 0.85], [1.8, 0.85], [-2.8, 0.7], [0, 0.7], [2.8, 0.7]].map(([ox, k], i) => (
        <mesh key={i} position={[ox, h * k, 0]}><sphereGeometry args={[0.3, 8, 8]} /><meshBasicMaterial color="#3B6EF5" /></mesh>
      ))}
    </group>
  );
}

function Pulse({ pts, offset, speed }: { pts: THREE.Vector3[]; offset: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const f = ((clock.elapsedTime * speed + offset) % 1) * (pts.length - 1);
    const i = Math.floor(f);
    ref.current.position.lerpVectors(pts[i], pts[Math.min(i + 1, pts.length - 1)], f - i);
  });
  return <mesh ref={ref}><sphereGeometry args={[0.35, 8, 8]} /><meshBasicMaterial color="#ffffff" /></mesh>;
}

function Grid() {
  const group = useRef<THREE.Group>(null);
  const wide = useThree((s) => s.size.width >= 1024);

  // Build a sagging (catenary-style) cable between every pair of nearby pylons
  const wires = useMemo(() => {
    const tops = NODES.map(([x, z, h]) => new THREE.Vector3(x, h * 0.75, z));
    const out: THREE.Vector3[][] = [];
    for (let i = 0; i < tops.length; i++)
      for (let j = i + 1; j < tops.length; j++)
        if (tops[i].distanceTo(tops[j]) < 26)
          out.push(Array.from({ length: 17 }, (_, s) => {
            const t = s / 16;
            const p = new THREE.Vector3().lerpVectors(tops[i], tops[j], t);
            p.y -= Math.sin(t * Math.PI) * 1.8;
            return p;
          }));
    return out;
  }, []);

  useFrame(({ clock, pointer }, delta) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.04 + pointer.x * 0.35;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -pointer.y * 0.12, 3, delta);
  });

  return (
    // On desktop the scene sits to the right so the headline stays readable on the left
    <group position={[wide ? 14 : 0, 0, 0]}>
    <group ref={group}>
      {NODES.map(([x, z, h], i) => <Pylon key={i} x={x} z={z} h={h} />)}
      {wires.map((pts, i) => <Line key={i} points={pts} color="#3B6EF5" lineWidth={1.2} transparent opacity={0.75} />)}
      {wires.map((pts, i) => i % 2 === 0 && <Pulse key={`p${i}`} pts={pts} offset={(i * 0.37) % 1} speed={0.08 + (i % 4) * 0.02} />)}
      <gridHelper args={[90, 45, "#1E3A8A", "#0E2055"]} />
    </group>
    </group>
  );
}

export default function PowerGrid({ active }: { active: boolean }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 15, 40], fov: 60 }} frameloop={active ? "always" : "demand"} gl={{ antialias: true, alpha: true }}
      onCreated={({ camera }) => camera.lookAt(0, 4, 0)}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[20, 40, 20]} color="#3B6EF5" intensity={2} />
      <pointLight position={[0, 5, 10]} color="#3B6EF5" intensity={500} distance={60} />
      <Grid />
    </Canvas>
  );
}
